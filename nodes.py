import json
import os
import re
import tempfile
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote

try:
    from aiohttp import web
    from server import PromptServer
except Exception:
    web = None
    PromptServer = None


ROOT_DIR = Path(__file__).resolve().parent
DATA_FILE = ROOT_DIR / "prompts.json"
IMAGE_DIR = ROOT_DIR / "reference_images"
DATA_VERSION = 3
CATEGORY = "Mimosa/提示词管理"
DEFAULT_FOLDER = "默认文件夹"
ALLOWED_IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}
MAX_UPLOAD_BYTES = 20 * 1024 * 1024
_FILE_LOCK = threading.RLock()


def _now_iso():
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def _json_dumps(value):
    return json.dumps(value, ensure_ascii=False)


def _default_data():
    now = _now_iso()
    return {
        "version": DATA_VERSION,
        "prompts": [
            {
                "name": "默认预设",
                "folder": DEFAULT_FOLDER,
                "positive": "masterpiece, best quality",
                "negative": "low quality, worst quality, blurry",
                "tags": ["基础"],
                "note": "本地初始提示词预设。",
                "reference_image": "",
                "favorite": False,
                "private": False,
                "created_at": now,
                "updated_at": now,
            }
        ],
    }


def _normalise_folder(value):
    folder = str(value or "").strip()
    return folder or DEFAULT_FOLDER


def _normalise_tags(value):
    if isinstance(value, list):
        items = value
    elif isinstance(value, str):
        items = re.split(r"[,，;\n]+", value)
    else:
        items = []

    tags = []
    seen = set()
    for item in items:
        tag = str(item).strip()
        if tag and tag not in seen:
            tags.append(tag)
            seen.add(tag)
    return tags


def _normalise_reference_image(value):
    image_name = Path(str(value or "")).name.strip()
    return image_name


def _normalise_favorite(value):
    return value is True


def _normalise_private(value):
    return value is True


def _normalise_prompt(entry):
    if not isinstance(entry, dict):
        entry = {}

    now = _now_iso()
    name = str(entry.get("name", "")).strip() or "未命名"
    return {
        "name": name,
        "folder": _normalise_folder(entry.get("folder", DEFAULT_FOLDER)),
        "positive": str(entry.get("positive", "")),
        "negative": str(entry.get("negative", "")),
        "tags": _normalise_tags(entry.get("tags", [])),
        "note": str(entry.get("note", "")),
        "reference_image": _normalise_reference_image(entry.get("reference_image", "")),
        "favorite": _normalise_favorite(entry.get("favorite", False)),
        "private": _normalise_private(entry.get("private", False)),
        "created_at": str(entry.get("created_at", now)),
        "updated_at": str(entry.get("updated_at", now)),
    }


def _normalise_data(data):
    if not isinstance(data, dict):
        data = {}

    prompts = []
    seen = set()
    for entry in data.get("prompts", []):
        prompt = _normalise_prompt(entry)
        if prompt["name"] in seen:
            continue
        prompts.append(prompt)
        seen.add(prompt["name"])

    return {
        "version": DATA_VERSION,
        "prompts": prompts,
    }


def _image_path(image_name):
    return IMAGE_DIR / Path(image_name).name


def _image_url(image_name):
    image_name = _normalise_reference_image(image_name)
    if not image_name:
        return ""
    path = _image_path(image_name)
    if not path.is_file():
        return ""
    return f"/mimosa_prompt_manager/reference-image?name={quote(image_name)}"


def _public_prompt(entry):
    prompt = dict(entry)
    prompt["reference_image_url"] = _image_url(entry.get("reference_image", ""))
    return prompt


def _folder_values(data):
    folders = sorted({entry["folder"] for entry in data["prompts"] if entry.get("folder")})
    return folders


def _tag_values(data, folder=None):
    tags = set()
    for entry in data["prompts"]:
        if folder and entry.get("folder") != folder:
            continue
        for tag in entry.get("tags", []):
            tags.add(tag)
    return sorted(tags)


def _response_payload(data):
    data = _normalise_data(data)
    return {
        "version": DATA_VERSION,
        "prompts": [_public_prompt(entry) for entry in data["prompts"]],
        "folders": _folder_values(data),
        "tags": _tag_values(data),
    }


def _collect_used_images(data):
    used = set()
    for entry in data["prompts"]:
        image_name = _normalise_reference_image(entry.get("reference_image", ""))
        if image_name:
            used.add(image_name)
    return used


def _cleanup_unused_images(data=None):
    if data is None:
        data = _read_data()

    if not IMAGE_DIR.exists():
        return

    used = _collect_used_images(data)
    for path in IMAGE_DIR.iterdir():
        if path.is_file() and path.name not in used:
            try:
                path.unlink()
            except OSError:
                pass


def _write_data(data):
    data = _normalise_data(data)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    with _FILE_LOCK:
        fd, tmp_name = tempfile.mkstemp(
            prefix=f".{DATA_FILE.name}.",
            suffix=".tmp",
            dir=str(DATA_FILE.parent),
            text=True,
        )
        try:
            with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as handle:
                json.dump(data, handle, ensure_ascii=False, indent=2)
                handle.write("\n")
            os.replace(tmp_name, DATA_FILE)
        finally:
            if os.path.exists(tmp_name):
                os.remove(tmp_name)

    return data


def _read_data():
    with _FILE_LOCK:
        if not DATA_FILE.exists():
            data = _write_data(_default_data())
            return data

        try:
            with DATA_FILE.open("r", encoding="utf-8") as handle:
                data = json.load(handle)
        except (OSError, json.JSONDecodeError):
            backup = DATA_FILE.with_suffix(f".broken-{int(datetime.now().timestamp())}.json")
            try:
                os.replace(DATA_FILE, backup)
            except OSError:
                pass
            data = _write_data(_default_data())
            return data

    return _normalise_data(data)


def _data_signature():
    try:
        stat = DATA_FILE.stat()
        return f"{stat.st_mtime_ns}:{stat.st_size}"
    except OSError:
        return "missing"


def _prompt_names():
    names = [entry["name"] for entry in _read_data()["prompts"]]
    return names or [""]


def _find_prompt(data, name):
    expected = str(name)
    for entry in data["prompts"]:
        if entry["name"] == expected:
            return entry
    return None


def _upsert_prompt(payload, overwrite=True):
    name = str(payload.get("name", "")).strip()
    if not name:
        return None, "名称不能为空。"

    folder = str(payload.get("folder", "")).strip()
    if not folder:
        return None, "文件夹不能为空。"

    positive = str(payload.get("positive", "")).strip()
    if not positive:
        return None, "正向提示词不能为空。"

    negative = str(payload.get("negative", "")).strip()
    if not negative:
        return None, "反向提示词不能为空。"

    now = _now_iso()
    data = _read_data()
    original_name = str(payload.get("original_name", "")).strip()
    original_entry = _find_prompt(data, original_name) if original_name else None
    existing = _find_prompt(data, name)

    if (
        original_entry is not None
        and original_name != name
        and existing is not None
        and existing.get("name") != original_entry.get("name")
    ):
        return None, "该名称已被其他提示词占用。"

    target_entry = original_entry if original_entry is not None else existing

    if target_entry is not None and not overwrite:
        return None, "提示词已存在，请启用 overwrite 进行更新。"

    reference_image = _normalise_reference_image(payload.get("reference_image", ""))
    if target_entry is not None and "reference_image" not in payload:
        reference_image = target_entry.get("reference_image", "")

    favorite = _normalise_favorite(payload.get("favorite", False))
    if target_entry is not None and "favorite" not in payload:
        favorite = _normalise_favorite(target_entry.get("favorite", False))

    private = _normalise_private(payload.get("private", False))
    if target_entry is not None and "private" not in payload:
        private = _normalise_private(target_entry.get("private", False))

    prompt = {
        "name": name,
        "folder": _normalise_folder(folder),
        "positive": str(payload.get("positive", "")),
        "negative": str(payload.get("negative", "")),
        "tags": _normalise_tags(payload.get("tags", [])),
        "note": str(payload.get("note", "")),
        "reference_image": reference_image,
        "favorite": favorite,
        "private": private,
        "created_at": now if target_entry is None else target_entry.get("created_at", now),
        "updated_at": now,
    }

    if target_entry is not None:
        target_name = target_entry.get("name", name)
        for index, entry in enumerate(data["prompts"]):
            if entry["name"] == target_name:
                data["prompts"][index] = prompt
                break
    else:
        data["prompts"].append(prompt)

    data = _write_data(data)
    _cleanup_unused_images(data)

    message = "提示词已更新。" if target_entry is not None else "提示词已保存。"
    return _public_prompt(prompt), message


def _set_prompt_favorite(name, favorite):
    name = str(name).strip()
    if not name:
        return None, "名称不能为空。"

    data = _read_data()
    entry = _find_prompt(data, name)
    if entry is None:
        return None, "未找到该提示词。"

    favorite_value = _normalise_favorite(favorite)
    entry["favorite"] = favorite_value
    data = _write_data(data)
    updated_entry = _find_prompt(data, name)
    message = "提示词已加入收藏夹。" if favorite_value else "提示词已从收藏夹移除。"
    return _public_prompt(updated_entry or entry), message


def _delete_prompt(name):
    name = str(name).strip()
    if not name:
        return False, "名称不能为空。"

    data = _read_data()
    remaining = [entry for entry in data["prompts"] if entry["name"] != name]
    if len(remaining) == len(data["prompts"]):
        return False, "未找到该提示词。"

    data["prompts"] = remaining
    data = _write_data(data)
    _cleanup_unused_images(data)
    return True, "提示词已删除。"


def _normalise_name_list(names):
    selected = []
    seen = set()
    if not isinstance(names, list):
        return selected

    for item in names:
        name = str(item).strip()
        if name and name not in seen:
            selected.append(name)
            seen.add(name)

    return selected


def _delete_prompts(names):
    selected = _normalise_name_list(names)
    if not selected:
        return False, "请选择要删除的提示词。"

    data = _read_data()
    selected_set = set(selected)
    remaining = [entry for entry in data["prompts"] if entry["name"] not in selected_set]
    deleted_count = len(data["prompts"]) - len(remaining)
    if deleted_count <= 0:
        return False, "未找到选中的提示词。"

    data["prompts"] = remaining
    data = _write_data(data)
    _cleanup_unused_images(data)
    return True, f"已删除 {deleted_count} 条提示词。"


def _move_prompts(names, folder):
    selected = _normalise_name_list(names)
    if not selected:
        return False, "请选择要移动的提示词。"

    target_folder = str(folder or "").strip()
    if not target_folder:
        return False, "文件夹不能为空。"

    target_folder = _normalise_folder(target_folder)
    data = _read_data()
    selected_set = set(selected)
    now = _now_iso()
    found_count = 0
    moved_count = 0

    for entry in data["prompts"]:
        if entry["name"] not in selected_set:
            continue

        found_count += 1
        if entry.get("folder") == target_folder:
            continue

        entry["folder"] = target_folder
        entry["updated_at"] = now
        moved_count += 1

    if found_count <= 0:
        return False, "未找到选中的提示词。"

    if moved_count <= 0:
        return True, "选中的提示词已经在该文件夹中。"

    _write_data(data)
    return True, f"已移动 {moved_count} 条提示词到“{target_folder}”。"


def _save_uploaded_image(field):
    original_name = Path(field.filename or "").name
    suffix = Path(original_name).suffix.lower()
    if suffix not in ALLOWED_IMAGE_SUFFIXES:
        return None, "不支持该图片格式。"

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    final_name = f"{uuid.uuid4().hex}{suffix}"
    final_path = _image_path(final_name)
    temp_path = final_path.with_suffix(f"{final_path.suffix}.tmp")
    size = 0

    try:
        with temp_path.open("wb") as handle:
            while True:
                chunk = field.file.read(1024 * 1024)
                if not chunk:
                    break
                size += len(chunk)
                if size > MAX_UPLOAD_BYTES:
                    return None, "参考图片不能超过 20MB。"
                handle.write(chunk)
        os.replace(temp_path, final_path)
    finally:
        if temp_path.exists():
            try:
                temp_path.unlink()
            except OSError:
                pass

    return final_name, "参考图片已上传。"


class MimosaPromptLibrary:
    CATEGORY = CATEGORY
    FUNCTION = "build_prompt"
    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("positive_prompt", "negative_prompt", "preset_name")

    @classmethod
    def INPUT_TYPES(cls):
        names = _prompt_names()
        return {
            "required": {
                "preset": (names,),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return _data_signature()

    @classmethod
    def VALIDATE_INPUTS(cls, **kwargs):
        return True

    def build_prompt(self, preset):
        data = _read_data()
        entry = _find_prompt(data, preset)
        if entry is None:
            return "", "", str(preset)

        positive = entry.get("positive", "")
        negative = entry.get("negative", "")
        return positive, negative, entry.get("name", str(preset))


NODE_CLASS_MAPPINGS = {
    "MimosaPromptLibrary": MimosaPromptLibrary,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "MimosaPromptLibrary": "Mimosa 提示词库",
}


if web is not None and PromptServer is not None:
    routes = PromptServer.instance.routes

    @routes.get("/mimosa_prompt_manager/prompts")
    async def get_prompts(request):
        return web.json_response(_response_payload(_read_data()), dumps=_json_dumps)

    @routes.post("/mimosa_prompt_manager/prompts")
    async def save_prompt(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        prompt, message = _upsert_prompt(
            payload,
            overwrite=bool(payload.get("overwrite", True)),
        )
        status = 200 if prompt is not None else 400
        return web.json_response(
            {
                "ok": prompt is not None,
                "message": message,
                "prompt": prompt,
                "data": _response_payload(_read_data()),
            },
            status=status,
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/favorite")
    async def set_prompt_favorite(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        prompt, message = _set_prompt_favorite(payload.get("name", ""), payload.get("favorite", False))
        status = 200 if prompt is not None else 400
        return web.json_response(
            {
                "ok": prompt is not None,
                "message": message,
                "prompt": prompt,
                "data": _response_payload(_read_data()),
            },
            status=status,
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/delete")
    async def delete_prompt(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        ok, message = _delete_prompt(payload.get("name", ""))
        return web.json_response(
            {
                "ok": ok,
                "message": message,
                "data": _response_payload(_read_data()),
            },
            status=200 if ok else 400,
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/delete-many")
    async def delete_many_prompts(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        ok, message = _delete_prompts(payload.get("names", []))
        return web.json_response(
            {
                "ok": ok,
                "message": message,
                "data": _response_payload(_read_data()),
            },
            status=200 if ok else 400,
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/move-many")
    async def move_many_prompts(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        ok, message = _move_prompts(payload.get("names", []), payload.get("folder", ""))
        return web.json_response(
            {
                "ok": ok,
                "message": message,
                "data": _response_payload(_read_data()),
            },
            status=200 if ok else 400,
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/import")
    async def import_prompts(request):
        try:
            payload = await request.json()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "JSON 数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        mode = str(payload.get("mode", "merge"))
        incoming = _normalise_data(payload)
        if mode == "replace":
            data = _write_data(incoming)
        else:
            data = _read_data()
            by_name = {entry["name"]: entry for entry in data["prompts"]}
            for entry in incoming["prompts"]:
                by_name[entry["name"]] = entry
            data["prompts"] = list(by_name.values())
            data = _write_data(data)

        _cleanup_unused_images(data)
        return web.json_response(
            {
                "ok": True,
                "message": "提示词已导入。",
                "data": _response_payload(data),
            },
            dumps=_json_dumps,
        )

    @routes.post("/mimosa_prompt_manager/reference-image")
    async def upload_reference_image(request):
        try:
            payload = await request.post()
        except Exception:
            return web.json_response(
                {"ok": False, "message": "上传数据无效。"},
                status=400,
                dumps=_json_dumps,
            )

        field = payload.get("file")
        if field is None or not getattr(field, "filename", ""):
            return web.json_response(
                {"ok": False, "message": "没有收到图片文件。"},
                status=400,
                dumps=_json_dumps,
            )

        image_name, message = _save_uploaded_image(field)
        if image_name is None:
            return web.json_response(
                {"ok": False, "message": message},
                status=400,
                dumps=_json_dumps,
            )

        return web.json_response(
            {
                "ok": True,
                "message": message,
                "reference_image": image_name,
                "reference_image_url": _image_url(image_name),
            },
            dumps=_json_dumps,
        )

    @routes.get("/mimosa_prompt_manager/reference-image")
    async def get_reference_image(request):
        image_name = _normalise_reference_image(request.query.get("name", ""))
        if not image_name:
            raise web.HTTPNotFound()

        path = _image_path(image_name)
        if not path.is_file():
            raise web.HTTPNotFound()

        return web.FileResponse(path)
