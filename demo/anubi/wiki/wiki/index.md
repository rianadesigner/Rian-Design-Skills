---
type: portal
tags:
  - index
  - wiki
summary: "双层 wiki 入口：human 给人读，machine 给 LLM 维护"
updated: "2026-06-04"
---

# Wiki 入口

本知识库现在分成两套 wiki：

## Human Wiki（人读层）

路径：`wiki/human/`

用于日常阅读、复盘、主题浏览和 Obsidian Graph。默认知识图谱看这一层。

- [[wiki/human/Human Wiki Home|Human Wiki Home]]
- [[AI工作信息流设计]]
- [[企业Agent与钉钉ONE案例]]
- [[LLM Wiki与RAG知识管理]]
- [[AI产品管理方法]]

## Machine Wiki（机器维护层）

路径：`wiki/machine/`

用于 Ingest、Query、Lint、溯源和知识结构维护。

- [[wiki/machine/machine-index|Machine Index]]
- [[wiki/machine/machine-log|Machine Log]]

## Graph 默认视图

默认看 Human Wiki：

```text
path:wiki/human -path:index
```

需要维护时再切到 Machine Wiki：

```text
path:wiki/machine -path:machine-index -path:machine-log
```
