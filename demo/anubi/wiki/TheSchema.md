---
created: 2026-06-03T00:00
updated: 2026-06-04T00:00
type: guide
tags:
  - schema
  - wiki
  - knowledge-management
---

## 0. 目标与边界

> [!info] 核心目标
> 维护一个两层系统：**raw 是所有输入和工作现场，wiki 是从 raw 编译出的知识层**。

本系统只有两个大概念：

| 层       | 作用                                                       |
| ------- | -------------------------------------------------------- |
| `raw/`  | 所有进入知识系统之前的材料：上传、剪藏、长文本、第三方应用上下文、Git 仓库信息、会议记录、草稿、工作现场材料 |
| `wiki/` | 从 `raw/` 中提炼出来的结构化知识、主题文章和知识图谱                           |

- **领域**：AI × Vibe-Coding/Design — 工具链、工作流、设计工程
- **边界**：
  - `raw/` 是唯一事实来源，默认只读不改内容
  - 可以在 `raw/` 下创建文件夹来归档输入，但不要把 `project` 作为顶层概念
  - `wiki/machine/` 是机器维护层，由 LLM 创建、更新、Lint
  - `wiki/human/` 是人读出版层，由 LLM 基于 machine 层编译成熟主题文章

---

## 1. Raw 输入区约定

首页是文件夹格式时，**默认上传应该自动进入 `raw/` 下的类型文件夹**，而不是直接进入 `wiki/`。

推荐结构：

| 文件夹 | 用途 |
|--------|------|
| `raw/inbox/` | 临时入口：无法判断类型时先放这里 |
| `raw/uploads/` | 文件上传：PDF、Word、图片、视频、附件等 |
| `raw/clippings/` | 链接、长文本、网页剪藏 |
| `raw/apps/` | 第三方应用导出的上下文，如 Figma、Notion、飞书、钉钉等 |
| `raw/git-repos/` | Git 仓库链接、代码分析摘要、repo 元信息 |
| `raw/xhs-notes/` | 小红书相关采集资料 |

### 1.1 默认上传策略

当用户通过入口上传资料：

- **文件上传** → `raw/uploads/<来源名或日期>/`
- **链接 / 长文本** → `raw/clippings/<标题或日期>.md`
- **第三方应用** → `raw/apps/<app-name>/<标题或日期>.md`
- **Git 仓库** → `raw/git-repos/<repo-name>/repo.md`
- **无法判断** → `raw/inbox/<标题或日期>/`

如果首页需要展示文件夹，优先展示 `raw/` 下的这些输入文件夹。

### 1.2 是否让 wiki 变成文件夹？

`wiki/` 本身可以是文件夹结构，但**不要把用户上传直接变成 wiki 文件夹**。

原因：

- `raw/` 是输入和现场，允许杂乱、临时、未整理。
- `wiki/` 是知识沉淀，应该经过 Ingest / Publish 后再生成。
- 如果上传即进入 `wiki/`，会污染知识图谱，让未整理材料和成熟知识混在一起。

因此：

```text
上传 / 链接 / 应用 / Git
        ↓
raw/ 类型文件夹
        ↓ Ingest
wiki/machine/
        ↓ Publish
wiki/human/
```



### 1.3 Raw 单元文件夹

`raw/` 不是只能放一层文件。它可以包含任意多个 **raw 单元文件夹**。

一个 raw 单元可以代表：

- 一次单次上传
- 一组用户上传的文件
- 用户手动创建的空文件夹
- 一个第三方应用上下文包
- 一个 Git 仓库资料包
- 一个临时主题资料包

推荐结构：

```text
raw/uploads/<日期-主题>/
raw/apps/<app-name>/<日期-主题>/
raw/git-repos/<repo-name>/
raw/inbox/<日期-主题>/
```

如果 raw 单元包含多个文件，建议在该文件夹内创建 `README.md` 作为 manifest：

```yaml
---
type: raw-unit
status: unprocessed
created: "2026-06-04"
source_type: "upload|clipping|app|git|mixed"
summary: "这个 raw 单元收集了什么"
---
```

工作原则：

- 顶层只有一个 `raw/`
- `raw/` 下可以有很多 raw 单元文件夹
- 用户可以单次上传自动生成 raw 单元，也可以先创建空 raw 单元再上传
- raw 单元是输入容器，不是知识页
- Ingest 后才生成 `wiki/machine/` 页面
- Publish 后才生成 `wiki/human/` 页面

---

## 2. Wiki 目录结构约定

### Machine Wiki（机器维护层）

`wiki/machine/` 是 LLM 的结构化知识工作区：

| 目录 | 用途 |
|------|------|
| `wiki/machine/sources/` | 单个来源的摘要页 |
| `wiki/machine/entities/` | 人物、项目、组织、产品等实体页 |
| `wiki/machine/concepts/` | 方法、理论、模型、概念页 |
| `wiki/machine/comparisons/` | 比较分析页 |
| `wiki/machine/overview/` | 总览、综合页 |
| `wiki/machine/machine-index.md` | machine 层内容索引 |
| `wiki/machine/machine-log.md` | machine 层操作日志 |

### Human Wiki（人读出版层）

`wiki/human/` 是给人阅读和看 Graph 的主题层：

| 目录 | 用途 |
|------|------|
| `wiki/human/knowledge-management/` | 知识管理、RAG、LLM Wiki |
| `wiki/human/ai-product/` | AI 产品设计与工作流 |
| `wiki/human/enterprise-ai/` | 企业 Agent、企业 AI 案例 |
| `wiki/human/methodology/` | 产品方法论、用户研究、工程方法 |
| `wiki/human/Human Wiki Home.md` | human 层入口 |

### Wiki 入口

- `wiki/index.md`：双层 wiki 总入口

---

## 3. 页面类型与基本格式

### Machine 页面 frontmatter

```yaml
---
type: "source|entity|concept|comparison|overview"
tags: ["tag1", "tag2"]
summary: "一句话说明这页的核心内容"
sources: ["raw/xxx.md"]
updated: "2026-06-04"
---
```

### Human 页面 frontmatter

```yaml
---
type: "human-article|human-index"
tags: ["tag1", "tag2"]
summary: "一句话说明这篇人读文章的核心观点"
sources:
  - "wiki/machine/concepts/xxx.md"
  - "wiki/machine/sources/yyy.md"
updated: "2026-06-04"
---
```

---

## 4. 工作流：Capture / Ingest / Publish / Query / Lint

### 4.1 Capture（进入 raw）

当用户上传文件、粘贴链接 / 长文本、连接第三方应用或提供 Git 仓库时：

1. 先放入 `raw/` 下合适的类型文件夹
2. 保留原始内容，不直接改写为知识页
3. 如需要，可在 raw 文件夹中创建 `README.md` 说明该输入的来源、时间、用途

### 4.2 Ingest（从 raw 到 machine）

当用户要求基于 `raw/xxx` 整理时：

1. 阅读 raw 来源，提炼重点
2. 在 `wiki/machine/sources/` 新建或更新来源摘要页
3. 根据内容更新或创建：
   - `wiki/machine/entities/`
   - `wiki/machine/concepts/`
   - `wiki/machine/comparisons/`
   - `wiki/machine/overview/`
4. 更新 `wiki/machine/machine-index.md`
5. 在 `wiki/machine/machine-log.md` 追加记录

### 4.3 Publish（从 machine 到 human）

当某个主题成熟，或用户要求“整理成人读 wiki”时：

1. 读取相关 machine 页面
2. 合成为 `wiki/human/<domain>/xxx.md`
3. human 页面以主题、问题、结论组织，而不是按来源摘要组织
4. human 页面要在 `sources` 中引用 machine 页面，并在正文链接关键 machine 节点
5. 更新 `wiki/human/Human Wiki Home.md` 和必要的跨链接

### 4.4 Query（基于 wiki 回答问题）

1. 用户问概念、事实、来源：优先查 `wiki/machine/machine-index.md`
2. 用户问理解、复盘、主题：优先查 `wiki/human/Human Wiki Home.md`
3. 有价值的回答可以建议写回：
   - 结构化知识 → `wiki/machine/`
   - 人读文章 → `wiki/human/`

### 4.5 Lint（健康检查）

Lint 分两种：

- **Machine Lint**：断链、孤立页、重复概念、来源缺失、frontmatter 错误
- **Human Lint**：主题文章是否过时、是否缺少来源、是否过度重复、图谱是否可读

先生成建议清单，除非用户明确要求，否则不做大规模自动改动。

---

## 5. Graph 约定

默认 Obsidian Graph 看人读层：

```text
path:wiki/human -path:index
```

维护时看机器层：

```text
path:wiki/machine -path:machine-index -path:machine-log
```

全局体检时才看：

```text
path:wiki -path:index -path:machine-index -path:machine-log
```

---

## 6. 命名与风格

- `raw/` 下文件夹用英文短横线或稳定来源名，便于系统处理
- Machine 层可保留中文 + 下划线命名，如 `概念_LLM_Wiki模式.md`
- Human 层使用更适合阅读的标题命名，如 `AI工作信息流设计.md`
- 内部链接使用 Obsidian wikilink 语法
- Machine 层重结构和溯源；Human 层重可读性和综合表达
- 不确定时，先提议，再执行
