import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const ROUTE = "/mimosa_prompt_manager";
const DEFAULT_FOLDER = "默认文件夹";
const ALL_FOLDERS_VALUE = "__all_folders__";
const FAVORITES_FOLDER_VALUE = "__favorites__";
const ALL_TAGS_VALUE = "__all_tags__";
const FOLDER_SEPARATOR = "/";

const I18N = {
    zh: {
        managerTitle: "Mimosa 提示词管理器",
        languageToggle: "EN",
        languageToggleTitle: "切换到英文",
        languageSwitched: "已切换到中文。",
        themeLight: "浅色",
        themeDark: "深色",
        themeLightTitle: "切换到浅色模式",
        themeDarkTitle: "切换到深色模式",
        close: "关闭",
        searchPlaceholder: "搜索名称、标签、备注或提示词",
        countText: "共 {count} 条",
        folderHeading: "文件夹",
        tableName: "名称",
        tableFolder: "文件夹",
        tableTags: "标签",
        tableContent: "提示词内容",
        tablePreview: "预览",
        tableActions: "操作",
        backLibrary: "返回词库",
        editorTitleCreate: "新建提示词",
        editorTitleEdit: "编辑提示词",
        promptName: "提示词名称",
        promptNamePlaceholder: "请输入提示词名称",
        folder: "文件夹",
        folderPlaceholder: "例如：人物/Miku",
        chooseExistingFolder: "选择已有文件夹",
        tags: "标签",
        tagsPlaceholder: "标签1, 标签2",
        private: "私密",
        positivePrompt: "正向提示词",
        positivePlaceholder: "请输入正向提示词",
        negativePrompt: "反向提示词",
        negativePlaceholder: "请输入反向提示词",
        removePromptToken: "删除提示词：{token}",
        referenceImage: "参考图片",
        noReferenceImage: "未上传参考图。",
        chooseImage: "选择图片",
        clearImage: "清空图片",
        note: "备注",
        notePlaceholder: "可记录用途、模型、风格说明",
        libraryTab: "词库",
        ready: "就绪。",
        actionSelectAll: "全选当前界面",
        actionClearSelection: "清空选择",
        actionBatchMove: "批量移动",
        actionBatchMoveCount: "批量移动 ({count})",
        actionBatchDelete: "批量删除",
        actionBatchDeleteCount: "批量删除 ({count})",
        actionNew: "新建",
        actionImport: "导入",
        actionExport: "导出",
        actionSave: "保存",
        actionInsert: "写入节点",
        actionDelete: "删除",
        backToTop: "回到顶部",
        confirmTitle: "确认操作",
        inputLabel: "输入",
        cancel: "取消",
        confirm: "确认",
        existingFolderMode: "选择已有文件夹",
        newFolderMode: "新建文件夹",
        existingFolder: "已有文件夹",
        newFolder: "新文件夹",
        allFolders: "全部文件夹",
        favorites: "收藏夹",
        allTags: "全部标签",
        summaryPositiveMissing: "未填写正向提示词。",
        summaryNegativeMissing: "未填写反向提示词。",
        previewPending: "待保存图片：{name}",
        previewSaved: "已保存图片：{name}",
        viewLarge: "查看大图",
        fieldRequired: "{label}不能为空。",
        privateSearchToken: "私密",
        noSelectablePrompts: "当前界面没有可选择的提示词。",
        selectionCleared: "已清空选择。",
        selectedCurrent: "已选择当前界面的 {count} 条提示词。",
        editingNew: "正在编辑新提示词。",
        editingPrompt: "正在编辑“{name}”。",
        positiveEmpty: "正向提示词为空。",
        negativeEmpty: "反向提示词为空。",
        positiveCopied: "正向提示词已复制。",
        negativeCopied: "反向提示词已复制。",
        favoriteAdded: "提示词已加入收藏夹。",
        favoriteRemoved: "提示词已从收藏夹移除。",
        folderRequired: "文件夹不能为空。",
        chooseFolderOrNew: "请选择已有文件夹，或切换到新建文件夹。",
        noPromptsFound: "没有找到提示词。",
        selectAria: "选择 {name}",
        rowIndex: "序号 {index}",
        noTags: "无标签",
        noImage: "无图",
        favorite: "收藏",
        unfavorite: "取消收藏",
        edit: "编辑",
        copyPositive: "复制正向",
        copyNegative: "复制反向",
        loadedCount: "已加载 {count} 条提示词。",
        imageUploaded: "参考图片已上传。",
        saved: "提示词已保存。",
        selectOnePrompt: "请先选择一个提示词。",
        deletePromptTitle: "删除提示词",
        deletePromptMessage: "确定删除“{name}”吗？",
        deletedPrompt: "提示词已删除。",
        selectMovePrompts: "请先选择要移动的提示词。",
        batchMoveTitle: "批量移动",
        batchMoveMessage: "选中的 {count} 条提示词将移动到指定文件夹。",
        move: "移动",
        movedCount: "已移动 {count} 条提示词。",
        selectDeletePrompts: "请先选择要删除的提示词。",
        batchDeleteTitle: "批量删除",
        batchDeleteMessage: "确定批量删除 {count} 条提示词吗？",
        deletedCount: "已删除 {count} 条提示词。",
        nameRequired: "名称不能为空。",
        selectNode: "请先选择一个 Mimosa 提示词库 节点。",
        widgetMissing: "所选节点上未找到预设控件。",
        wroteNode: "已将预设“{name}”写入当前选中节点。",
        exportStarted: "已开始导出。",
        importDone: "提示词已导入。",
        imageSelected: "已选择参考图片：{name}",
        imageCleared: "参考图片已清空。",
        loading: "正在加载提示词...",
        openManager: "打开管理器",
        reloadPresets: "刷新预设",
    },
    en: {
        managerTitle: "Mimosa Prompt Manager",
        languageToggle: "中",
        languageToggleTitle: "Switch to Chinese",
        languageSwitched: "Switched to English.",
        themeLight: "Light",
        themeDark: "Dark",
        themeLightTitle: "Switch to light mode",
        themeDarkTitle: "Switch to dark mode",
        close: "Close",
        searchPlaceholder: "Search name, tags, notes, or prompts",
        countText: "{count} total",
        folderHeading: "Folders",
        tableName: "Name",
        tableFolder: "Folder",
        tableTags: "Tags",
        tableContent: "Prompt",
        tablePreview: "Preview",
        tableActions: "Actions",
        backLibrary: "Back to Library",
        editorTitleCreate: "New Prompt",
        editorTitleEdit: "Edit Prompt",
        promptName: "Prompt Name",
        promptNamePlaceholder: "Enter prompt name",
        folder: "Folder",
        folderPlaceholder: "Example: Character/Miku",
        chooseExistingFolder: "Choose Existing Folder",
        tags: "Tags",
        tagsPlaceholder: "Tag 1, Tag 2",
        private: "Private",
        positivePrompt: "Positive Prompt",
        positivePlaceholder: "Enter positive prompt",
        negativePrompt: "Negative Prompt",
        negativePlaceholder: "Enter negative prompt",
        removePromptToken: "Remove prompt token: {token}",
        referenceImage: "Reference Image",
        noReferenceImage: "No reference image.",
        chooseImage: "Choose Image",
        clearImage: "Clear Image",
        note: "Note",
        notePlaceholder: "Record usage, model, or style notes",
        libraryTab: "Library",
        ready: "Ready.",
        actionSelectAll: "Select Current View",
        actionClearSelection: "Clear Selection",
        actionBatchMove: "Batch Move",
        actionBatchMoveCount: "Batch Move ({count})",
        actionBatchDelete: "Batch Delete",
        actionBatchDeleteCount: "Batch Delete ({count})",
        actionNew: "New",
        actionImport: "Import",
        actionExport: "Export",
        actionSave: "Save",
        actionInsert: "Write to Node",
        actionDelete: "Delete",
        backToTop: "Back to Top",
        confirmTitle: "Confirm Action",
        inputLabel: "Input",
        cancel: "Cancel",
        confirm: "Confirm",
        existingFolderMode: "Choose Existing Folder",
        newFolderMode: "Create Folder",
        existingFolder: "Existing Folder",
        newFolder: "New Folder",
        allFolders: "All Folders",
        favorites: "Favorites",
        allTags: "All Tags",
        summaryPositiveMissing: "No positive prompt.",
        summaryNegativeMissing: "No negative prompt.",
        previewPending: "Pending image: {name}",
        previewSaved: "Saved image: {name}",
        viewLarge: "View full image",
        fieldRequired: "{label} is required.",
        privateSearchToken: "private",
        noSelectablePrompts: "There are no prompts to select in the current view.",
        selectionCleared: "Selection cleared.",
        selectedCurrent: "Selected {count} prompts in the current view.",
        editingNew: "Editing a new prompt.",
        editingPrompt: "Editing \"{name}\".",
        positiveEmpty: "Positive prompt is empty.",
        negativeEmpty: "Negative prompt is empty.",
        positiveCopied: "Positive prompt copied.",
        negativeCopied: "Negative prompt copied.",
        favoriteAdded: "Prompt added to favorites.",
        favoriteRemoved: "Prompt removed from favorites.",
        folderRequired: "Folder is required.",
        chooseFolderOrNew: "Choose an existing folder or switch to create a folder.",
        noPromptsFound: "No prompts found.",
        selectAria: "Select {name}",
        rowIndex: "No. {index}",
        noTags: "No tags",
        noImage: "No image",
        favorite: "Favorite",
        unfavorite: "Unfavorite",
        edit: "Edit",
        copyPositive: "Copy Positive",
        copyNegative: "Copy Negative",
        loadedCount: "Loaded {count} prompts.",
        imageUploaded: "Reference image uploaded.",
        saved: "Prompt saved.",
        selectOnePrompt: "Select a prompt first.",
        deletePromptTitle: "Delete Prompt",
        deletePromptMessage: "Delete \"{name}\"?",
        deletedPrompt: "Prompt deleted.",
        selectMovePrompts: "Select prompts to move first.",
        batchMoveTitle: "Batch Move",
        batchMoveMessage: "Move the selected {count} prompts to a folder.",
        move: "Move",
        movedCount: "Moved {count} prompts.",
        selectDeletePrompts: "Select prompts to delete first.",
        batchDeleteTitle: "Batch Delete",
        batchDeleteMessage: "Delete {count} selected prompts?",
        deletedCount: "Deleted {count} prompts.",
        nameRequired: "Name is required.",
        selectNode: "Select a Mimosa Prompt Library node first.",
        widgetMissing: "The selected node does not have a preset widget.",
        wroteNode: "Wrote \"{name}\" to the selected node.",
        exportStarted: "Export started.",
        importDone: "Prompts imported.",
        imageSelected: "Selected reference image: {name}",
        imageCleared: "Reference image cleared.",
        loading: "Loading prompts...",
        openManager: "Open Manager",
        reloadPresets: "Refresh Presets",
    },
};

const state = {
    prompts: [],
    activeName: "",
    node: null,
    root: null,
    refs: {},
    view: "library",
    editorMode: "create",
    activeFolder: ALL_FOLDERS_VALUE,
    selectedNames: new Set(),
    currentReferenceImage: "",
    currentReferenceImageUrl: "",
    pendingImageFile: null,
    pendingImageUrl: "",
    theme: "light",
    language: "zh",
    actionDialogResolve: null,
};

function textNode(value) {
    return document.createTextNode(value == null ? "" : String(value));
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) {
        node.className = className;
    }
    if (text !== undefined) {
        node.appendChild(textNode(text));
    }
    return node;
}

function formatText(template, values = {}) {
    return String(template || "").replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) =>
        Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match,
    );
}

function t(key, values = {}) {
    const language = state.language === "en" ? "en" : "zh";
    const value = I18N[language]?.[key] ?? I18N.zh[key] ?? key;
    return formatText(value, values);
}

function localStatus(serverMessage, key, values = {}) {
    if (state.language === "zh" && serverMessage) {
        return serverMessage;
    }
    return t(key, values);
}

function injectStyle() {
    if (document.getElementById("mimosa-prompt-manager-style")) {
        return;
    }

    const style = document.createElement("style");
    style.id = "mimosa-prompt-manager-style";
    style.textContent = `
.mpm-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(10, 14, 22, 0.62);
}
.mpm-overlay.is-open {
    display: flex;
}
.mpm-dialog {
    width: min(1500px, calc(100vw - 24px));
    height: min(860px, calc(100vh - 24px));
    position: relative;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    overflow: hidden;
    border: 1px solid #d5deea;
    border-radius: 12px;
    background: #f4f7fb;
    color: #182435;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
    font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}
.mpm-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 64px;
    padding: 0 16px;
    border-bottom: 1px solid #d8e1eb;
    background: #182334;
    color: #ffffff;
}
.mpm-title {
    font-size: 15px;
    font-weight: 700;
}
.mpm-topbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
.mpm-close {
    height: 36px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    color: #ffffff;
    cursor: pointer;
    font: inherit;
}
.mpm-shell {
    min-height: 0;
    position: relative;
}
.mpm-view {
    height: 100%;
    min-height: 0;
}
.mpm-view[hidden] {
    display: none;
}
.mpm-library {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 12px;
    padding: 16px;
}
.mpm-toolbar {
    display: grid;
    grid-template-columns: 220px minmax(220px, 1fr) auto;
    gap: 10px;
    align-items: center;
}
.mpm-toolbar-note {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 92px;
    height: 38px;
    padding: 0 12px;
    border: 1px solid #d4dde8;
    border-radius: 10px;
    background: #ffffff;
    color: #55657b;
    font-size: 12px;
}
.mpm-library-body {
    min-height: 0;
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 12px;
}
.mpm-folder-panel {
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    overflow: hidden;
}
.mpm-folder-head {
    padding: 14px 14px 10px;
    color: #526278;
    font-size: 12px;
    font-weight: 700;
}
.mpm-folder-tree {
    min-height: 0;
    overflow: auto;
    padding: 0 8px 10px;
}
.mpm-folder-tree-item {
    width: 100%;
    min-width: 0;
    height: 34px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
    align-items: center;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #334155;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    text-align: left;
}
.mpm-folder-tree-item:hover {
    background: #f3f7fc;
}
.mpm-folder-tree-item.is-active {
    background: #e8f1ff;
    color: #2458b8;
    font-weight: 700;
}
.mpm-folder-tree-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.mpm-folder-tree-count {
    min-width: 24px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: #edf3fa;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
}
.mpm-panel {
    border: 1px solid #dde4ee;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
}
.mpm-table-wrap {
    min-height: 0;
    min-width: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    overflow: hidden;
}
.mpm-table-head,
.mpm-row {
    display: grid;
    grid-template-columns: 160px 110px 110px minmax(180px, 1fr) 88px 430px;
    gap: 12px;
    align-items: center;
}
.mpm-table-head {
    justify-items: start;
    padding: 14px 16px;
    border-bottom: 1px solid #e7edf4;
    color: #526278;
    font-size: 12px;
    font-weight: 700;
    text-align: left;
}
.mpm-table-head > div:last-child {
    justify-self: center;
    text-align: center;
}
.mpm-table-body {
    min-height: 0;
    overflow: auto;
}
.mpm-row {
    padding: 14px 16px;
    border-bottom: 1px solid #edf2f7;
    cursor: pointer;
    background: #ffffff;
}
.mpm-row:last-child {
    border-bottom: 0;
}
.mpm-row:hover {
    background: #f8fbff;
}
.mpm-row.is-active {
    background: #eef5ff;
}
.mpm-row.is-selected {
    background: #f1f7ff;
}
.mpm-row.is-active.is-selected {
    background: #e5f0ff;
}
.mpm-cell {
    min-width: 0;
    font-size: 13px;
    color: #253344;
}
.mpm-name {
    display: grid;
    gap: 4px;
}
.mpm-name-main {
    min-width: 0;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 8px;
    align-items: center;
}
.mpm-row-check {
    width: 16px;
    height: 16px;
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    display: grid;
    place-items: center;
    border: 1px solid #c8d3e1;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
}
.mpm-row-check:checked {
    border-color: #4c8bf5;
    background: #4c8bf5;
}
.mpm-row-check:checked::after {
    content: "";
    width: 8px;
    height: 5px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: translateY(-1px) rotate(-45deg);
}
.mpm-row-check:focus-visible {
    outline: 2px solid rgba(76, 139, 245, 0.35);
    outline-offset: 2px;
}
.mpm-name-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
}
.mpm-name-meta {
    color: #708198;
    font-size: 12px;
}
.mpm-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.mpm-badge {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    border-radius: 999px;
    background: #eef4fb;
    color: #45607b;
    font-size: 12px;
}
.mpm-summary {
    color: #425266;
    line-height: 1.5;
}
.mpm-summary-primary,
.mpm-summary-secondary {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.mpm-summary-secondary {
    margin-top: 6px;
    color: #76859a;
    font-size: 12px;
}
.mpm-preview {
    position: relative;
    width: 72px;
    height: 72px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid #dfe6ef;
    border-radius: 10px;
    background: #f7f9fc;
}
.mpm-preview.has-image {
    cursor: zoom-in;
}
.mpm-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.mpm-preview.is-private img {
    filter: blur(7px);
    transform: scale(1.04);
}
.mpm-preview-empty {
    color: #93a0b1;
    font-size: 12px;
}
.mpm-private-eye {
    --mpm-private-eye-line: #ffffff;
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    background: rgba(15, 23, 42, 0.7);
}
.mpm-private-eye[hidden] {
    display: none;
}
.mpm-private-eye::before {
    content: "";
    width: 34px;
    height: 20px;
    border: 2px solid var(--mpm-private-eye-line);
    border-radius: 50%;
    background: radial-gradient(circle at center, var(--mpm-private-eye-line) 0 4px, transparent 5px);
    opacity: 0.96;
}
.mpm-private-eye::after {
    content: "";
    position: absolute;
    width: 46px;
    height: 46px;
    background:
        linear-gradient(45deg, transparent calc(50% - 1.5px), var(--mpm-private-eye-line) calc(50% - 1.5px), var(--mpm-private-eye-line) calc(50% + 1.5px), transparent calc(50% + 1.5px)),
        linear-gradient(-45deg, transparent calc(50% - 1.5px), var(--mpm-private-eye-line) calc(50% - 1.5px), var(--mpm-private-eye-line) calc(50% + 1.5px), transparent calc(50% + 1.5px));
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.28));
}
.mpm-row-actions {
    display: flex;
    flex-wrap: nowrap;
    gap: 6px;
    justify-content: flex-end;
    align-items: center;
}
.mpm-row-actions .mpm-button {
    height: 34px;
    padding: 0 9px;
    white-space: nowrap;
}
.mpm-row-actions .mpm-favorite-button {
    width: 34px;
    padding: 0;
    font-size: 16px;
    line-height: 1;
}
.mpm-favorite-button.is-favorite {
    border-color: #f0c46a;
    background: #fff8e6;
    color: #b7791f;
}
.mpm-editor {
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    padding: 16px;
}
.mpm-editor-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 0 14px;
}
.mpm-back {
    height: 34px;
    padding: 0 12px;
    border: 1px solid #d5deea;
    border-radius: 8px;
    background: #ffffff;
    color: #28394f;
    cursor: pointer;
    font: inherit;
}
.mpm-editor-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a2737;
}
.mpm-editor-card {
    min-height: 0;
    overflow: auto;
    padding: 18px 18px 24px;
}
.mpm-form {
    display: grid;
    gap: 16px;
}
.mpm-field {
    display: grid;
    gap: 8px;
}
.mpm-field-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 220px;
    gap: 12px;
}
.mpm-switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-self: start;
    gap: 10px;
    color: #4d5d72;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
}
.mpm-switch input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
}
.mpm-switch-track {
    position: relative;
    width: 46px;
    height: 26px;
    border: 1px solid #cbd6e3;
    border-radius: 999px;
    background: #dce5ef;
    transition: background 0.15s ease, border-color 0.15s ease;
}
.mpm-switch-track::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.22);
    transition: transform 0.15s ease;
}
.mpm-switch input:checked + .mpm-switch-track {
    border-color: #4c8bf5;
    background: #4c8bf5;
}
.mpm-switch input:checked + .mpm-switch-track::after {
    transform: translateX(20px);
}
.mpm-switch input:focus-visible + .mpm-switch-track {
    box-shadow: 0 0 0 3px rgba(76, 139, 245, 0.18);
}
.mpm-label {
    color: #4d5d72;
    font-size: 13px;
    font-weight: 700;
}
.mpm-label.is-required::after {
    content: "*";
    margin-left: 4px;
    color: #e5484d;
}
.mpm-input,
.mpm-textarea,
.mpm-select {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    border: 1px solid #d8e0ea;
    border-radius: 10px;
    background: #ffffff;
    color: #182435;
    outline: none;
    font: inherit;
}
.mpm-input,
.mpm-select {
    height: 42px;
    padding: 0 12px;
}
.mpm-select {
    appearance: none;
    -webkit-appearance: none;
    padding-right: 42px;
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%234b5b70' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 18px center;
    background-size: 16px 16px;
}
.mpm-textarea {
    resize: vertical;
    min-height: 120px;
    padding: 12px;
    line-height: 1.55;
}
.mpm-textarea.is-large {
    min-height: 160px;
}
.mpm-token-preview {
    min-height: 42px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    padding: 8px;
    border: 1px solid #e0e8f2;
    border-radius: 10px;
    background: #fbfdff;
}
.mpm-token-preview:empty {
    display: none;
}
.mpm-token-chip {
    max-width: 100%;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 26px;
    padding: 3px 4px 3px 8px;
    border: 1px solid var(--mpm-token-border);
    border-radius: 8px;
    background: var(--mpm-token-bg);
    color: var(--mpm-token-text);
    font-size: 12px;
    line-height: 1.45;
    word-break: break-word;
}
.mpm-token-text {
    min-width: 0;
    overflow-wrap: anywhere;
}
.mpm-token-remove {
    flex: 0 0 auto;
    width: 18px;
    height: 18px;
    display: inline-grid;
    place-items: center;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    line-height: 1;
}
.mpm-token-remove:hover {
    background: rgba(239, 68, 68, 0.14);
    color: #b42318;
}
.mpm-token-chip:nth-child(6n + 1) {
    --mpm-token-bg: #eef6ff;
    --mpm-token-border: #b7d8ff;
    --mpm-token-text: #1e4f91;
}
.mpm-token-chip:nth-child(6n + 2) {
    --mpm-token-bg: #f0fdf6;
    --mpm-token-border: #a9e6c5;
    --mpm-token-text: #236c44;
}
.mpm-token-chip:nth-child(6n + 3) {
    --mpm-token-bg: #fff7ed;
    --mpm-token-border: #fed1a8;
    --mpm-token-text: #925122;
}
.mpm-token-chip:nth-child(6n + 4) {
    --mpm-token-bg: #f7f1ff;
    --mpm-token-border: #d6c2ff;
    --mpm-token-text: #62449b;
}
.mpm-token-chip:nth-child(6n + 5) {
    --mpm-token-bg: #fff1f2;
    --mpm-token-border: #ffc0c8;
    --mpm-token-text: #9f3644;
}
.mpm-token-chip:nth-child(6n) {
    --mpm-token-bg: #effaf8;
    --mpm-token-border: #a9ded7;
    --mpm-token-text: #22665f;
}
.mpm-input:focus,
.mpm-textarea:focus,
.mpm-select:focus {
    border-color: #4c8bf5;
    box-shadow: 0 0 0 3px rgba(76, 139, 245, 0.14);
}
.mpm-reference {
    display: grid;
    gap: 10px;
}
.mpm-reference-box {
    position: relative;
    min-height: 260px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px dashed #d1dbe7;
    border-radius: 12px;
    background: #fafcff;
}
.mpm-reference-box.has-image {
    border-style: solid;
    cursor: zoom-in;
}
.mpm-reference-image {
    max-width: 100%;
    max-height: 360px;
    display: block;
}
.mpm-reference-box.is-private .mpm-reference-image {
    filter: blur(7px);
    transform: scale(1.04);
}
.mpm-reference-empty {
    color: #95a2b3;
    font-size: 13px;
}
.mpm-reference-meta {
    color: #728198;
    font-size: 12px;
}
.mpm-inline-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.mpm-bottombar {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 12px 16px;
    border-top: 1px solid #dce5ef;
    background: #ffffff;
    box-shadow: 0 -4px 18px rgba(15, 23, 42, 0.06);
}
.mpm-tabs {
    display: flex;
    gap: 8px;
}
.mpm-status {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #5f6f84;
    font-size: 12px;
}
.mpm-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
}
.mpm-back-top {
    position: absolute;
    right: 58px;
    bottom: 176px;
    z-index: 3;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border: 1px solid #d5deea;
    border-radius: 999px;
    background: #ffffff;
    color: #243548;
    cursor: pointer;
    font: inherit;
    font-size: 18px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
}
.mpm-back-top:hover {
    background: #f5f8fc;
}
.mpm-back-top[hidden] {
    display: none;
}
.mpm-button {
    height: 36px;
    padding: 0 14px;
    border: 1px solid #d5deea;
    border-radius: 9px;
    background: #ffffff;
    color: #243548;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
}
.mpm-button:hover {
    background: #f5f8fc;
}
.mpm-button.is-primary {
    border-color: #4c8bf5;
    background: #4c8bf5;
    color: #ffffff;
}
.mpm-button.is-danger {
    border-color: #e7caca;
    background: #fff7f5;
    color: #c94e36;
}
.mpm-button.is-tab {
    min-width: 72px;
}
.mpm-button.is-tab.is-active {
    border-color: #4c8bf5;
    background: #eaf2ff;
    color: #2458b8;
}
.mpm-button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}
.mpm-file {
    display: none;
}
.mpm-empty-state {
    padding: 28px 16px;
    text-align: center;
    color: #8291a5;
    font-size: 13px;
}
.mpm-image-viewer {
    position: fixed;
    inset: 0;
    z-index: 10001;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 12px;
    padding: 24px;
    background: rgba(11, 16, 24, 0.82);
}
.mpm-image-viewer[hidden] {
    display: none;
}
.mpm-image-viewer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #ffffff;
}
.mpm-image-viewer-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
}
.mpm-image-viewer-stage {
    min-height: 0;
    display: grid;
    place-items: center;
}
.mpm-image-viewer-image {
    max-width: min(100%, 1200px);
    max-height: calc(100vh - 110px);
    border-radius: 10px;
    cursor: zoom-out;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}
.mpm-action-dialog {
    position: fixed;
    inset: 0;
    z-index: 10002;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(11, 16, 24, 0.55);
}
.mpm-action-dialog[hidden] {
    display: none;
}
.mpm-action-dialog-panel {
    width: min(440px, calc(100vw - 48px));
    display: grid;
    gap: 16px;
    padding: 20px;
    border: 1px solid #d8e0ea;
    border-radius: 12px;
    background: #ffffff;
    color: #182435;
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.32);
}
.mpm-action-dialog-title {
    font-size: 16px;
    font-weight: 700;
}
.mpm-action-dialog-message {
    color: #526278;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
}
.mpm-action-dialog-field {
    display: grid;
    gap: 8px;
}
.mpm-action-dialog-field[hidden] {
    display: none;
}
.mpm-action-dialog-folder {
    display: grid;
    gap: 12px;
}
.mpm-action-dialog-folder[hidden] {
    display: none;
}
.mpm-action-dialog-mode {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px;
}
.mpm-action-dialog-mode-option {
    min-width: 0;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid #d5deea;
    border-radius: 9px;
    background: #ffffff;
    color: #334155;
    cursor: pointer;
    font-size: 13px;
    font-weight: 700;
}
.mpm-action-dialog-mode-option input {
    width: 14px;
    height: 14px;
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    display: grid;
    place-items: center;
    border: 1px solid #b8c5d6;
    border-radius: 999px;
    background: #ffffff;
}
.mpm-action-dialog-mode-option input::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: transparent;
}
.mpm-action-dialog-mode-option input:checked {
    border-color: #4c8bf5;
}
.mpm-action-dialog-mode-option input:checked::after {
    background: #4c8bf5;
}
.mpm-action-dialog-mode-option input:focus-visible {
    outline: 2px solid rgba(76, 139, 245, 0.28);
    outline-offset: 2px;
}
.mpm-action-dialog-mode-option:has(input:checked) {
    border-color: #4c8bf5;
    background: #eaf2ff;
    color: #2458b8;
}
.mpm-action-dialog-mode-option:has(input:disabled) {
    opacity: 0.45;
    cursor: not-allowed;
}
.mpm-action-dialog-folder-field {
    display: grid;
    gap: 8px;
}
.mpm-action-dialog-folder-field[hidden] {
    display: none;
}
.mpm-action-dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}
.mpm-dialog.is-dark {
    border-color: #334155;
    background: #111827;
    color: #e5edf7;
}
.mpm-dialog.is-dark .mpm-topbar {
    border-bottom-color: #263449;
    background: #0f172a;
}
.mpm-dialog.is-dark .mpm-panel {
    border-color: #334155;
    background: #172033;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.mpm-dialog.is-dark .mpm-action-dialog-panel {
    border-color: #334155;
    background: #172033;
    color: #e5edf7;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}
.mpm-dialog.is-dark .mpm-action-dialog-message {
    color: #adc0d6;
}
.mpm-dialog.is-dark .mpm-action-dialog-mode-option {
    border-color: #3b4a61;
    background: #121b2b;
    color: #dce7f4;
}
.mpm-dialog.is-dark .mpm-action-dialog-mode-option input {
    border-color: #5a6f8b;
    background: #0f172a;
}
.mpm-dialog.is-dark .mpm-action-dialog-mode-option input:checked {
    border-color: #6da1ff;
}
.mpm-dialog.is-dark .mpm-action-dialog-mode-option input:checked::after {
    background: #6da1ff;
}
.mpm-dialog.is-dark .mpm-action-dialog-mode-option:has(input:checked) {
    border-color: #5b8df7;
    background: #1b3760;
    color: #d8e8ff;
}
.mpm-dialog.is-dark .mpm-table-head {
    border-bottom-color: #2b3a50;
    color: #adc0d6;
}
.mpm-dialog.is-dark .mpm-row {
    border-bottom-color: #263449;
    background: #172033;
}
.mpm-dialog.is-dark .mpm-row:hover {
    background: #1d2a3e;
}
.mpm-dialog.is-dark .mpm-row.is-active {
    background: #203c61;
}
.mpm-dialog.is-dark .mpm-row.is-selected {
    background: #1a2940;
}
.mpm-dialog.is-dark .mpm-row.is-active.is-selected {
    background: #20395a;
}
.mpm-dialog.is-dark .mpm-cell,
.mpm-dialog.is-dark .mpm-summary,
.mpm-dialog.is-dark .mpm-editor-title {
    color: #dce7f4;
}
.mpm-dialog.is-dark .mpm-name-meta,
.mpm-dialog.is-dark .mpm-summary-secondary,
.mpm-dialog.is-dark .mpm-status,
.mpm-dialog.is-dark .mpm-reference-meta {
    color: #91a4bb;
}
.mpm-dialog.is-dark .mpm-badge {
    background: #243246;
    color: #c7d7eb;
}
.mpm-dialog.is-dark .mpm-switch {
    color: #adc0d6;
}
.mpm-dialog.is-dark .mpm-switch-track {
    border-color: #4b5b70;
    background: #263449;
}
.mpm-dialog.is-dark .mpm-folder-head {
    color: #adc0d6;
}
.mpm-dialog.is-dark .mpm-folder-tree-item {
    color: #c8d5e5;
}
.mpm-dialog.is-dark .mpm-folder-tree-item:hover {
    background: #1e2b40;
}
.mpm-dialog.is-dark .mpm-folder-tree-item.is-active {
    background: #1b3760;
    color: #d8e8ff;
}
.mpm-dialog.is-dark .mpm-folder-tree-count {
    background: #263449;
    color: #aebfd4;
}
.mpm-dialog.is-dark .mpm-row-check {
    border-color: #4b5b70;
    background: #121b2b;
}
.mpm-dialog.is-dark .mpm-row-check:checked {
    border-color: #6da1ff;
    background: #477ee6;
}
.mpm-dialog.is-dark .mpm-preview,
.mpm-dialog.is-dark .mpm-reference-box {
    border-color: #35435b;
    background: #111827;
}
.mpm-dialog.is-dark .mpm-preview-empty,
.mpm-dialog.is-dark .mpm-reference-empty,
.mpm-dialog.is-dark .mpm-empty-state {
    color: #91a4bb;
}
.mpm-dialog.is-dark .mpm-toolbar-note,
.mpm-dialog.is-dark .mpm-back,
.mpm-dialog.is-dark .mpm-button,
.mpm-dialog.is-dark .mpm-input,
.mpm-dialog.is-dark .mpm-textarea,
.mpm-dialog.is-dark .mpm-select {
    border-color: #3b4a61;
    background: #121b2b;
    color: #e6edf7;
}
.mpm-dialog.is-dark .mpm-input::placeholder,
.mpm-dialog.is-dark .mpm-textarea::placeholder {
    color: #788ca5;
}
.mpm-dialog.is-dark .mpm-token-preview {
    border-color: #334155;
    background: #111827;
}
.mpm-dialog.is-dark .mpm-token-remove {
    background: rgba(15, 23, 42, 0.54);
}
.mpm-dialog.is-dark .mpm-token-remove:hover {
    background: rgba(248, 113, 113, 0.2);
    color: #fecaca;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n + 1) {
    --mpm-token-bg: #12233a;
    --mpm-token-border: #2f6097;
    --mpm-token-text: #b8d9ff;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n + 2) {
    --mpm-token-bg: #112b1d;
    --mpm-token-border: #2d7a4d;
    --mpm-token-text: #b9edcf;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n + 3) {
    --mpm-token-bg: #332211;
    --mpm-token-border: #9b6630;
    --mpm-token-text: #ffd3aa;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n + 4) {
    --mpm-token-bg: #241a3b;
    --mpm-token-border: #7059a8;
    --mpm-token-text: #dacaff;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n + 5) {
    --mpm-token-bg: #35151c;
    --mpm-token-border: #9b4655;
    --mpm-token-text: #ffc8d0;
}
.mpm-dialog.is-dark .mpm-token-chip:nth-child(6n) {
    --mpm-token-bg: #112b2b;
    --mpm-token-border: #347b78;
    --mpm-token-text: #b7ece8;
}
.mpm-dialog.is-dark .mpm-select {
    background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%23d5e1f0' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 18px center;
    background-size: 16px 16px;
}
.mpm-dialog.is-dark .mpm-button:hover,
.mpm-dialog.is-dark .mpm-back:hover {
    background: #1e2b40;
}
.mpm-dialog.is-dark .mpm-button.is-primary {
    border-color: #5b8df7;
    background: #477ee6;
    color: #ffffff;
}
.mpm-dialog.is-dark .mpm-button.is-danger {
    border-color: #7d3a36;
    background: #311d22;
    color: #ffad9f;
}
.mpm-dialog.is-dark .mpm-button.is-tab.is-active {
    border-color: #5b8df7;
    background: #1b3760;
    color: #d8e8ff;
}
.mpm-dialog.is-dark .mpm-favorite-button.is-favorite {
    border-color: #b7791f;
    background: #3a2a12;
    color: #ffd166;
}
.mpm-dialog.is-dark .mpm-bottombar {
    border-top-color: #2e3b50;
    background: #101827;
    box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.25);
}
.mpm-dialog.is-dark .mpm-back-top {
    border-color: #3b4a61;
    background: #121b2b;
    color: #e6edf7;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.32);
}
.mpm-dialog.is-dark .mpm-back-top:hover {
    background: #1e2b40;
}
.mpm-dialog.is-dark .mpm-label {
    color: #c3d2e5;
}
@media (max-width: 1040px) {
    .mpm-toolbar {
        grid-template-columns: 200px minmax(180px, 1fr) auto;
    }
    .mpm-library-body {
        grid-template-columns: 200px minmax(0, 1fr);
    }
    .mpm-table-head,
    .mpm-row {
        grid-template-columns: 140px 100px 100px minmax(160px, 1fr) 80px 410px;
    }
    .mpm-field-grid {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 760px) {
    .mpm-dialog {
        width: calc(100vw - 12px);
        height: calc(100vh - 12px);
        border-radius: 10px;
    }
    .mpm-library,
    .mpm-editor {
        padding: 12px;
    }
    .mpm-toolbar {
        grid-template-columns: 1fr;
    }
    .mpm-library-body {
        grid-template-columns: 1fr;
        grid-template-rows: auto minmax(0, 1fr);
    }
    .mpm-folder-panel {
        max-height: 180px;
    }
    .mpm-table-head {
        display: none;
    }
    .mpm-row {
        grid-template-columns: 1fr;
    }
    .mpm-row-actions {
        justify-content: flex-start;
        overflow-x: auto;
    }
    .mpm-bottombar {
        grid-template-columns: 1fr;
    }
    .mpm-actions {
        justify-content: flex-start;
    }
    .mpm-back-top {
        right: 16px;
        bottom: 116px;
    }
}
`;
    document.head.appendChild(style);
}

async function requestJson(path, options = {}) {
    const response = await api.fetchApi(`${ROUTE}${path}`, options);
    const text = await response.text();
    let payload = {};
    if (text) {
        payload = JSON.parse(text);
    }
    if (!response.ok) {
        throw new Error(payload.message || `HTTP ${response.status}`);
    }
    return payload;
}

function setStatus(message) {
    if (state.refs.status) {
        state.refs.status.textContent = message;
    }
}

function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    const isDark = nextTheme === "dark";

    state.theme = nextTheme;
    state.refs.dialog?.classList.toggle("is-dark", isDark);

    if (state.refs.themeToggle) {
        state.refs.themeToggle.textContent = isDark ? t("themeLight") : t("themeDark");
        state.refs.themeToggle.title = isDark ? t("themeLightTitle") : t("themeDarkTitle");
        state.refs.themeToggle.setAttribute("aria-label", state.refs.themeToggle.title);
    }
}

function toggleTheme() {
    applyTheme(state.theme === "dark" ? "light" : "dark");
}

function applyLanguage(language) {
    state.language = language === "en" ? "en" : "zh";

    if (!state.root) {
        return;
    }

    state.refs.dialog?.setAttribute("aria-label", t("managerTitle"));
    for (const node of state.root.querySelectorAll("[data-i18n]")) {
        node.textContent = t(node.dataset.i18n);
    }
    for (const node of state.root.querySelectorAll("[data-i18n-placeholder]")) {
        node.placeholder = t(node.dataset.i18nPlaceholder);
    }
    for (const node of state.root.querySelectorAll("[data-i18n-title]")) {
        const text = t(node.dataset.i18nTitle);
        node.title = text;
        node.setAttribute("aria-label", text);
    }

    if (state.refs.languageToggle) {
        state.refs.languageToggle.textContent = t("languageToggle");
        state.refs.languageToggle.title = t("languageToggleTitle");
        state.refs.languageToggle.setAttribute("aria-label", t("languageToggleTitle"));
    }

    applyTheme(state.theme);
    renderFilters();
    renderList();
    updateReferencePreview();
    updateEditorHeader();
    updateBottomBar();
}

function toggleLanguage() {
    applyLanguage(state.language === "en" ? "zh" : "en");
    setStatus(t("languageSwitched"));
}

function folderPathParts(value) {
    const text = String(value || DEFAULT_FOLDER).trim() || DEFAULT_FOLDER;
    return text
        .split(/[\\/]+/)
        .map((part) => part.trim())
        .filter(Boolean);
}

function folderValue(value) {
    const parts = folderPathParts(value);
    return parts.length ? parts.join(FOLDER_SEPARATOR) : DEFAULT_FOLDER;
}

function folderValues() {
    return Array.from(new Set(state.prompts.map((entry) => folderValue(entry.folder)))).sort((a, b) =>
        a.localeCompare(b, "zh-Hans-CN"),
    );
}

function isFavoritePrompt(entry) {
    return entry?.favorite === true;
}

function isPrivatePrompt(entry) {
    return entry?.private === true;
}

function favoritePromptCount() {
    return state.prompts.filter((entry) => isFavoritePrompt(entry)).length;
}

function folderMatchesSelection(folder, selectedFolder) {
    const selected = selectedFolder || ALL_FOLDERS_VALUE;
    if (selected === ALL_FOLDERS_VALUE) {
        return true;
    }
    if (selected === FAVORITES_FOLDER_VALUE) {
        return false;
    }

    const current = folderValue(folder);
    return current === selected || current.startsWith(`${selected}${FOLDER_SEPARATOR}`);
}

function promptMatchesFolderSelection(entry, selectedFolder) {
    const selected = selectedFolder || ALL_FOLDERS_VALUE;
    if (selected === FAVORITES_FOLDER_VALUE) {
        return isFavoritePrompt(entry);
    }
    return folderMatchesSelection(entry?.folder, selected);
}

function preferredFolder() {
    return state.activeFolder && state.activeFolder !== ALL_FOLDERS_VALUE && state.activeFolder !== FAVORITES_FOLDER_VALUE
        ? state.activeFolder
        : DEFAULT_FOLDER;
}

function emptyPrompt(folder = preferredFolder()) {
    return {
        name: "",
        folder,
        positive: "",
        negative: "",
        tags: [],
        note: "",
        reference_image: "",
        reference_image_url: "",
        favorite: false,
        private: false,
    };
}

function activePrompt() {
    return state.prompts.find((entry) => entry.name === state.activeName) || null;
}

function truncateText(value, length = 120) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) {
        return "";
    }
    return text.length > length ? `${text.slice(0, length)}...` : text;
}

function promptTokenParts(value) {
    const source = String(value || "");
    const parts = [];
    const delimiterPattern = /[,，]+/g;
    let segmentStart = 0;
    let match;

    function pushPart(segmentEnd) {
        const raw = source.slice(segmentStart, segmentEnd);
        const leadingLength = raw.match(/^\s*/)?.[0].length || 0;
        const trailingLength = raw.match(/\s*$/)?.[0].length || 0;
        const tokenStart = segmentStart + leadingLength;
        const tokenEnd = segmentEnd - trailingLength;

        if (tokenEnd > tokenStart) {
            parts.push({
                text: source.slice(tokenStart, tokenEnd),
                segmentStart,
                segmentEnd,
            });
        }
    }

    while ((match = delimiterPattern.exec(source)) !== null) {
        pushPart(match.index);
        segmentStart = delimiterPattern.lastIndex;
    }
    pushPart(source.length);

    return parts;
}

function promptTokens(value) {
    return promptTokenParts(value).map((part) => part.text);
}

function removePromptToken(input, index) {
    if (!input) {
        return;
    }

    const source = String(input.value || "");
    const parts = promptTokenParts(source);
    const part = parts[index];
    if (!part) {
        return;
    }

    let removeStart = part.segmentStart;
    let removeEnd = part.segmentEnd;
    if (parts.length > 1 && index === 0) {
        removeEnd = parts[index + 1].segmentStart;
    } else if (parts.length > 1 && index > 0) {
        removeStart = parts[index - 1].segmentEnd;
    }

    input.value = `${source.slice(0, removeStart)}${source.slice(removeEnd)}`.replace(/^[,，\s]+|[,，\s]+$/g, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
}

function renderTokenPreview(container, input) {
    if (!container || !input) {
        return;
    }

    container.replaceChildren();
    for (const [index, token] of promptTokens(input.value).entries()) {
        const chip = el("span", "mpm-token-chip");
        const tokenText = el("span", "mpm-token-text", token);
        const removeButton = el("button", "mpm-token-remove", "×");
        removeButton.type = "button";
        removeButton.title = t("removePromptToken", { token });
        removeButton.setAttribute("aria-label", t("removePromptToken", { token }));
        removeButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            removePromptToken(input, index);
        });
        chip.append(tokenText, removeButton);
        container.appendChild(chip);
    }
}

function updatePromptTokenPreviews() {
    renderTokenPreview(state.refs.positiveTokens, state.refs.positive);
    renderTokenPreview(state.refs.negativeTokens, state.refs.negative);
}

function summarisePrompt(entry) {
    return {
        primary: truncateText(entry.positive || entry.note || "", 110) || t("summaryPositiveMissing"),
        secondary: truncateText(entry.negative || "", 100) || t("summaryNegativeMissing"),
    };
}

function sortPrompts(entries) {
    return [...entries].sort((left, right) => {
        const updated = String(right.updated_at || "").localeCompare(String(left.updated_at || ""));
        if (updated !== 0) {
            return updated;
        }
        return String(left.name || "").localeCompare(String(right.name || ""), "zh-Hans-CN");
    });
}

function resetPendingImage() {
    if (state.pendingImageUrl) {
        URL.revokeObjectURL(state.pendingImageUrl);
    }
    state.pendingImageFile = null;
    state.pendingImageUrl = "";
}

function currentPreviewUrl() {
    if (state.pendingImageUrl) {
        return state.pendingImageUrl;
    }
    return state.currentReferenceImageUrl || "";
}

function currentPreviewLabel() {
    if (state.pendingImageFile) {
        return t("previewPending", { name: state.pendingImageFile.name });
    }
    if (state.currentReferenceImage) {
        return t("previewSaved", { name: state.currentReferenceImage });
    }
    return t("noReferenceImage");
}

function updateReferencePreview() {
    const url = currentPreviewUrl();
    const hasImage = Boolean(url);
    const isPrivate = state.refs.private?.checked === true;
    state.refs.referenceBox.classList.toggle("has-image", hasImage);
    state.refs.referenceBox.classList.toggle("is-private", hasImage && isPrivate);
    state.refs.referenceImage.hidden = !hasImage;
    state.refs.referenceEmpty.hidden = hasImage;
    if (state.refs.referencePrivateEye) {
        state.refs.referencePrivateEye.hidden = !(hasImage && isPrivate);
    }
    state.refs.referenceMeta.textContent = currentPreviewLabel();
    if (hasImage) {
        state.refs.referenceImage.src = url;
        state.refs.referenceBox.title = t("viewLarge");
    } else {
        state.refs.referenceImage.removeAttribute("src");
        state.refs.referenceBox.removeAttribute("title");
    }
}

function writeForm(prompt) {
    const item = prompt || emptyPrompt();
    resetPendingImage();
    state.currentReferenceImage = item.reference_image || "";
    state.currentReferenceImageUrl = item.reference_image_url || "";

    state.refs.name.value = item.name || "";
    state.refs.folder.value = folderValue(item.folder || DEFAULT_FOLDER);
    state.refs.positive.value = item.positive || "";
    state.refs.negative.value = item.negative || "";
    state.refs.tags.value = Array.isArray(item.tags) ? item.tags.join(", ") : "";
    state.refs.note.value = item.note || "";
    state.refs.private.checked = isPrivatePrompt(item);
    state.refs.folderExisting.value = "";
    updatePromptTokenPreviews();
    updateReferencePreview();
}

function promptFromForm() {
    const prompt = activePrompt();
    return {
        name: state.refs.name.value.trim(),
        folder: folderValue(state.refs.folder.value),
        positive: state.refs.positive.value,
        negative: state.refs.negative.value,
        tags: state.refs.tags.value,
        note: state.refs.note.value,
        reference_image: state.currentReferenceImage,
        favorite: isFavoritePrompt(prompt),
        private: state.refs.private.checked === true,
        original_name: state.editorMode === "edit" ? state.activeName : "",
        overwrite: true,
    };
}

function validatePromptForm() {
    const requiredFields = [
        { ref: state.refs.name, label: t("promptName") },
        { ref: state.refs.folder, label: t("folder") },
        { ref: state.refs.positive, label: t("positivePrompt") },
        { ref: state.refs.negative, label: t("negativePrompt") },
    ];

    for (const field of requiredFields) {
        if (!field.ref.value.trim()) {
            setStatus(t("fieldRequired", { label: field.label }));
            field.ref.focus();
            return false;
        }
    }

    return true;
}

function promptMatches(entry, query) {
    if (!query) {
        return true;
    }
    const text = [
        entry.name,
        folderValue(entry.folder),
        Array.isArray(entry.tags) ? entry.tags.join(" ") : "",
        isPrivatePrompt(entry) ? t("privateSearchToken") : "",
        entry.note,
        entry.positive,
        entry.negative,
    ]
        .join("\n")
        .toLowerCase();
    return text.includes(query.toLowerCase());
}

function filteredPrompts() {
    const folder = state.activeFolder || ALL_FOLDERS_VALUE;
    const tag = state.refs.filterTag?.value || ALL_TAGS_VALUE;
    const query = state.refs.search?.value.trim() || "";

    return sortPrompts(
        state.prompts.filter((entry) => {
            if (!promptMatchesFolderSelection(entry, folder)) {
                return false;
            }
            if (tag !== ALL_TAGS_VALUE && !(Array.isArray(entry.tags) && entry.tags.includes(tag))) {
                return false;
            }
            return promptMatches(entry, query);
        }),
    );
}

function replaceSelectOptions(select, options, selectedValue) {
    select.replaceChildren();
    for (const option of options) {
        const node = document.createElement("option");
        node.value = option.value;
        node.textContent = option.label;
        if (option.value === selectedValue) {
            node.selected = true;
        }
        select.appendChild(node);
    }
}

function createFolderTreeNode(label, value) {
    return {
        label,
        value,
        count: 0,
        children: new Map(),
    };
}

function buildFolderTree() {
    const root = createFolderTreeNode(t("allFolders"), ALL_FOLDERS_VALUE);

    for (const entry of state.prompts) {
        const parts = folderPathParts(entry.folder);
        let node = root;
        const path = [];
        node.count += 1;

        for (const part of parts) {
            path.push(part);
            const value = path.join(FOLDER_SEPARATOR);
            if (!node.children.has(part)) {
                node.children.set(part, createFolderTreeNode(part, value));
            }
            node = node.children.get(part);
            node.count += 1;
        }
    }

    return root;
}

function sortedFolderChildren(node) {
    return Array.from(node.children.values()).sort((left, right) => left.label.localeCompare(right.label, "zh-Hans-CN"));
}

function appendFolderTreeNode(container, node, depth) {
    appendFolderTreeButton(container, node, depth);

    for (const child of sortedFolderChildren(node)) {
        appendFolderTreeNode(container, child, depth + 1);
    }
}

function appendFolderTreeButton(container, node, depth) {
    const button = el("button", "mpm-folder-tree-item");
    button.type = "button";
    button.style.paddingLeft = `${10 + depth * 16}px`;
    button.classList.toggle("is-active", node.value === state.activeFolder);
    button.addEventListener("click", () => selectFolder(node.value));

    button.append(
        el("span", "mpm-folder-tree-label", node.label),
        el("span", "mpm-folder-tree-count", String(node.count)),
    );
    container.appendChild(button);
}

function renderFolderTree() {
    const tree = state.refs.folderTree;
    if (!tree) {
        return;
    }

    if (
        state.activeFolder !== ALL_FOLDERS_VALUE &&
        state.activeFolder !== FAVORITES_FOLDER_VALUE &&
        !state.prompts.some((entry) => folderMatchesSelection(entry.folder, state.activeFolder))
    ) {
        state.activeFolder = ALL_FOLDERS_VALUE;
    }

    tree.replaceChildren();
    const root = buildFolderTree();
    appendFolderTreeButton(tree, root, 0);
    appendFolderTreeButton(
        tree,
        {
            label: t("favorites"),
            value: FAVORITES_FOLDER_VALUE,
            count: favoritePromptCount(),
        },
        1,
    );
    for (const child of sortedFolderChildren(root)) {
        appendFolderTreeNode(tree, child, 1);
    }
}

function selectFolder(folder) {
    state.activeFolder = folder || ALL_FOLDERS_VALUE;
    renderFilters();
    renderList();
}

function renderFilters() {
    const currentTag = state.refs.filterTag.value || ALL_TAGS_VALUE;
    renderFolderTree();

    const tags = new Set();
    for (const entry of state.prompts) {
        if (!promptMatchesFolderSelection(entry, state.activeFolder)) {
            continue;
        }
        for (const tag of entry.tags || []) {
            tags.add(tag);
        }
    }
    const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));
    const tagOptions = [{ value: ALL_TAGS_VALUE, label: t("allTags") }].concat(
        sortedTags.map((tag) => ({ value: tag, label: tag })),
    );
    const nextTag = sortedTags.includes(currentTag) ? currentTag : ALL_TAGS_VALUE;
    replaceSelectOptions(state.refs.filterTag, tagOptions, nextTag);
}

function renderFolderOptions() {
    const folders = folderValues();
    const options = [{ value: "", label: t("chooseExistingFolder") }].concat(
        folders.map((folder) => ({ value: folder, label: folder })),
    );
    const current = options.some((option) => option.value === state.refs.folderExisting.value)
        ? state.refs.folderExisting.value
        : "";
    replaceSelectOptions(state.refs.folderExisting, options, current);
}

function currentViewNames() {
    return filteredPrompts().map((entry) => entry.name);
}

function pruneSelectedNames() {
    const existing = new Set(state.prompts.map((entry) => entry.name));
    for (const name of Array.from(state.selectedNames)) {
        if (!existing.has(name)) {
            state.selectedNames.delete(name);
        }
    }
}

function allCurrentViewSelected() {
    const names = currentViewNames();
    return names.length > 0 && names.every((name) => state.selectedNames.has(name));
}

function updateBackToTopButton() {
    if (!state.refs.backToTop || !state.refs.list) {
        return;
    }
    state.refs.backToTop.hidden = state.view !== "library" || state.refs.list.scrollTop <= 40;
}

function togglePromptSelection(name, selected) {
    if (selected) {
        state.selectedNames.add(name);
    } else {
        state.selectedNames.delete(name);
    }
    renderList();
    updateBottomBar();
}

function toggleCurrentSelection() {
    const names = currentViewNames();
    if (!names.length && !state.selectedNames.size) {
        setStatus(t("noSelectablePrompts"));
        return;
    }

    if (allCurrentViewSelected() || (!names.length && state.selectedNames.size)) {
        state.selectedNames.clear();
        renderList();
        updateBottomBar();
        setStatus(t("selectionCleared"));
        return;
    }

    for (const name of names) {
        state.selectedNames.add(name);
    }
    renderList();
    updateBottomBar();
    setStatus(t("selectedCurrent", { count: names.length }));
}

function updateEditorHeader() {
    state.refs.editorTitle.textContent = state.editorMode === "edit" ? t("editorTitleEdit") : t("editorTitleCreate");
}

function updateBottomBar() {
    const isLibrary = state.view === "library";
    const hasActivePrompt = Boolean(state.refs.name.value.trim());
    const selectedCount = state.selectedNames.size;
    const shownCount = currentViewNames().length;
    const shouldClearSelection = selectedCount > 0 && (allCurrentViewSelected() || shownCount === 0);

    state.refs.tabLibrary.classList.toggle("is-active", isLibrary);

    state.refs.actionSelectAll.hidden = !isLibrary;
    state.refs.actionBatchMove.hidden = !isLibrary;
    state.refs.actionBatchDelete.hidden = !isLibrary;
    state.refs.actionNew.hidden = !isLibrary;
    state.refs.actionImport.hidden = !isLibrary;
    state.refs.actionExport.hidden = !isLibrary;
    state.refs.actionSave.hidden = isLibrary;
    state.refs.actionCancel.hidden = isLibrary;
    state.refs.actionInsert.hidden = isLibrary;
    state.refs.actionDelete.hidden = isLibrary;

    state.refs.actionSave.disabled = !hasActivePrompt;
    state.refs.actionInsert.disabled = !hasActivePrompt;
    state.refs.actionDelete.disabled = !hasActivePrompt || state.editorMode !== "edit";
    state.refs.actionSelectAll.disabled = !shownCount && !selectedCount;
    state.refs.actionSelectAll.textContent = shouldClearSelection ? t("actionClearSelection") : t("actionSelectAll");
    state.refs.actionBatchMove.disabled = selectedCount === 0;
    state.refs.actionBatchMove.textContent = selectedCount ? t("actionBatchMoveCount", { count: selectedCount }) : t("actionBatchMove");
    state.refs.actionBatchDelete.disabled = selectedCount === 0;
    state.refs.actionBatchDelete.textContent = selectedCount ? t("actionBatchDeleteCount", { count: selectedCount }) : t("actionBatchDelete");
    updateBackToTopButton();
}

function setView(view) {
    state.view = view;
    state.refs.viewLibrary.hidden = view !== "library";
    state.refs.viewEditor.hidden = view !== "editor";
    updateEditorHeader();
    updateBottomBar();
}

function selectPrompt(name) {
    const entry = state.prompts.find((item) => item.name === name) || emptyPrompt();
    state.activeName = entry.name || "";
    state.editorMode = entry.name ? "edit" : "create";
    writeForm(entry);
    renderList();
    updateBottomBar();
}

function openCreatePrompt() {
    state.activeName = "";
    state.editorMode = "create";
    writeForm(emptyPrompt());
    renderList();
    setView("editor");
    state.refs.name.focus();
    setStatus(t("editingNew"));
}

function openEditPrompt(name) {
    selectPrompt(name);
    state.editorMode = "edit";
    setView("editor");
    state.refs.name.focus();
    setStatus(t("editingPrompt", { name }));
}

function rowActionHandler(handler) {
    return (event) => {
        event.stopPropagation();
        Promise.resolve(handler()).catch((error) => setStatus(error.message));
    };
}

async function copyPresetText(entry, fieldName) {
    const value = String(entry[fieldName] || "");
    if (!value) {
        setStatus(fieldName === "positive" ? t("positiveEmpty") : t("negativeEmpty"));
        return;
    }

    await navigator.clipboard.writeText(value);
    setStatus(fieldName === "positive" ? t("positiveCopied") : t("negativeCopied"));
}

async function togglePromptFavorite(entry) {
    const nextFavorite = !isFavoritePrompt(entry);
    const result = await requestJson("/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: entry.name,
            favorite: nextFavorite,
        }),
    });

    applyServerData(result.data || { prompts: [] }, state.activeName || entry.name, false);
    setStatus(localStatus(result.message, nextFavorite ? "favoriteAdded" : "favoriteRemoved"));
}

function openImageViewer(url, title) {
    if (!url) {
        return;
    }
    const imageTitle = title || t("referenceImage");
    state.refs.imageViewerTitle.textContent = imageTitle;
    state.refs.imageViewerImage.alt = imageTitle;
    state.refs.imageViewerImage.src = url;
    state.refs.imageViewer.hidden = false;
}

function closeImageViewer() {
    state.refs.imageViewer.hidden = true;
    state.refs.imageViewerImage.removeAttribute("src");
}

function resetActionDialog() {
    if (!state.refs.actionDialog) {
        return;
    }

    state.refs.actionDialog.hidden = true;
    state.refs.actionDialogTitle.textContent = t("confirmTitle");
    state.refs.actionDialogMessage.textContent = "";
    state.refs.actionDialogField.hidden = true;
    state.refs.actionDialogInputLabel.textContent = t("inputLabel");
    state.refs.actionDialogInput.value = "";
    state.refs.actionDialogInput.placeholder = "";
    state.refs.actionDialogInput.required = false;
    state.refs.actionDialogInput.setCustomValidity("");
    state.refs.actionDialogFolder.hidden = true;
    state.refs.actionDialogFolderModeExisting.checked = false;
    state.refs.actionDialogFolderModeExisting.disabled = false;
    state.refs.actionDialogFolderModeNew.checked = false;
    state.refs.actionDialogFolderSelect.replaceChildren();
    state.refs.actionDialogFolderSelect.disabled = false;
    state.refs.actionDialogFolderSelect.required = false;
    state.refs.actionDialogFolderSelect.setCustomValidity("");
    state.refs.actionDialogFolderInput.value = "";
    state.refs.actionDialogFolderInput.required = false;
    state.refs.actionDialogFolderInput.setCustomValidity("");
    state.refs.actionDialogFolderExistingField.hidden = false;
    state.refs.actionDialogFolderNewField.hidden = true;
    state.refs.actionDialogConfirm.textContent = t("confirm");
    state.refs.actionDialogConfirm.classList.add("is-primary");
    state.refs.actionDialogConfirm.classList.remove("is-danger");
}

function updateActionDialogFolderMode(focus = false) {
    if (!state.refs.actionDialogFolder || state.refs.actionDialogFolder.hidden) {
        return;
    }

    const useNewFolder =
        state.refs.actionDialogFolderModeNew.checked === true ||
        state.refs.actionDialogFolderModeExisting.disabled === true;

    state.refs.actionDialogFolderExistingField.hidden = useNewFolder;
    state.refs.actionDialogFolderNewField.hidden = !useNewFolder;
    state.refs.actionDialogFolderSelect.required = !useNewFolder;
    state.refs.actionDialogFolderInput.required = useNewFolder;
    state.refs.actionDialogFolderSelect.setCustomValidity("");
    state.refs.actionDialogFolderInput.setCustomValidity("");

    if (focus) {
        if (useNewFolder) {
            state.refs.actionDialogFolderInput.focus();
            state.refs.actionDialogFolderInput.select();
        } else {
            state.refs.actionDialogFolderSelect.focus();
        }
    }
}

function closeActionDialog(result) {
    const resolver = state.actionDialogResolve;
    state.actionDialogResolve = null;
    resetActionDialog();
    if (resolver) {
        resolver(result);
    }
}

function cancelActionDialog() {
    closeActionDialog({ confirmed: false, value: "" });
}

function confirmActionDialog() {
    if (!state.refs.actionDialog || state.refs.actionDialog.hidden) {
        return;
    }

    if (!state.refs.actionDialogFolder.hidden) {
        const useNewFolder = state.refs.actionDialogFolderModeNew.checked === true;
        if (useNewFolder) {
            const value = state.refs.actionDialogFolderInput.value.trim();
            if (!value) {
                state.refs.actionDialogFolderInput.setCustomValidity(t("folderRequired"));
                state.refs.actionDialogFolderInput.reportValidity();
                state.refs.actionDialogFolderInput.focus();
                return;
            }
            closeActionDialog({ confirmed: true, value });
            return;
        }

        const value = state.refs.actionDialogFolderSelect.value.trim();
        if (!value) {
            state.refs.actionDialogFolderSelect.setCustomValidity(t("chooseFolderOrNew"));
            state.refs.actionDialogFolderSelect.reportValidity();
            state.refs.actionDialogFolderSelect.focus();
            return;
        }
        closeActionDialog({ confirmed: true, value });
        return;
    }

    const requiresInput = state.refs.actionDialogInput.required === true;
    if (requiresInput) {
        const value = state.refs.actionDialogInput.value.trim();
        if (!value) {
            state.refs.actionDialogInput.setCustomValidity(t("folderRequired"));
            state.refs.actionDialogInput.reportValidity();
            state.refs.actionDialogInput.focus();
            return;
        }
    }

    closeActionDialog({
        confirmed: true,
        value: state.refs.actionDialogInput.value,
    });
}

function showActionDialog(options = {}) {
    if (!state.refs.actionDialog) {
        return Promise.resolve({ confirmed: false, value: "" });
    }

    if (state.actionDialogResolve) {
        closeActionDialog({ confirmed: false, value: "" });
    }

    const {
        title = t("confirmTitle"),
        message = "",
        confirmLabel = t("confirm"),
        cancelLabel = t("cancel"),
        danger = false,
        inputLabel = t("inputLabel"),
        inputPlaceholder = "",
        inputValue = "",
        requireInput = false,
        folderPicker = false,
        folderOptions = [],
    } = options;

    state.refs.actionDialogTitle.textContent = title;
    state.refs.actionDialogMessage.textContent = message;
    state.refs.actionDialogField.hidden = !requireInput || folderPicker;
    state.refs.actionDialogInputLabel.textContent = inputLabel;
    state.refs.actionDialogInput.value = inputValue;
    state.refs.actionDialogInput.placeholder = inputPlaceholder;
    state.refs.actionDialogInput.required = requireInput && !folderPicker;
    state.refs.actionDialogInput.setCustomValidity("");
    state.refs.actionDialogFolder.hidden = !folderPicker;
    if (folderPicker) {
        const folders = Array.from(new Set(folderOptions.map((item) => folderValue(item)).filter(Boolean))).sort((left, right) =>
            left.localeCompare(right, "zh-Hans-CN"),
        );
        const selectedFolder = folders.includes(inputValue) ? inputValue : folders[0] || "";
        replaceSelectOptions(
            state.refs.actionDialogFolderSelect,
            folders.map((folder) => ({ value: folder, label: folder })),
            selectedFolder,
        );
        const hasExistingFolders = folders.length > 0;
        state.refs.actionDialogFolderModeExisting.disabled = !hasExistingFolders;
        state.refs.actionDialogFolderModeExisting.checked = hasExistingFolders;
        state.refs.actionDialogFolderModeNew.checked = !hasExistingFolders;
        state.refs.actionDialogFolderSelect.disabled = !hasExistingFolders;
        state.refs.actionDialogFolderInput.value = hasExistingFolders ? "" : inputValue;
        state.refs.actionDialogFolderInput.placeholder = inputPlaceholder;
        updateActionDialogFolderMode(false);
    }
    state.refs.actionDialogConfirm.textContent = confirmLabel;
    state.refs.actionDialogCancel.textContent = cancelLabel;
    state.refs.actionDialogConfirm.classList.toggle("is-danger", danger);
    state.refs.actionDialogConfirm.classList.toggle("is-primary", !danger);
    state.refs.actionDialog.hidden = false;

    return new Promise((resolve) => {
        state.actionDialogResolve = resolve;
        requestAnimationFrame(() => {
            if (folderPicker) {
                updateActionDialogFolderMode(true);
            } else if (requireInput) {
                state.refs.actionDialogInput.focus();
                state.refs.actionDialogInput.select();
            } else {
                state.refs.actionDialogConfirm.focus();
            }
        });
    });
}

function renderList() {
    const list = state.refs.list;
    list.replaceChildren();

    const shown = filteredPrompts();
    state.refs.toolbarNote.textContent = t("countText", { count: shown.length });

    if (!shown.length) {
        const empty = el("div", "mpm-empty-state", t("noPromptsFound"));
        list.appendChild(empty);
        updateBottomBar();
        updateBackToTopButton();
        return;
    }

    shown.forEach((entry, index) => {
        const row = el("div", "mpm-row");
        if (entry.name === state.activeName) {
            row.classList.add("is-active");
        }
        if (state.selectedNames.has(entry.name)) {
            row.classList.add("is-selected");
        }
        row.addEventListener("click", () => selectPrompt(entry.name));

        const nameCell = el("div", "mpm-cell mpm-name");
        const nameMain = el("div", "mpm-name-main");
        const selection = document.createElement("input");
        selection.type = "checkbox";
        selection.className = "mpm-row-check";
        selection.checked = state.selectedNames.has(entry.name);
        selection.setAttribute("aria-label", t("selectAria", { name: entry.name }));
        selection.addEventListener("click", (event) => event.stopPropagation());
        selection.addEventListener("change", (event) => togglePromptSelection(entry.name, event.target.checked));
        nameMain.append(
            selection,
            el("div", "mpm-name-title", entry.name),
        );
        nameCell.append(
            nameMain,
            el("div", "mpm-name-meta", t("rowIndex", { index: index + 1 })),
        );

        const folderCell = el("div", "mpm-cell");
        folderCell.appendChild(el("div", "mpm-badge", folderValue(entry.folder)));

        const tagCell = el("div", "mpm-cell mpm-badges");
        if (Array.isArray(entry.tags) && entry.tags.length) {
            entry.tags.forEach((tag) => {
                tagCell.appendChild(el("span", "mpm-badge", tag));
            });
        } else {
            tagCell.appendChild(el("span", "mpm-badge", t("noTags")));
        }

        const summary = summarisePrompt(entry);
        const summaryCell = el("div", "mpm-cell mpm-summary");
        summaryCell.append(
            el("div", "mpm-summary-primary", summary.primary),
            el("div", "mpm-summary-secondary", summary.secondary),
        );

        const previewCell = el("div", "mpm-cell");
        const preview = el("div", "mpm-preview");
        if (entry.reference_image_url) {
            preview.classList.add("has-image");
            preview.classList.toggle("is-private", isPrivatePrompt(entry));
            preview.title = t("viewLarge");
            const image = document.createElement("img");
            image.src = entry.reference_image_url;
            image.alt = entry.name;
            image.addEventListener("error", () => {
                preview.replaceChildren(el("div", "mpm-preview-empty", t("noImage")));
            });
            preview.addEventListener("click", rowActionHandler(() => openImageViewer(entry.reference_image_url, entry.name)));
            preview.appendChild(image);
            if (isPrivatePrompt(entry)) {
                preview.appendChild(el("span", "mpm-private-eye"));
            }
        } else {
            preview.appendChild(el("div", "mpm-preview-empty", t("noImage")));
        }
        previewCell.appendChild(preview);

        const actionsCell = el("div", "mpm-cell mpm-row-actions");
        const favoriteButton = el("button", "mpm-button mpm-favorite-button", isFavoritePrompt(entry) ? "★" : "☆");
        favoriteButton.type = "button";
        favoriteButton.classList.toggle("is-favorite", isFavoritePrompt(entry));
        favoriteButton.title = isFavoritePrompt(entry) ? t("unfavorite") : t("favorite");
        favoriteButton.setAttribute("aria-label", `${favoriteButton.title} ${entry.name}`);
        favoriteButton.addEventListener("click", rowActionHandler(() => togglePromptFavorite(entry)));

        const editButton = el("button", "mpm-button", t("edit"));
        editButton.type = "button";
        editButton.addEventListener("click", rowActionHandler(() => openEditPrompt(entry.name)));

        const insertButton = el("button", "mpm-button", t("actionInsert"));
        insertButton.type = "button";
        insertButton.addEventListener("click", rowActionHandler(() => {
            selectPrompt(entry.name);
            writePresetToNode();
        }));

        const copyPositiveButton = el("button", "mpm-button", t("copyPositive"));
        copyPositiveButton.type = "button";
        copyPositiveButton.addEventListener("click", rowActionHandler(() => copyPresetText(entry, "positive")));

        const copyNegativeButton = el("button", "mpm-button", t("copyNegative"));
        copyNegativeButton.type = "button";
        copyNegativeButton.addEventListener("click", rowActionHandler(() => copyPresetText(entry, "negative")));

        const deleteButton = el("button", "mpm-button is-danger", t("actionDelete"));
        deleteButton.type = "button";
        deleteButton.addEventListener("click", rowActionHandler(() => {
            selectPrompt(entry.name);
            deletePrompt().catch((error) => setStatus(error.message));
        }));

        actionsCell.append(favoriteButton, editButton, insertButton, copyPositiveButton, copyNegativeButton, deleteButton);
        row.append(nameCell, folderCell, tagCell, summaryCell, previewCell, actionsCell);
        list.appendChild(row);
    });
    updateBottomBar();
    updateBackToTopButton();
}

function refreshNodePresets(node) {
    if (!node || !Array.isArray(node.widgets)) {
        return;
    }

    const names = state.prompts.map((entry) => entry.name);
    const values = names.length ? names : [""];
    const widget = node.widgets.find((item) => item.name === "preset");
    if (!widget) {
        return;
    }

    widget.options = widget.options || {};
    widget.options.values = values;

    if (names.length && !names.includes(widget.value)) {
        widget.value = names[0];
    } else if (!names.length) {
        widget.value = "";
    }
}

function refreshGraphPresets() {
    const nodes = app.graph && Array.isArray(app.graph._nodes) ? app.graph._nodes : [];
    for (const node of nodes) {
        if (node && node.comfyClass === "MimosaPromptLibrary") {
            refreshNodePresets(node);
        }
    }
    app.graph?.setDirtyCanvas?.(true, true);
}

function applyServerData(data, preferredName = "", selectFromNode = true) {
    state.prompts = Array.isArray(data.prompts) ? data.prompts : [];
    pruneSelectedNames();
    renderFilters();
    renderFolderOptions();
    refreshGraphPresets();

    const widget = state.node?.widgets?.find((item) => item.name === "preset");
    const nodeValue = widget ? String(widget.value || "") : "";
    const names = state.prompts.map((entry) => entry.name);
    const nextName =
        preferredName && names.includes(preferredName)
            ? preferredName
            : selectFromNode && nodeValue && names.includes(nodeValue)
                ? nodeValue
                : state.activeName && names.includes(state.activeName)
                    ? state.activeName
                    : names[0] || "";

    selectPrompt(nextName);
    renderList();
    setStatus(t("loadedCount", { count: state.prompts.length }));
}

async function loadPrompts(selectFromNode = true) {
    const data = await requestJson("/prompts");
    applyServerData(data, "", selectFromNode);
}

async function uploadPendingReferenceImage() {
    if (!state.pendingImageFile) {
        return;
    }

    const formData = new FormData();
    formData.append("file", state.pendingImageFile);
    const result = await requestJson("/reference-image", {
        method: "POST",
        body: formData,
    });

    resetPendingImage();
    state.currentReferenceImage = result.reference_image || "";
    state.currentReferenceImageUrl = result.reference_image_url || "";
    updateReferencePreview();
    setStatus(localStatus(result.message, "imageUploaded"));
}

async function savePrompt() {
    if (!validatePromptForm()) {
        return;
    }

    await uploadPendingReferenceImage();
    const payload = promptFromForm();
    const result = await requestJson("/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    state.activeName = result.prompt?.name || payload.name;
    state.editorMode = "edit";
    applyServerData(result.data || { prompts: [] }, state.activeName, false);
    state.activeFolder = folderValue(payload.folder || DEFAULT_FOLDER);
    state.refs.filterTag.value = ALL_TAGS_VALUE;
    renderFilters();
    renderList();
    updateBottomBar();
    setStatus(localStatus(result.message, "saved"));
}

async function deletePrompt() {
    const prompt = activePrompt();
    const name =
        (state.editorMode === "edit" && state.activeName) ||
        state.refs.name.value.trim() ||
        prompt?.name ||
        "";
    if (!name) {
        setStatus(t("selectOnePrompt"));
        return;
    }
    const confirmation = await showActionDialog({
        title: t("deletePromptTitle"),
        message: t("deletePromptMessage", { name }),
        confirmLabel: t("actionDelete"),
        danger: true,
    });
    if (!confirmation.confirmed) {
        return;
    }

    const result = await requestJson("/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });

    state.selectedNames.delete(name);
    state.activeName = "";
    state.editorMode = "create";
    applyServerData(result.data || { prompts: [] }, "", false);
    if (!state.prompts.length) {
        writeForm(emptyPrompt());
        renderList();
    }
    setView("library");
    setStatus(localStatus(result.message, "deletedPrompt"));
}

function defaultMoveFolder() {
    if (
        state.activeFolder &&
        state.activeFolder !== ALL_FOLDERS_VALUE &&
        state.activeFolder !== FAVORITES_FOLDER_VALUE
    ) {
        return state.activeFolder;
    }

    return folderValues()[0] || DEFAULT_FOLDER;
}

async function moveSelectedPrompts() {
    const names = Array.from(state.selectedNames);
    if (!names.length) {
        setStatus(t("selectMovePrompts"));
        return;
    }

    const moveDialog = await showActionDialog({
        title: t("batchMoveTitle"),
        message: t("batchMoveMessage", { count: names.length }),
        confirmLabel: t("move"),
        inputPlaceholder: t("folderPlaceholder"),
        inputValue: defaultMoveFolder(),
        folderPicker: true,
        folderOptions: folderValues(),
    });
    if (!moveDialog.confirmed) {
        return;
    }

    const folder = String(moveDialog.value || "").trim();
    if (!folder) {
        setStatus(t("folderRequired"));
        return;
    }

    const targetFolder = folderValue(folder);
    const result = await requestJson("/move-many", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names, folder: targetFolder }),
    });

    state.selectedNames.clear();
    state.activeName = "";
    state.editorMode = "create";
    state.activeFolder = targetFolder;
    if (state.refs.filterTag) {
        state.refs.filterTag.value = ALL_TAGS_VALUE;
    }
    applyServerData(result.data || { prompts: [] }, names[0] || "", false);
    setView("library");
    setStatus(localStatus(result.message, "movedCount", { count: names.length }));
}

async function deleteSelectedPrompts() {
    const names = Array.from(state.selectedNames);
    if (!names.length) {
        setStatus(t("selectDeletePrompts"));
        return;
    }
    const confirmation = await showActionDialog({
        title: t("batchDeleteTitle"),
        message: t("batchDeleteMessage", { count: names.length }),
        confirmLabel: t("actionDelete"),
        danger: true,
    });
    if (!confirmation.confirmed) {
        return;
    }

    let result;
    try {
        result = await requestJson("/delete-many", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ names }),
        });
    } catch (error) {
        if (error.message !== "HTTP 404") {
            throw error;
        }
        for (const name of names) {
            result = await requestJson("/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
        }
    }

    state.selectedNames.clear();
    state.activeName = "";
    state.editorMode = "create";
    applyServerData(result?.data || { prompts: [] }, "", false);
    if (!state.prompts.length) {
        writeForm(emptyPrompt());
        renderList();
    }
    setView("library");
    setStatus(localStatus(result?.message, "deletedCount", { count: names.length }));
}

function selectedCanvasNode() {
    const selected = app.canvas?.selected_nodes;
    if (selected && typeof selected === "object") {
        const nodes = Object.values(selected);
        if (nodes.length) {
            return nodes[0];
        }
    }
    return state.node;
}

function writePresetToNode() {
    const name = state.refs.name.value.trim();
    if (!name) {
        setStatus(t("nameRequired"));
        return;
    }

    const node = selectedCanvasNode();
    if (!node || node.comfyClass !== "MimosaPromptLibrary") {
        setStatus(t("selectNode"));
        return;
    }

    refreshNodePresets(node);
    const widget = node.widgets.find((item) => item.name === "preset");
    if (!widget) {
        setStatus(t("widgetMissing"));
        return;
    }

    widget.value = name;
    widget.callback?.(name, node, widget);
    app.graph?.setDirtyCanvas?.(true, true);
    setStatus(t("wroteNode", { name }));
}

function exportPrompts() {
    const data = {
        version: 3,
        prompts: state.prompts.map((entry) => ({
            name: entry.name,
            folder: entry.folder,
            positive: entry.positive,
            negative: entry.negative,
            tags: entry.tags,
            note: entry.note,
            reference_image: entry.reference_image || "",
            favorite: isFavoritePrompt(entry),
            private: isPrivatePrompt(entry),
            created_at: entry.created_at,
            updated_at: entry.updated_at,
        })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mimosa-prompts.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus(t("exportStarted"));
}

async function importPrompts(file) {
    if (!file) {
        return;
    }
    const text = await file.text();
    const payload = JSON.parse(text);
    payload.mode = "merge";
    const result = await requestJson("/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    state.activeName = "";
    applyServerData(result.data || { prompts: [] }, "", false);
    setView("library");
    setStatus(localStatus(result.message, "importDone"));
}

function handleReferenceImageSelection(file) {
    if (!file) {
        return;
    }
    resetPendingImage();
    state.pendingImageFile = file;
    state.pendingImageUrl = URL.createObjectURL(file);
    updateReferencePreview();
    setStatus(t("imageSelected", { name: file.name }));
}

function clearReferenceImage() {
    resetPendingImage();
    state.currentReferenceImage = "";
    state.currentReferenceImageUrl = "";
    updateReferencePreview();
    setStatus(t("imageCleared"));
}

function createManager() {
    injectStyle();

    const overlay = el("div", "mpm-overlay");
    overlay.innerHTML = `
<div class="mpm-dialog" role="dialog" aria-modal="true" aria-label="Mimosa 提示词管理器" data-mpm="dialog">
    <div class="mpm-topbar">
        <div class="mpm-title" data-i18n="managerTitle">Mimosa 提示词管理器</div>
        <div class="mpm-topbar-actions">
            <button class="mpm-close mpm-language-toggle" type="button" data-mpm="language-toggle">EN</button>
            <button class="mpm-close mpm-theme-toggle" type="button" data-mpm="theme-toggle">深色</button>
            <button class="mpm-close" type="button" data-mpm="close" data-i18n="close">关闭</button>
        </div>
    </div>
    <div class="mpm-shell">
        <section class="mpm-view mpm-library" data-mpm="view-library">
            <div class="mpm-toolbar">
                <select class="mpm-select" data-mpm="filter-tag"></select>
                <input class="mpm-input" data-mpm="search" data-i18n-placeholder="searchPlaceholder" placeholder="搜索名称、标签、备注或提示词" />
                <div class="mpm-toolbar-note" data-mpm="toolbar-note">共 0 条</div>
            </div>
            <div class="mpm-library-body">
                <aside class="mpm-panel mpm-folder-panel">
                    <div class="mpm-folder-head" data-i18n="folderHeading">文件夹</div>
                    <div class="mpm-folder-tree" data-mpm="folder-tree"></div>
                </aside>
                <div class="mpm-panel mpm-table-wrap">
                    <div class="mpm-table-head">
                        <div data-i18n="tableName">名称</div>
                        <div data-i18n="tableFolder">文件夹</div>
                        <div data-i18n="tableTags">标签</div>
                        <div data-i18n="tableContent">提示词内容</div>
                        <div data-i18n="tablePreview">预览</div>
                        <div data-i18n="tableActions">操作</div>
                    </div>
                    <div class="mpm-table-body" data-mpm="list"></div>
                </div>
            </div>
        </section>
        <section class="mpm-view mpm-editor" data-mpm="view-editor" hidden>
            <div class="mpm-editor-head">
                <button class="mpm-back" type="button" data-mpm="back" data-i18n="backLibrary">返回词库</button>
                <div class="mpm-editor-title" data-mpm="editor-title">新建提示词</div>
            </div>
            <div class="mpm-panel mpm-editor-card">
                <div class="mpm-form">
                    <label class="mpm-field">
                        <span class="mpm-label is-required" data-i18n="promptName">提示词名称</span>
                        <input class="mpm-input" data-mpm="name" data-i18n-placeholder="promptNamePlaceholder" placeholder="请输入提示词名称" required />
                    </label>
                    <div class="mpm-field-grid">
                        <label class="mpm-field">
                            <span class="mpm-label is-required" data-i18n="folder">文件夹</span>
                            <input class="mpm-input" data-mpm="folder" data-i18n-placeholder="folderPlaceholder" placeholder="例如：人物/Miku" required />
                        </label>
                        <label class="mpm-field">
                            <span class="mpm-label" data-i18n="chooseExistingFolder">选择已有文件夹</span>
                            <select class="mpm-select" data-mpm="folder-existing"></select>
                        </label>
                    </div>
                    <label class="mpm-field">
                        <span class="mpm-label" data-i18n="tags">标签</span>
                        <input class="mpm-input" data-mpm="tags" data-i18n-placeholder="tagsPlaceholder" placeholder="标签1, 标签2" />
                    </label>
                    <label class="mpm-switch">
                        <input type="checkbox" data-mpm="private" />
                        <span class="mpm-switch-track" aria-hidden="true"></span>
                        <span class="mpm-switch-text" data-i18n="private">私密</span>
                    </label>
                    <label class="mpm-field">
                        <span class="mpm-label is-required" data-i18n="positivePrompt">正向提示词</span>
                        <textarea class="mpm-textarea is-large" data-mpm="positive" data-i18n-placeholder="positivePlaceholder" placeholder="请输入正向提示词" required></textarea>
                        <div class="mpm-token-preview" data-mpm="positive-tokens"></div>
                    </label>
                    <label class="mpm-field">
                        <span class="mpm-label is-required" data-i18n="negativePrompt">反向提示词</span>
                        <textarea class="mpm-textarea is-large" data-mpm="negative" data-i18n-placeholder="negativePlaceholder" placeholder="请输入反向提示词" required></textarea>
                        <div class="mpm-token-preview" data-mpm="negative-tokens"></div>
                    </label>
                    <div class="mpm-reference">
                        <span class="mpm-label" data-i18n="referenceImage">参考图片</span>
                        <div class="mpm-reference-box" data-mpm="reference-box">
                            <img class="mpm-reference-image" data-mpm="reference-image" hidden />
                            <span class="mpm-private-eye" data-mpm="reference-private-eye" hidden></span>
                            <div class="mpm-reference-empty" data-mpm="reference-empty" data-i18n="noReferenceImage">未上传参考图。</div>
                        </div>
                        <div class="mpm-reference-meta" data-mpm="reference-meta">未上传参考图。</div>
                        <div class="mpm-inline-actions">
                            <button class="mpm-button" type="button" data-mpm="reference-upload" data-i18n="chooseImage">选择图片</button>
                            <button class="mpm-button" type="button" data-mpm="reference-clear" data-i18n="clearImage">清空图片</button>
                            <input class="mpm-file" type="file" accept="image/*" data-mpm="reference-file" />
                        </div>
                    </div>
                    <label class="mpm-field">
                        <span class="mpm-label" data-i18n="note">备注</span>
                        <textarea class="mpm-textarea" data-mpm="note" data-i18n-placeholder="notePlaceholder" placeholder="可记录用途、模型、风格说明"></textarea>
                    </label>
                </div>
            </div>
        </section>
    </div>
    <div class="mpm-bottombar">
        <div class="mpm-tabs">
            <button class="mpm-button is-tab" type="button" data-mpm="tab-library" data-i18n="libraryTab">词库</button>
        </div>
        <div class="mpm-status" data-mpm="status" data-i18n="ready">就绪。</div>
        <div class="mpm-actions">
            <button class="mpm-button" type="button" data-mpm="action-select-all" data-i18n="actionSelectAll">全选当前界面</button>
            <button class="mpm-button" type="button" data-mpm="action-batch-move" data-i18n="actionBatchMove">批量移动</button>
            <button class="mpm-button is-danger" type="button" data-mpm="action-batch-delete" data-i18n="actionBatchDelete">批量删除</button>
            <button class="mpm-button is-primary" type="button" data-mpm="action-new" data-i18n="actionNew">新建</button>
            <button class="mpm-button" type="button" data-mpm="action-import" data-i18n="actionImport">导入</button>
            <button class="mpm-button" type="button" data-mpm="action-export" data-i18n="actionExport">导出</button>
            <button class="mpm-button is-primary" type="button" data-mpm="action-save" data-i18n="actionSave">保存</button>
            <button class="mpm-button" type="button" data-mpm="action-cancel" data-i18n="cancel">取消</button>
            <button class="mpm-button" type="button" data-mpm="action-insert" data-i18n="actionInsert">写入节点</button>
            <button class="mpm-button is-danger" type="button" data-mpm="action-delete" data-i18n="actionDelete">删除</button>
            <input class="mpm-file" type="file" accept="application/json,.json" data-mpm="file" />
        </div>
    </div>
    <button class="mpm-back-top" type="button" data-mpm="back-to-top" data-i18n-title="backToTop" title="回到顶部" aria-label="回到顶部" hidden>↑</button>
    <div class="mpm-action-dialog" data-mpm="action-dialog" role="dialog" aria-modal="true" aria-labelledby="mpm-action-dialog-title" hidden>
        <div class="mpm-action-dialog-panel" data-mpm="action-dialog-panel">
            <div class="mpm-action-dialog-title" id="mpm-action-dialog-title" data-mpm="action-dialog-title" data-i18n="confirmTitle">确认操作</div>
            <div class="mpm-action-dialog-message" data-mpm="action-dialog-message"></div>
            <label class="mpm-action-dialog-field" data-mpm="action-dialog-field" hidden>
                <span class="mpm-label" data-mpm="action-dialog-input-label" data-i18n="inputLabel">输入</span>
                <input class="mpm-input" data-mpm="action-dialog-input" />
            </label>
            <div class="mpm-action-dialog-folder" data-mpm="action-dialog-folder" hidden>
                <div class="mpm-action-dialog-mode">
                    <label class="mpm-action-dialog-mode-option">
                        <input type="radio" name="mpm-action-dialog-folder-mode" value="existing" data-mpm="action-dialog-folder-mode-existing" />
                        <span data-i18n="existingFolderMode">选择已有文件夹</span>
                    </label>
                    <label class="mpm-action-dialog-mode-option">
                        <input type="radio" name="mpm-action-dialog-folder-mode" value="new" data-mpm="action-dialog-folder-mode-new" />
                        <span data-i18n="newFolderMode">新建文件夹</span>
                    </label>
                </div>
                <label class="mpm-action-dialog-folder-field" data-mpm="action-dialog-folder-existing-field">
                    <span class="mpm-label" data-i18n="existingFolder">已有文件夹</span>
                    <select class="mpm-select" data-mpm="action-dialog-folder-select"></select>
                </label>
                <label class="mpm-action-dialog-folder-field" data-mpm="action-dialog-folder-new-field" hidden>
                    <span class="mpm-label" data-i18n="newFolder">新文件夹</span>
                    <input class="mpm-input" data-mpm="action-dialog-folder-input" data-i18n-placeholder="folderPlaceholder" placeholder="例如：人物/Miku" />
                </label>
            </div>
            <div class="mpm-action-dialog-actions">
                <button class="mpm-button" type="button" data-mpm="action-dialog-cancel" data-i18n="cancel">取消</button>
                <button class="mpm-button is-primary" type="button" data-mpm="action-dialog-confirm" data-i18n="confirm">确认</button>
            </div>
        </div>
    </div>
    <div class="mpm-image-viewer" data-mpm="image-viewer" hidden>
        <div class="mpm-image-viewer-top">
            <div class="mpm-image-viewer-title" data-mpm="image-viewer-title" data-i18n="referenceImage">参考图片</div>
            <button class="mpm-close" type="button" data-mpm="image-viewer-close" data-i18n="close">关闭</button>
        </div>
        <div class="mpm-image-viewer-stage">
            <img class="mpm-image-viewer-image" data-mpm="image-viewer-image" alt="参考图片" />
        </div>
    </div>
</div>`;

    document.body.appendChild(overlay);

    state.refs = {
        dialog: overlay.querySelector('[data-mpm="dialog"]'),
        close: overlay.querySelector('[data-mpm="close"]'),
        languageToggle: overlay.querySelector('[data-mpm="language-toggle"]'),
        themeToggle: overlay.querySelector('[data-mpm="theme-toggle"]'),
        viewLibrary: overlay.querySelector('[data-mpm="view-library"]'),
        viewEditor: overlay.querySelector('[data-mpm="view-editor"]'),
        folderTree: overlay.querySelector('[data-mpm="folder-tree"]'),
        filterTag: overlay.querySelector('[data-mpm="filter-tag"]'),
        search: overlay.querySelector('[data-mpm="search"]'),
        toolbarNote: overlay.querySelector('[data-mpm="toolbar-note"]'),
        list: overlay.querySelector('[data-mpm="list"]'),
        back: overlay.querySelector('[data-mpm="back"]'),
        editorTitle: overlay.querySelector('[data-mpm="editor-title"]'),
        name: overlay.querySelector('[data-mpm="name"]'),
        folder: overlay.querySelector('[data-mpm="folder"]'),
        folderExisting: overlay.querySelector('[data-mpm="folder-existing"]'),
        tags: overlay.querySelector('[data-mpm="tags"]'),
        private: overlay.querySelector('[data-mpm="private"]'),
        positive: overlay.querySelector('[data-mpm="positive"]'),
        positiveTokens: overlay.querySelector('[data-mpm="positive-tokens"]'),
        negative: overlay.querySelector('[data-mpm="negative"]'),
        negativeTokens: overlay.querySelector('[data-mpm="negative-tokens"]'),
        note: overlay.querySelector('[data-mpm="note"]'),
        referenceBox: overlay.querySelector('[data-mpm="reference-box"]'),
        referenceImage: overlay.querySelector('[data-mpm="reference-image"]'),
        referencePrivateEye: overlay.querySelector('[data-mpm="reference-private-eye"]'),
        referenceEmpty: overlay.querySelector('[data-mpm="reference-empty"]'),
        referenceMeta: overlay.querySelector('[data-mpm="reference-meta"]'),
        referenceUpload: overlay.querySelector('[data-mpm="reference-upload"]'),
        referenceClear: overlay.querySelector('[data-mpm="reference-clear"]'),
        referenceFile: overlay.querySelector('[data-mpm="reference-file"]'),
        tabLibrary: overlay.querySelector('[data-mpm="tab-library"]'),
        status: overlay.querySelector('[data-mpm="status"]'),
        actionSelectAll: overlay.querySelector('[data-mpm="action-select-all"]'),
        actionBatchMove: overlay.querySelector('[data-mpm="action-batch-move"]'),
        actionBatchDelete: overlay.querySelector('[data-mpm="action-batch-delete"]'),
        actionNew: overlay.querySelector('[data-mpm="action-new"]'),
        actionImport: overlay.querySelector('[data-mpm="action-import"]'),
        actionExport: overlay.querySelector('[data-mpm="action-export"]'),
        actionSave: overlay.querySelector('[data-mpm="action-save"]'),
        actionCancel: overlay.querySelector('[data-mpm="action-cancel"]'),
        actionInsert: overlay.querySelector('[data-mpm="action-insert"]'),
        actionDelete: overlay.querySelector('[data-mpm="action-delete"]'),
        file: overlay.querySelector('[data-mpm="file"]'),
        backToTop: overlay.querySelector('[data-mpm="back-to-top"]'),
        actionDialog: overlay.querySelector('[data-mpm="action-dialog"]'),
        actionDialogPanel: overlay.querySelector('[data-mpm="action-dialog-panel"]'),
        actionDialogTitle: overlay.querySelector('[data-mpm="action-dialog-title"]'),
        actionDialogMessage: overlay.querySelector('[data-mpm="action-dialog-message"]'),
        actionDialogField: overlay.querySelector('[data-mpm="action-dialog-field"]'),
        actionDialogInputLabel: overlay.querySelector('[data-mpm="action-dialog-input-label"]'),
        actionDialogInput: overlay.querySelector('[data-mpm="action-dialog-input"]'),
        actionDialogFolder: overlay.querySelector('[data-mpm="action-dialog-folder"]'),
        actionDialogFolderModeExisting: overlay.querySelector('[data-mpm="action-dialog-folder-mode-existing"]'),
        actionDialogFolderModeNew: overlay.querySelector('[data-mpm="action-dialog-folder-mode-new"]'),
        actionDialogFolderExistingField: overlay.querySelector('[data-mpm="action-dialog-folder-existing-field"]'),
        actionDialogFolderNewField: overlay.querySelector('[data-mpm="action-dialog-folder-new-field"]'),
        actionDialogFolderSelect: overlay.querySelector('[data-mpm="action-dialog-folder-select"]'),
        actionDialogFolderInput: overlay.querySelector('[data-mpm="action-dialog-folder-input"]'),
        actionDialogCancel: overlay.querySelector('[data-mpm="action-dialog-cancel"]'),
        actionDialogConfirm: overlay.querySelector('[data-mpm="action-dialog-confirm"]'),
        imageViewer: overlay.querySelector('[data-mpm="image-viewer"]'),
        imageViewerTitle: overlay.querySelector('[data-mpm="image-viewer-title"]'),
        imageViewerImage: overlay.querySelector('[data-mpm="image-viewer-image"]'),
        imageViewerClose: overlay.querySelector('[data-mpm="image-viewer-close"]'),
    };

    state.refs.languageToggle.addEventListener("click", toggleLanguage);
    state.refs.themeToggle.addEventListener("click", toggleTheme);
    state.refs.close.addEventListener("click", () => overlay.classList.remove("is-open"));
    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) {
            overlay.classList.remove("is-open");
        }
    });

    state.refs.filterTag.addEventListener("change", renderList);
    state.refs.search.addEventListener("input", renderList);
    state.refs.list.addEventListener("scroll", updateBackToTopButton);
    state.refs.name.addEventListener("input", updateBottomBar);
    state.refs.positive.addEventListener("input", updatePromptTokenPreviews);
    state.refs.negative.addEventListener("input", updatePromptTokenPreviews);

    state.refs.back.addEventListener("click", () => setView("library"));
    state.refs.tabLibrary.addEventListener("click", () => setView("library"));
    state.refs.imageViewerClose.addEventListener("click", closeImageViewer);
    state.refs.imageViewerImage.addEventListener("click", closeImageViewer);
    state.refs.imageViewer.addEventListener("click", (event) => {
        if (event.target === state.refs.imageViewer) {
            closeImageViewer();
        }
    });
    state.refs.actionDialogCancel.addEventListener("click", cancelActionDialog);
    state.refs.actionDialogConfirm.addEventListener("click", confirmActionDialog);
    state.refs.actionDialog.addEventListener("mousedown", (event) => {
        if (event.target === state.refs.actionDialog) {
            cancelActionDialog();
        }
    });
    state.refs.actionDialog.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            cancelActionDialog();
        }
    });
    state.refs.actionDialogInput.addEventListener("input", () => {
        state.refs.actionDialogInput.setCustomValidity("");
    });
    state.refs.actionDialogInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            confirmActionDialog();
        }
    });
    state.refs.actionDialogFolderModeExisting.addEventListener("change", () => updateActionDialogFolderMode(true));
    state.refs.actionDialogFolderModeNew.addEventListener("change", () => updateActionDialogFolderMode(true));
    state.refs.actionDialogFolderSelect.addEventListener("change", () => {
        state.refs.actionDialogFolderSelect.setCustomValidity("");
    });
    state.refs.actionDialogFolderInput.addEventListener("input", () => {
        state.refs.actionDialogFolderInput.setCustomValidity("");
    });
    state.refs.actionDialogFolderInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            confirmActionDialog();
        }
    });

    state.refs.backToTop.addEventListener("click", () => {
        state.refs.list.scrollTo({ top: 0, behavior: "smooth" });
    });

    state.refs.folderExisting.addEventListener("change", () => {
        if (state.refs.folderExisting.value) {
            state.refs.folder.value = state.refs.folderExisting.value;
        }
    });

    state.refs.private.addEventListener("change", updateReferencePreview);
    state.refs.referenceBox.addEventListener("click", () => {
        const url = currentPreviewUrl();
        if (url) {
            openImageViewer(url, state.refs.name.value.trim() || t("referenceImage"));
        }
    });
    state.refs.referenceUpload.addEventListener("click", () => state.refs.referenceFile.click());
    state.refs.referenceClear.addEventListener("click", clearReferenceImage);
    state.refs.referenceFile.addEventListener("change", (event) => {
        handleReferenceImageSelection(event.target.files?.[0]);
        event.target.value = "";
    });

    state.refs.actionSelectAll.addEventListener("click", toggleCurrentSelection);
    state.refs.actionBatchMove.addEventListener("click", () => moveSelectedPrompts().catch((error) => setStatus(error.message)));
    state.refs.actionBatchDelete.addEventListener("click", () => deleteSelectedPrompts().catch((error) => setStatus(error.message)));
    state.refs.actionNew.addEventListener("click", openCreatePrompt);
    state.refs.actionImport.addEventListener("click", () => state.refs.file.click());
    state.refs.actionExport.addEventListener("click", exportPrompts);
    state.refs.actionSave.addEventListener("click", () => savePrompt().catch((error) => setStatus(error.message)));
    state.refs.actionCancel.addEventListener("click", () => setView("library"));
    state.refs.actionInsert.addEventListener("click", writePresetToNode);
    state.refs.actionDelete.addEventListener("click", () => deletePrompt().catch((error) => setStatus(error.message)));

    state.refs.file.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        importPrompts(file).catch((error) => setStatus(error.message));
        event.target.value = "";
    });

    state.root = overlay;
    renderFilters();
    renderFolderOptions();
    updateReferencePreview();
    updateEditorHeader();
    updateBottomBar();
    applyTheme(state.theme);
    applyLanguage(state.language);
}

async function openManager(node) {
    if (!state.root) {
        createManager();
    }
    state.node = node || null;
    state.root.classList.add("is-open");
    setView("library");
    setStatus(t("loading"));
    try {
        await loadPrompts(true);
    } catch (error) {
        setStatus(error.message);
    }
}

async function reloadNode(node) {
    try {
        if (!state.root) {
            createManager();
        }
        state.node = node || null;
        await loadPrompts(true);
    } catch (error) {
        setStatus(error.message);
    }
}

app.registerExtension({
    name: "Mimosa.PromptManager",
    async beforeRegisterNodeDef(nodeType, nodeData) {
        if (nodeData.name === "MimosaPromptLibrary") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const result = onNodeCreated?.apply(this, arguments);
                this.addWidget("button", t("openManager"), null, () => openManager(this));
                this.addWidget("button", t("reloadPresets"), null, () => reloadNode(this));
                return result;
            };
        }
    },
});
