---
type: concept
tags:
  - knowledge-management
  - llm
  - wiki
  - pattern
summary: "Karpathy 提出的 LLM 增量构建持久化知识库模式，替代 RAG"
sources:
  - "raw/karpathy-llm-wiki-gist.md"
  - "raw/clippings/LLM Wiki 与 RAG 全面对比.md"
updated: "2026-06-03"
---

# LLM Wiki 模式

由 [[人物_Andrej_Karpathy]] 提出的个人知识库构建范式。核心主张：**让 LLM 增量构建并维护一个持久化 wiki，而非每次查询时重新从原始文档中检索（RAG）。**

## 核心洞察

| 维度 | RAG 模式 | Wiki 模式 |
|------|----------|-----------|
| 知识状态 | 每次查询重新发现 | 编译一次，持续更新 |
| 交叉引用 | 查询时临时拼凑 | 预先建立并维护 |
| 矛盾检测 | 不检测 | 摄入时自动标记 |
| 知识积累 | 无 | 复利式增长 |
| 维护者 | 无（或人工） | LLM 自动 |

关键比喻：**Obsidian 是 IDE，LLM 是程序员，wiki 是代码库。**

## 三层架构

1. **Raw Sources（原始素材）** — 不可变的源文档（文章、论文、数据）。LLM 只读不写。
2. **Wiki（知识层）** — LLM 生成并维护的 markdown 文件集合。包含摘要、实体页、概念页、比较、综述。LLM 完全拥有此层。
3. **Schema（规范层）** — 告诉 LLM 如何组织 wiki 的配置文档（如 TheSchema.md）。人与 LLM 共同演化。

## 三种操作

- **Ingest** — 导入新素材 → 写摘要 → 更新索引 → 更新相关实体/概念页。一个源可能触及 10-15 个 wiki 页面。
- **Query** — 向 wiki 提问 → LLM 读索引找相关页 → 综合回答并引用。好的回答可以反向存入 wiki。
- **Lint** — 健康检查：找矛盾、过时页、孤立页、缺失交叉引用、数据空白。

## 为什么有效

> 人类放弃 wiki 是因为维护负担增长快于价值。LLM 不会无聊，不会忘记更新交叉引用，一次操作可以触及 15 个文件。维护成本趋近于零。

精神源头：Vannevar Bush 的 Memex（1945）— 一个有关联路径的私人知识存储。Bush 无法解决的问题是"谁来维护"，LLM 解决了。

## 适用场景

- 个人成长追踪（日记、播客笔记、文章）
- 深度研究（论文、报告，跨周跨月）
- 读书笔记（角色、主题、情节线索互联）
- 团队知识库（会议记录、Slack、客户通话自动归档）
- Vibe-Coding/Design 工具链知识积累 ← **本知识库的用法**

## 工具生态

- **Obsidian** — 浏览 wiki 的首选工具（Graph View、Dataview、Marp）
- **qmd** — 本地 markdown 搜索引擎（BM25 + 向量混合搜索）
- **Obsidian Web Clipper** — 浏览器插件，一键将网页转为 markdown 素材

## 与 RAG 的边界

补充来源 [[LLM_Wiki_与_RAG_全面对比]] 强调：[[概念_LLM_Wiki模式]] 与 [[概念_RAG]] 不是简单替代关系，而是服务不同知识需求。

- LLM Wiki 的强项：长期研究、个人知识管理、跨文档综合推理、低基础设施成本。
- RAG 的强项：强溯源、原文保真、企业级海量文档、高并发与权限管理。
- LLM Wiki 的风险：弱溯源、错误可能被固化进 wiki、超大规模和实时更新能力有限。

因此更成熟的方向可能是 [[概念_混合知识架构]]：RAG 作为底层保真检索，Wiki 作为上层结构化知识，Agent 负责分流与融合。
