---
title: "LLM Wiki 与 RAG 全面对比"
source: "https://ata.atatech.org/articles/12020625218?spm=ata.21736010.0.0.3af572f14HvjaB&utm_source=dingtalk&utm_medium=userShare&utm_campaign=138020"
author:
published:
created: 2026-06-03
description:
tags:
  - "clippings"
---
寒池

** 15

** 14

** 1

**

**

[张旭东(寒池)](https://ata.atatech.org/users/12001017225)

4月22日发表4月22日更新680次浏览

** 朗读

** 字号

** 笔记

** 分享 **

朗读文章13:06

**

2026年4月，Andrej Karpathy（OpenAI前高管、特斯拉AI负责人）公开开源了 LLM Wiki 工作流，一句 "Compile, don't retrieve"（先编译，不检索），直接向统治行业数年的 RAG 发起挑战。一时间技术圈热议不断：RAG 要被淘汰了吗？LLM Wiki 真的更好吗？

答案是否定的——两者并非替代关系，而是互补关系，各占不同的场景赛道。本文从概念、原理、实现方式、使用场景等维度全面剖析，帮你看清这场博弈的本质。

核心区别：

●

RAG：现查现答

●

LLM Wiki：先整理成体系，再基于体系回答

如果再形象一点：

●

RAG 像你家里有一堆快递箱，找东西时就现场拆箱。

●

LLM Wiki 像你已经把东西收纳进柜子，还贴好了标签和分类。

## 一、RAG 是什么

### 1.1 概念定义

RAG（Retrieval-Augmented Generation，检索增强生成）是一套 "先找资料，再做回答" 的技术方案。核心目标是解决大模型"幻觉""知识滞后""无法精准溯源"三大痛点，让 AI 的回答基于真实、可验证的文档资料。

一句话理解：RAG 就像考试前临时翻书的助教——你每问一个问题，它都说"等一下，我去资料堆里扒拉一下"，然后抓几页相关内容回来，现场给你拼一个答案。

### 1.2 核心含义

●

Retrieve（检索）：从向量库中检索与问题相关的文档碎片

●

Augment（增强）：将检索到的碎片作为上下文，增强大模型的回答质量

●

Generate（生成）：大模型基于检索到的碎片生成最终答案

关键特征：知识不被记住，每次查询都从零开始。知识像烟一样飘散，从不落地。

### 1.3 人话解释

RAG 的套路通常是：

●

你丢进去一堆资料，比如 PDF、网页、笔记、会议记录。

●

系统把这些资料切成一小块一小块。

●

你提问时，它先去这些碎片里找最相关的几段。

●

再把找回来的片段喂给 LLM，让它现场生成答案。

你每问一个问题，它都说：”你等等，我去资料堆里扒拉一下。” 然后抓几页相关内容回来，现场给你拼一个答案。它很能干，但有个问题：它每次都像第一次认识这些资料。

---

## 二、LLM Wiki 是什么

### 2.1 概念定义

LLM Wiki（Large Language Model Wiki）是一套 "先编译，再回答" 的知识服务范式。核心逻辑是：让大模型一次性通读所有原始文档，完整理解全局语义后，重构成一套结构化、互相关联的 Markdown 百科知识库，后续所有提问直接读取这套 Wiki，不再进行向量检索。

Karpathy 用编程类比：原始文档是源代码，Wiki 是编译产物。编译只做一次，后续所有程序都运行编译后的版本，而不是每次都重新编译。

一句话理解：LLM Wiki 像一个不知疲倦、还特别爱做双向链接的学霸笔记员——你给它文档，它不只写笔记，还会回头改旧笔记、补关联、标冲突，知识真的积累下来。

### 2.2 核心含义

●

Compile（编译）：一次性全局理解文档，提炼、整合、建立关联

●

Wiki（知识库）：构建结构化、互联的 Markdown 知识网络

●

Query（查询）：直接在 Wiki 内导航回答，不再检索原始文档

关键特征：知识被整理、吸收、沉淀为长期存在的结构，实现"知识复利"——越用越聪明。

### 2.3 人话解释

---

## 三、实现方式对比

### 3.1 RAG 的完整技术栈

RAG 是一套多层流水线，每个环节缺一不可：

<table><colgroup><col width="250"> <col width="250"> <col width="250"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>层级</p></td><td rowspan="1" colspan="1"><p>组件</p></td><td rowspan="1" colspan="1"><p>说明</p></td></tr><tr><td rowspan="1" colspan="1"><p>文档解析层</p></td><td rowspan="1" colspan="1"><p>MinerU 等</p></td><td rowspan="1" colspan="1"><p>将 PDF/Word/Excel 转为可处理文本</p></td></tr><tr><td rowspan="1" colspan="1"><p>分块层</p></td><td rowspan="1" colspan="1"><p>RecursiveCharacterTextSplitter 等</p></td><td rowspan="1" colspan="1"><p>切割文档为 Chunk（如 720 字/块，重叠 144 字）</p></td></tr><tr><td rowspan="1" colspan="1"><p>嵌入层</p></td><td rowspan="1" colspan="1"><p>BGE-M3 等</p></td><td rowspan="1" colspan="1"><p>将文本片段转为向量</p></td></tr><tr><td rowspan="1" colspan="1"><p>向量数据库层</p></td><td rowspan="1" colspan="1"><p>Milvus/Qdrant/Chroma</p></td><td rowspan="1" colspan="1"><p>存储向量，提供相似度检索</p></td></tr><tr><td rowspan="1" colspan="1"><p>精排层</p></td><td rowspan="1" colspan="1"><p>BGE-Reranker 等</p></td><td rowspan="1" colspan="1"><p>对 Top-K 结果打分排序，过滤噪声</p></td></tr><tr><td rowspan="1" colspan="1"><p>上下文管理层</p></td><td rowspan="1" colspan="1"><p>滑动窗口/Query重写</p></td><td rowspan="1" colspan="1"><p>管理多轮对话，避免上下文腐烂</p></td></tr><tr><td rowspan="1" colspan="1"><p>大模型生成层</p></td><td rowspan="1" colspan="1"><p>Qwen/GPT 等</p></td><td rowspan="1" colspan="1"><p>基于碎片+上下文生成最终回答</p></td></tr></tbody></table>

基础设施复杂度：高（需要分块器、Embedding 模型、向量数据库、Rerank 模型等全套组件）

### 3.2 LLM Wiki 的三层极简架构

LLM Wiki 刻意保持极简，只有三个核心文件夹：

<table><colgroup><col width="250"> <col width="250"> <col width="250"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>目录</p></td><td rowspan="1" colspan="1"><p>职责</p></td><td rowspan="1" colspan="1"><p>读写权限</p></td></tr><tr><td rowspan="1" colspan="1"><div><code>raw/</code></div></td><td rowspan="1" colspan="1"><p>原始资料层</p></td><td rowspan="1" colspan="1"><p>人类写入，LLM 只读</p></td></tr><tr><td rowspan="1" colspan="1"><div><code>schema.md</code></div></td><td rowspan="1" colspan="1"><p>规则配置层</p></td><td rowspan="1" colspan="1"><p>人类定义 Wiki 的"宪法"与 Workflow</p></td></tr><tr><td rowspan="1" colspan="1"><div><code>wiki/</code></div></td><td rowspan="1" colspan="1"><p>编译知识层</p></td><td rowspan="1" colspan="1"><p>LLM 写入，人类只读</p></td></tr></tbody></table>

三大核心操作：

1.

Ingest（摄入与编译）：新资料进来时，LLM 完成理解→提炼→整合→建立关联的完整编译，一次摄入可能牵动 10-15 个 Wiki 页面

2.

Query（导航与查询）：不再翻阅原始文档，直接在结构化 Wiki 中穿梭导航

3.

Lint（自我修复）：自动体检孤儿页、断链、矛盾声明、过期信息

基础设施复杂度：极简（文件系统 + Markdown + LLM Agent，无需向量库/Embedding/Rerank）

### 3.3 架构差异一览

<table><colgroup><col width="250"> <col width="250"> <col width="250"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>维度</p></td><td rowspan="1" colspan="1"><p>RAG</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识组装时机</p></td><td rowspan="1" colspan="1"><p>查询时（Query-time）</p></td><td rowspan="1" colspan="1"><p>摄入时（Compile-time）</p></td></tr><tr><td rowspan="1" colspan="1"><p>状态性</p></td><td rowspan="1" colspan="1"><p>无状态，每次从零推导</p></td><td rowspan="1" colspan="1"><p>有状态，知识持续积累</p></td></tr><tr><td rowspan="1" colspan="1"><p>基础设施</p></td><td rowspan="1" colspan="1"><p>笨重（向量数据库 + Embedding + Rerank）</p></td><td rowspan="1" colspan="1"><p>极简（文件系统 + Markdown）</p></td></tr><tr><td rowspan="1" colspan="1"><p>文档处理</p></td><td rowspan="1" colspan="1"><p>碎片化切割，语义割裂</p></td><td rowspan="1" colspan="1"><p>全文理解，重构知识</p></td></tr><tr><td rowspan="1" colspan="1"><p>检索方式</p></td><td rowspan="1" colspan="1"><p>向量检索 + 精排</p></td><td rowspan="1" colspan="1"><p>直接导航 Wiki 页面</p></td></tr><tr><td rowspan="1" colspan="1"><p>调参复杂度</p></td><td rowspan="1" colspan="1"><p>极高（分块大小/Top-K/阈值/模型选型）</p></td><td rowspan="1" colspan="1"><p>极低（几乎无需调参）</p></td></tr><tr><td rowspan="1" colspan="1"><p>增量更新</p></td><td rowspan="1" colspan="1"><p>追加分块→向量化→入库，无知识关联</p></td><td rowspan="1" colspan="1"><p>增量编译，自动更新关联知识网络</p></td></tr></tbody></table>

---

## 四、核心区别深度剖析

### 4.1 核心思想：Retrieve vs Compile

<table><colgroup><col width="250"> <col width="250"> <col width="250"></colgroup><tbody><tr><td rowspan="1" colspan="1"></td><td rowspan="1" colspan="1"><p>RAG</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>本质</p></td><td rowspan="1" colspan="1"><p>"我不理解全文，我只搜相关原文块，拼给大模型看"</p></td><td rowspan="1" colspan="1"><p>"我先读懂所有资料，再写一本百科，以后直接翻百科回答"</p></td></tr><tr><td rowspan="1" colspan="1"><p>类比</p></td><td rowspan="1" colspan="1"><p>临时翻书找答案的学生</p></td><td rowspan="1" colspan="1"><p>提前吃透教材、整理好笔记的学生</p></td></tr><tr><td rowspan="1" colspan="1"><p>比喻</p></td><td rowspan="1" colspan="1"><p>家里一堆快递箱，找东西现场拆箱</p></td><td rowspan="1" colspan="1"><p>东西已收纳进柜子，贴好标签和分类</p></td></tr></tbody></table>

### 4.2 知识形态：零散碎片 vs 互联知识网络

●

RAG：知识是零散文本碎片，碎片之间无关联，无法跨文档推理，知识无法沉淀、无法复用

●

LLM Wiki：知识是结构化互联网络，每个页面有双向超链接，形成知识图谱，新增文档自动更新关联，实现"知识复利"

### 4.3 溯源与合规：强溯源 vs 弱溯源

●

RAG：强溯源、强合规。每个碎片可追溯到原始文档的具体位置，满足企业合规审计需求

●

LLM Wiki：弱溯源、弱合规。Wiki 是大模型重写后的二次知识，原始细节可能被平滑、概括、微调，难以精确溯源

> 这是 LLM Wiki 最大的短板，直接限制了它在企业合规场景中的应用。金融合规制度查询、表格参数保真等场景，RAG 依然不可替代。

### 4.4 幻觉风险：单次 vs 系统性

●

RAG：幻觉仅影响单次回答，下次查询重新检索

●

LLM Wiki：一旦错误信息编译进 Wiki，会通过交叉引用扩散到整个知识库，形成"幻觉固化"。缓解策略：定期 Lint 检查矛盾声明、对关键结论建立 confidence 标注、每页保留 sources 字段

### 4.5 跨文档推理能力

●

RAG：能力弱，只能检索与问题直接相关的碎片，无法关联跨文档知识

●

LLM Wiki：能力强，原生支持跨文档推理，编译阶段已将跨文档知识关联整合

### 4.6 知识的生命周期

●

RAG：不积累，答案留在聊天记录里，知识无复利

●

LLM Wiki：知识持续积累，一次好的探索分析可以写回 Wiki，下次查询更快更准。社区 v2 方案还为每条事实加了置信度得分与时间戳，置信度随时间衰减、随多来源佐证增强

---

## 五、使用场景对比

### 5.1 适合 RAG 的场景

●

企业内网知识库、合规制度查询系统

●

客服 FAQ、内部文档搜索

●

表格参数问答、原始数据保真场景

●

金融/政务/工业等需要合规溯源的场景

●

海量文档（百万级 token）的高并发服务

●

多用户协作、权限管理的企业场景

●

需要毫秒级实时更新的场景

### 5.2 适合 LLM Wiki 的场景

●

个人笔记、论文阅读、知识管理

●

长期研究项目（≤100 篇文章，≤40 万字）

●

需要跨文档综合推理的知识密集型任务

●

对部署成本敏感、希望零服务器的场景

●

非溯源轻量知识库

●

团队 Wiki 知识沉淀

### 5.3 不适合 LLM Wiki 的场景

●

超大规模知识库（>100 万 token），索引无法装入上下文窗口

●

多用户协作并发场景，纯文件系统缺乏权限控制和并发写保护

●

实时更新需求（毫秒级同步），Ingest 编译需要时间

●

高度敏感数据，纯文本方案缺乏原生加密层

### 5.4 场景选择速查表

<table><colgroup><col width="375"> <col width="375"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>场景特征</p></td><td rowspan="1" colspan="1"><p>推荐</p></td></tr><tr><td rowspan="1" colspan="1"><p>快速接入文档做问答</p></td><td rowspan="1" colspan="1"><p>RAG</p></td></tr><tr><td rowspan="1" colspan="1"><p>长期研究，知识复利</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>需要"能回答"，不需要"能沉淀"</p></td><td rowspan="1" colspan="1"><p>RAG</p></td></tr><tr><td rowspan="1" colspan="1"><p>跨文档、跨概念综合问题</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>合规溯源、原文保真</p></td><td rowspan="1" colspan="1"><p>RAG</p></td></tr><tr><td rowspan="1" colspan="1"><p>个人知识库、笔记系统</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>海量文档 + 高并发</p></td><td rowspan="1" colspan="1"><p>RAG</p></td></tr><tr><td rowspan="1" colspan="1"><p>小主题深挖（≤20 篇）</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>打个比方</p></td><td rowspan="1" colspan="1"><p>RAG 是租房（拎包入住，快）/ LLM Wiki 是装修自己的房子（前期麻烦，住久顺手）</p></td></tr></tbody></table>

---

## 六、技术实现关键细节

### 6.1 RAG 的固有痛点

1.

碎片化绝症：无论如何优化分块，都无法避免语义割裂、表格断裂

2.

召回率与精确率死循环：调大 Top-K → 噪声增多；调小 Top-K → 漏检

3.

知识零复利：每次查询从零检索，检索结果不沉淀不复用

4.

跨文档推理无能：只能检索直接相关碎片，无法关联跨文档知识

5.

调参地狱：分块大小/重叠度/Top-K/阈值/Embedding/Rerank 需大量调试

6.

多轮上下文腐烂：远古对话占 Token，挤压知识库内容

### 6.2 LLM Wiki 全局编译的 6 步流程

1.

Raw 层归档：原始文档放入 `raw/` 目录，只读不修改

2.

全文通读：Agent 大模型一次性加载全部原始文档，形成全局语义认知

3.

知识抽取与本体建模：提取核心实体/概念/关系，统一歧义术语，合并同义知识点

4.

页面拆分与结构化重写：按"概念/主题"建页（而非按原文段落切块），生成 Markdown 页面

5.

全局交叉链接构建：自动添加双向超链接，形成知识图谱

6.

冲突检测与知识库固化：矛盾校验、溯源锚点、冗余清洗，固化到 `wiki/` 目录

### 6.3 LLM Wiki 的增量编译

新增文档时不是全量重编，而是：

1.

新文档放入 `raw/` ，Agent 仅通读新文档

2.

检索已有 Wiki，分析新文档与现有知识的关联

3.

新增概念→新建页面；更新旧概念→修改页面；冲突→标注提醒

4.

旧页面无需全部重建，只改动关联节点

### 6.4 衔接技术：Chroma Context-1 检索智能体

作为两大范式的"中间枢纽"，Context-1 保留 RAG 的强溯源优势，融入 LLM Wiki 的全局语义理解能力：

●

智能 Query 重写与意图理解（解决多轮歧义）

●

动态上下文管理与 Token 智能裁剪（解决上下文腐烂）

●

自适应召回与精排联动（解决调参地狱）

●

溯源锚点原生集成（守住合规底线）

●

与 LLM Wiki 无缝联动（概念理解走 Wiki，参数查询走 RAG）

---

## 七、未来趋势：从博弈到融合

行业终局绝非"RAG 被淘汰"或"Wiki 一统天下"，而是 RAG 底座 + Wiki 上层 + 智能 Agent 枢纽 的大一统融合架构：

●

RAG 持续优化：长上下文 Embedding 普及、混合检索标配、Rerank 原生集成、多轮上下文智能化、溯源锚点成硬性底线

●

LLM Wiki 补齐短板：增量编译精细化、Wiki 原生补齐溯源锚点、知识网络自主演化

●

个人场景 Wiki 化：90% 个人 AI 知识库将转向 Wiki 架构

●

企业场景融合化：RAG 做底层保真底座，Wiki 做上层知识大脑，Agent 做智能分流

---

## 八、总结

![](https://oss-ata.alibaba.com/article/2026/04/70f09be0-d566-46c4-a5da-828dfccb7a1c.png) ![](https://oss-ata.alibaba.com/article/2026/04/33ed8ad3-e26f-41ae-972e-adb052feff91.png)

<table><colgroup><col width="250"> <col width="250"> <col width="250"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>对比维度</p></td><td rowspan="1" colspan="1"><p>RAG</p></td><td rowspan="1" colspan="1"><p>LLM Wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>核心思想</p></td><td rowspan="1" colspan="1"><p>Retrieve（检索），按需捞碎片</p></td><td rowspan="1" colspan="1"><p>Compile（编译），全局建知识</p></td></tr><tr><td rowspan="1" colspan="1"><p>文档处理</p></td><td rowspan="1" colspan="1"><p>切碎分块，语义割裂</p></td><td rowspan="1" colspan="1"><p>全文理解，重构知识</p></td></tr><tr><td rowspan="1" colspan="1"><p>基础设施</p></td><td rowspan="1" colspan="1"><p>分块器+Embedding+向量库+Rerank</p></td><td rowspan="1" colspan="1"><p>仅需 LLM Agent+文件系统+Markdown</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识形态</p></td><td rowspan="1" colspan="1"><p>零散文本碎片，无关联</p></td><td rowspan="1" colspan="1"><p>结构化互联知识网络，有复利</p></td></tr><tr><td rowspan="1" colspan="1"><p>溯源能力</p></td><td rowspan="1" colspan="1"><p>强溯源、强合规</p></td><td rowspan="1" colspan="1"><p>弱溯源、二次知识可能失真</p></td></tr><tr><td rowspan="1" colspan="1"><p>跨文档推理</p></td><td rowspan="1" colspan="1"><p>弱</p></td><td rowspan="1" colspan="1"><p>强</p></td></tr><tr><td rowspan="1" colspan="1"><p>调参复杂度</p></td><td rowspan="1" colspan="1"><p>极高</p></td><td rowspan="1" colspan="1"><p>极低</p></td></tr><tr><td rowspan="1" colspan="1"><p>幻觉影响</p></td><td rowspan="1" colspan="1"><p>单次回答</p></td><td rowspan="1" colspan="1"><p>可能系统性扩散</p></td></tr><tr><td rowspan="1" colspan="1"><p>增量更新</p></td><td rowspan="1" colspan="1"><p>追加分块入库，无知识关联</p></td><td rowspan="1" colspan="1"><p>增量编译，自动更新知识网络</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识积累</p></td><td rowspan="1" colspan="1"><p>不积累</p></td><td rowspan="1" colspan="1"><p>持续积累，越用越聪明</p></td></tr><tr><td rowspan="1" colspan="1"><p>适用规模</p></td><td rowspan="1" colspan="1"><p>海量文档、企业级</p></td><td rowspan="1" colspan="1"><p>小到中等规模、个人/小团队</p></td></tr><tr><td rowspan="1" colspan="1"><p>部署难度</p></td><td rowspan="1" colspan="1"><p>高</p></td><td rowspan="1" colspan="1"><p>低</p></td></tr><tr><td rowspan="1" colspan="1"><p>本质类比</p></td><td rowspan="1" colspan="1"><p>临时翻书的助教</p></td><td rowspan="1" colspan="1"><p>持续维护笔记的研究助理</p></td></tr></tbody></table>

> 最值得记住的一点：两者最大的区别，不是有没有检索，而是知识有没有被真正整理、吸收、沉淀成一个长期存在的结构。RAG 回答的是这一次问题，LLM Wiki 维护的是你长期的理解。

---

## 九、实践

目前收钱码团队已经在实践过程中

[从文档到知识，我们团队的LLMWIKI构建实践](https://ata.atatech.org/articles/12020627219?utm_source=dingtalk&utm_medium=userShare&utm_campaign=077526)

END

一、RAG 是什么

1.1 概念定义

1.2 核心含义

1.3 人话解释

二、LLM Wiki 是什么

2.1 概念定义

2.2 核心含义

2.3 人话解释

三、实现方式对比

3.1 RAG 的完整技术栈

3.2 LLM Wiki 的三层极简架构

3.3 架构差异一览

四、核心区别深度剖析

4.1 核心思想：Retrieve vs Compile

4.2 知识形态：零散碎片 vs 互联知识网络

4.3 溯源与合规：强溯源 vs 弱溯源

4.4 幻觉风险：单次 vs 系统性

4.5 跨文档推理能力

4.6 知识的生命周期

五、使用场景对比

5.1 适合 RAG 的场景

5.2 适合 LLM Wiki 的场景

5.3 不适合 LLM Wiki 的场景

5.4 场景选择速查表

六、技术实现关键细节

6.1 RAG 的固有痛点

6.2 LLM Wiki 全局编译的 6 步流程

6.3 LLM Wiki 的增量编译

6.4 衔接技术：Chroma Context-1 检索智能体

七、未来趋势：从博弈到融合

八、总结

九、实践

有什么问题，和我聊聊吧～

**

内部资料

INTERNAL

334273