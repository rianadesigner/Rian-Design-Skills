---
type: source
tags:
  - knowledge-management
  - llm
  - wiki
summary: "Karpathy 提出的 LLM Wiki 模式原始文档"
sources:
  - "raw/karpathy-llm-wiki-gist.md"
updated: "2026-06-03"
---

# Karpathy LLM Wiki Gist

- **作者**：Andrej Karpathy
- **链接**：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **导入日期**：2026-06-03

## 核心要点

- 用 LLM 增量构建持久化个人知识库，替代每次查询重新推导的 RAG 模式
- 三层架构：Raw Sources（不可变）→ Wiki（LLM 维护）→ Schema（规则配置）
- 三种操作：Ingest（导入）、Query（查询）、Lint（健康检查）
- 核心洞察：维护成本趋近零，知识复利式增长
- 比喻：Obsidian 是 IDE，LLM 是程序员，wiki 是代码库
- 精神源头：Vannevar Bush 的 Memex（1945）

## 关联页面

- [[概念_LLM_Wiki模式]]
- [[人物_Andrej_Karpathy]]
