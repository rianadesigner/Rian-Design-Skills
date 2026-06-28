---
type: human-article
tags:
  - knowledge-management
  - llm
  - rag
summary: "LLM Wiki 与 RAG 的分工：RAG 负责原文保真，Wiki 负责长期理解，混合架构负责二者融合"
sources:
  - "wiki/machine/concepts/概念_LLM_Wiki模式.md"
  - "wiki/machine/concepts/概念_RAG.md"
  - "wiki/machine/comparisons/LLM_Wiki_vs_RAG.md"
updated: "2026-06-04"
---

# LLM Wiki 与 RAG 知识管理

## 一句话结论

[[概念_RAG]] 解决“这一次答案要可靠、有原文依据”，[[概念_LLM_Wiki模式]] 解决“长期理解要沉淀、关联和复利”。真正稳妥的方向是 [[概念_混合知识架构]]。

## 核心分工

| 问题 | 更适合 |
|------|--------|
| 查条款、参数、制度、原文依据 | [[概念_RAG]] |
| 做长期研究、概念整理、跨文档推理 | [[概念_LLM_Wiki模式]] |
| 既要综合判断，又要可追溯证据 | [[概念_混合知识架构]] |

## 对我的 wiki 的启发

当前 vault 采用双层结构：

- `wiki/machine/`：机器维护层，负责 source / concept / entity / comparison。
- `wiki/human/`：人读出版层，负责主题化阅读和知识图谱浏览。

这相当于把 LLM Wiki 内部也分成两个阶段：先编译，再出版。

## 继续阅读

- [[LLM_Wiki_vs_RAG]]
- [[概念_LLM_Wiki模式]]
- [[概念_RAG]]
- [[概念_混合知识架构]]
