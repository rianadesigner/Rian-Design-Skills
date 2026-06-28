# Log

操作日志。按时间顺序，仅追加。

---

## [2026-06-03] bootstrap | 知识库初始化

基于 iBlinkQ/llm-wiki-obsidian-blink 模板创建知识库结构。

## [2026-06-03] ingest | raw/karpathy-llm-wiki-gist.md → wiki/sources/Karpathy_LLM_Wiki_Gist.md

来源：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
产出：
- `wiki/sources/Karpathy_LLM_Wiki_Gist.md` — 来源摘要
- `wiki/concepts/概念_LLM_Wiki模式.md` — 概念页
- `wiki/entities/人物_Andrej_Karpathy.md` — 实体页
- `wiki/overview/主题_AI_Vibe-Coding_Design_综述.md` — 领域总览

## [2026-06-03] restructure | 按 iBlinkQ 模板重建目录结构

从 SherwinQ 结构迁移至 iBlinkQ/llm-wiki-obsidian-blink 结构。更新：TheSchema.md、命名规范（中文+下划线）、frontmatter 格式、Obsidian 配置。

## [2026-06-03] ingest | Clippings/LLM Wiki 与 RAG 全面对比.md → wiki/sources/LLM_Wiki_与_RAG_全面对比.md

整合 Clippings 中的 RAG / LLM Wiki 对比文章。产出：
- `wiki/sources/LLM_Wiki_与_RAG_全面对比.md` — 来源摘要
- `wiki/concepts/概念_RAG.md` — 概念页
- `wiki/concepts/概念_混合知识架构.md` — 概念页
- `wiki/comparisons/LLM_Wiki_vs_RAG.md` — 比较页
- 更新 `wiki/concepts/概念_LLM_Wiki模式.md`、`wiki/overview/主题_AI_Vibe-Coding_Design_综述.md`、`wiki/index.md`

备注：`raw/clippings/rian的抖音.md` 当前只有“服务异常，刷新拉取数据”，未产生有效 wiki 页面。

## [2026-06-04] ingest | raw/clippings/置身.md → wiki/sources/置身钉内.md

整合 `raw/clippings/置身.md`。产出：
- `wiki/sources/置身钉内.md` — 来源摘要
- `wiki/entities/项目_钉钉_ONE.md` — 项目实体页
- `wiki/concepts/概念_AI工作信息流.md` — 概念页
- `wiki/concepts/概念_AI产品主动服务.md` — 概念页
- `wiki/concepts/概念_AI产品用户验证.md` — 概念页
- `wiki/concepts/概念_AI产品敏捷债.md` — 概念页
- `wiki/concepts/概念_企业Agent.md` — 概念页
- 更新 `wiki/overview/主题_AI_Vibe-Coding_Design_综述.md`、`wiki/index.md`

备注：`raw/clippings/rian的抖音.md` 当前仍只有“服务异常，刷新拉取数据”，未产生有效 wiki 页面。

## [2026-06-04] restructure | 双层 wiki：machine + human

将原 `wiki/` 类型结构迁移为双层结构：
- `wiki/machine/` — 机器维护层，保留 sources / concepts / entities / comparisons / overview
- `wiki/human/` — 人读出版层，按主题创建阅读型文章

新增：
- `wiki/index.md` — 双层 wiki 入口
- `wiki/human/Human Wiki Home.md`
- `wiki/human/knowledge-management/LLM Wiki与RAG知识管理.md`
- `wiki/human/ai-product/AI工作信息流设计.md`
- `wiki/human/enterprise-ai/企业Agent与钉钉ONE案例.md`
- `wiki/human/methodology/AI产品管理方法.md`

同时更新 `TheSchema.md` 和 Obsidian Graph 默认过滤为 `path:wiki/human -path:index`。

## [2026-06-04] restructure | raw 统一输入层，去掉 project 概念

调整系统规则：不再区分 `projects/` 与 `raw/` 两个概念，统一使用 `raw/` 作为所有输入和工作现场材料的归档层。

新增 / 调整 raw 子目录：
- `raw/inbox/`
- `raw/uploads/`
- `raw/clippings/`
- `raw/apps/`
- `raw/git-repos/`
- `raw/xhs-notes/`

新增 `raw/README.md` 说明 raw 输入区规则。更新 `TheSchema.md`：默认上传进入 `raw/` 类型文件夹，wiki 只接收经过 Ingest / Publish 的知识页。


## [2026-06-04] schema | raw 单元文件夹规则

更新 `raw/README.md` 与 `TheSchema.md`：确认顶层只保留一个 `raw/`，但 `raw/` 下可以有任意多个 raw 单元文件夹。支持两种入口：
- 单次上传自动创建 raw 单元文件夹
- 用户先创建空 raw 单元文件夹，再继续上传资料

raw 单元只作为输入容器；经过 Ingest 才进入 `wiki/machine/`，经过 Publish 才进入 `wiki/human/`。
