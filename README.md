# comfyui-MimosaPromptManager

这是一个用于 ComfyUI 的本地提示词管理插件。

## 安装方法

把整个文件夹放到 ComfyUI 的 `custom_nodes` 目录下，然后重启 ComfyUI。

```text
ComfyUI/custom_nodes/comfyui-MimosaPromptManager
```

## 节点说明

- `Mimosa 提示词库`
  - 用于选择一个已经保存的提示词预设。
  - 输出 `positive_prompt`、`negative_prompt` 和 `preset_name`。
  - 点击节点上的 `打开管理器` 按钮，可以直接在 ComfyUI 里管理本地提示词库。

## 面板功能

在 ComfyUI 里添加一个 `Mimosa 提示词库` 节点，然后点击 `打开管理器`。

面板支持：

- 按左侧文件夹树筛选
- 文件夹名称支持用 `/` 形成层级，例如 `人物/Miku`
- 左侧固定显示收藏夹，并在收藏夹中查看已收藏的预设
- 按标签筛选
- 按名称、标签、备注、正向提示词、反向提示词搜索
- 新建、编辑、删除提示词
- 全选当前界面、清空选择和批量删除提示词
- 为每条提示词设置文件夹
- 为每条提示词上传和预览参考图片
- 点击参考图片查看大图，再次点击大图关闭预览
- 列表滚动后显示回到顶部按钮
- 支持浅色和深色界面切换
- 导入和导出 JSON
- 复制正向提示词或反向提示词
- 把当前选中的预设写回当前选中的 `Mimosa 提示词库` 节点

## 数据文件

提示词数据保存在：

```text
prompts.json
```

参考图片保存在：

```text
reference_images/
```

插件使用 UTF-8 JSON 保存数据，所有内容都保留在本地。

## 数据结构

每条提示词包含以下字段：

- `name`
- `folder`
- `positive`
- `negative`
- `tags`
- `note`
- `reference_image`
- `favorite`
- `created_at`
- `updated_at`

`reference_image` 保存的是插件目录下 `reference_images/` 中的文件名。
