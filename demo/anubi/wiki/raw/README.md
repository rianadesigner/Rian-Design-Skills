---
type: raw-guide
tags:
  - raw
  - guide
updated: "2026-06-04"
---

# Raw 输入区

`raw/` 是所有资料进入知识系统之前的地方：上传文件、网页剪藏、长文本、第三方应用上下文、Git 仓库信息、会议记录、草稿和工作现场材料都放这里。

## 文件夹

| 文件夹 | 用途 |
|--------|------|
| `inbox/` | 临时入口：无法判断类型时先放这里 |
| `uploads/` | 文件上传：PDF、Word、图片、视频、附件等 |
| `clippings/` | 链接、长文本、网页剪藏 |
| `apps/` | 第三方应用导出的上下文，如 Figma、Notion、飞书、钉钉等 |
| `git-repos/` | Git 仓库链接、代码分析摘要、repo 元信息 |
| `xhs-notes/` | 小红书相关采集资料 |

## 原则

- `raw/` 只存原始资料和工作现场材料，默认只读。
- 可复用知识进入 `wiki/machine/`。
- 人读主题文章进入 `wiki/human/`。

## Raw 单元文件夹

`raw/` 下面可以有很多文件夹。每个文件夹都可以看作一个 **raw 单元**，代表一次上传、一组资料、一个主题包，或用户手动创建的空文件夹。

推荐规则：

```text
raw/
  inbox/
  uploads/
    2026-06-04-ai-product-notes/
      README.md
      file-1.pdf
      file-2.md
  clippings/
    llm-wiki-rag-comparison.md
  apps/
    figma/
      2026-06-04-design-audit/
        README.md
        context.md
  git-repos/
    my-repo/
      README.md
      repo.md
```

### 两种创建方式

1. **单次上传自动创建文件夹**
   - 用户一次上传多个文件时，系统自动创建一个 raw 单元文件夹。
   - 文件夹名建议用日期 + 简短主题。

2. **用户先创建空文件夹再上传**
   - 用户可以先在 `raw/` 下创建一个空文件夹。
   - 后续上传的文件都归入这个文件夹。

### raw 单元 README

如果一个 raw 单元里有多个文件，建议创建 `README.md`：

```yaml
---
type: raw-unit
status: unprocessed
created: "2026-06-04"
source_type: "upload|clipping|app|git|mixed"
summary: "这个 raw 单元收集了什么"
---
```

```md
# Raw 单元标题

## 内容

- file-1.pdf
- file-2.md

## 用途

这组资料准备用来做什么。

## 处理状态

- [ ] 已 Ingest 到 wiki/machine
- [ ] 已 Publish 到 wiki/human
```

### 原则

- 顶层只有一个 `raw/`。
- `raw/` 下面可以有任意多个 raw 单元文件夹。
- raw 单元可以按上传批次、来源、主题或用户自定义命名。
- 只有经过 Ingest 的内容才进入 `wiki/machine/`。
- 只有经过 Publish 的成熟主题才进入 `wiki/human/`。

