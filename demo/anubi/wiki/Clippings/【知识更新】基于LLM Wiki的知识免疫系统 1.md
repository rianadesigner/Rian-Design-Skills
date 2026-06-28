---
title: "【知识更新】基于LLM Wiki的知识免疫系统"
source: "https://ata.atatech.org/articles/12020644442?spm=ata.23639746.0.0.3fa762aay8tZ8j"
author:
published:
created: 2026-06-16
description:
tags:
  - "clippings"
---
蚂蚁集团

粉丝 1影响力 58

** 4

** 4

** 1

** 原创文章

** AI辅助润色 10%

**

[王琪(阿珐)](https://ata.atatech.org/users/12000946823)

5月21日发表174次浏览

** 朗读

** 字号

** 笔记

** 分享 **

朗读文章39:35

**

## 一、课题背景

### 1.1 问题现状

![](https://oss-ata.alibaba.com/article/2026/05/d0f62949-c9c7-4d83-8d58-f6e20c2ecf4b.png)

> 📖 场景故事 交付小李查"接口调用规范"，AI返回半年前已下线的文档。开发返工3天，骂了AI一星期。 为什么？因为知识库是"静态快照"，不是"活体系统"。 知识更新慢于业务变更，AI就是个历史博物馆。

在 AI Agent 系统快速发展的背景下，知识管理更新面临三大核心挑战：

<table><colgroup><col width="94"> <col width="348"> <col width="342"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>挑战</p></td><td rowspan="1" colspan="1"><p>具体表现</p></td><td rowspan="1" colspan="1"><p>影响</p></td></tr><tr><td rowspan="1" colspan="1"><p>多源割裂</p></td><td rowspan="1" colspan="1"><p>语雀、Dima、会议纪要等数据源分散</p></td><td rowspan="1" colspan="1"><p>变更源头无法统一追踪，知识更新出现盲区</p></td></tr><tr><td rowspan="1" colspan="1"><p>时效性缺失</p></td><td rowspan="1" colspan="1"><p>知识库静态快照，无法感知源文档变更</p></td><td rowspan="1" colspan="1"><p>旧知识误用，决策依据过时</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识堆积</p></td><td rowspan="1" colspan="1"><p>传统 RAG 方案知识只增不改，新旧版本堆积共存</p></td><td rowspan="1" colspan="1"><p>更新时无法定位替换内容，过时知识持续被引用</p></td></tr></tbody></table>

### 1.2 核心洞察

三大挑战的共性根因在于：传统方案将知识视为"存好即止"的静态资产，而业务在持续演进——知识必须跟着变。既然问题出在"知识不更新"，解法就必须让知识具备自我更新的能力。而 LLM 天然具备理解语义、判断新旧、合并改写的能力——它不只是检索工具，更是理想的知识编辑器。

Andrej Karpathy 将这一思路提炼为 LLM Wiki 方法论：

> "LLM 不只是搜索引擎，它是一个可以持续编辑和维护 Wiki 的智能编辑器。"

传统主流方案 RAG恰恰停留在"检索"层面——对照来看，差异一目了然：

<table><colgroup><col width="99"> <col width="229"> <col width="293"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>维度</p></td><td rowspan="1" colspan="1"><p>传统 RAG</p></td><td rowspan="1" colspan="1"><p>基于LLM Wiki的知识免疫系统</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识形态</p></td><td rowspan="1" colspan="1"><p>静态快照，入库即固化</p></td><td rowspan="1" colspan="1"><p>Living Document，持续演化</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识写入</p></td><td rowspan="1" colspan="1"><p>只增不改，新旧版本共存</p></td><td rowspan="1" colspan="1"><p>语义去重，新知识自动合并或替换旧知识</p></td></tr><tr><td rowspan="1" colspan="1"><p>过期处理</p></td><td rowspan="1" colspan="1"><p>无机制，旧知识永久留存</p></td><td rowspan="1" colspan="1"><p>衰减检测，过期知识自动降权归档</p></td></tr><tr><td rowspan="1" colspan="1"><p>变更感知</p></td><td rowspan="1" colspan="1"><p>无，源文档改了知识库不知道</p></td><td rowspan="1" colspan="1"><p>自动监测源文档变更，5分钟内同步</p></td></tr></tbody></table>

### 1.3 业务场景

设备保证金领域知识库建设：

●

覆盖保证金缴纳、扣罚、回退、账单等 9 期业务迭代

●

整合语雀系分文档、Dima 工作项、钉钉会议纪要

●

支撑灵矽Agent 「保证金资金基础答疑助手」

## 二、核心挑战

### 2.1 技术挑战

![](https://oss-ata.alibaba.com/article/2026/05/60099c67-2f8d-46af-9ea2-e55b688e9cef.png)

<table><colgroup><col width="170"> <col width="310"> <col width="255"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>挑战</p></td><td rowspan="1" colspan="1"><p>核心问题</p></td><td rowspan="1" colspan="1"><p>解法</p></td></tr><tr><td rowspan="1" colspan="1"><p>变更感知与多源同步</p></td><td rowspan="1" colspan="1"><p>异构数据源分散，变更无法感知与及时同步</p></td><td rowspan="1" colspan="1">●<p>构建流式知识更新管道</p>●<p>监听/定时任务感知变更</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识更新而非堆积</p></td><td rowspan="1" colspan="1"><p>新旧版本共存，过时知识持续被引用</p></td><td rowspan="1" colspan="1">●<p>语义去重判断新建/更新版本</p>●<p>递增替代重复创建</p>●<p>跨文档关联联动更新</p></td></tr><tr><td rowspan="1" colspan="1"><p>更新质量与可信度保障</p></td><td rowspan="1" colspan="1"><p>LLM 自动更新的内容不可信</p></td><td rowspan="1" colspan="1">●<p>置信度门控</p>●<p>分级审核策略</p></td></tr><tr><td rowspan="1" colspan="1"><p>更新能力如何对外提供</p></td><td rowspan="1" colspan="1"><p>知识库如何托管/运维/使用</p></td><td rowspan="1" colspan="1"><p>维护与使用解耦：</p>●<p>homi 插件管理 + Git 仓库托管</p>●<p>下游系统通过 MCP/SKILL 消费</p></td></tr></tbody></table>

### 2.2 关键指标

<table><colgroup><col width="105"> <col width="135"> <col width="120"> <col width="210"> <col width="68"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>指标类型</p></td><td rowspan="1" colspan="1"><p>具体指标</p></td><td rowspan="1" colspan="1"><p>目标值</p></td><td rowspan="1" colspan="1"><p>当前值</p></td><td rowspan="1" colspan="1"><p>状态</p></td></tr><tr><td rowspan="1" colspan="1"><p>数据源覆盖</p></td><td rowspan="1" colspan="1"><p>支持数据源种类</p></td><td rowspan="1" colspan="1"><p>≥3 种</p></td><td rowspan="1" colspan="1"><p>语雀/钉钉会议纪要/Dima</p></td><td rowspan="1" colspan="1"><p>🟢</p></td></tr><tr><td rowspan="1" colspan="1"><p>时效指标</p></td><td rowspan="1" colspan="1"><p>知识更新时效</p></td><td rowspan="1" colspan="1"><p>≤10 min</p></td><td rowspan="1" colspan="1"><p>5 min 周期更新</p></td><td rowspan="1" colspan="1"><p>🟢</p></td></tr><tr><td rowspan="1" colspan="1"><p>覆盖指标</p></td><td rowspan="1" colspan="1"><p>知识库覆盖度</p></td><td rowspan="1" colspan="1"><p>≥90%</p></td><td rowspan="1" colspan="1"><p>保证金领域 ≥90%</p></td><td rowspan="1" colspan="1"><p>🟢</p></td></tr><tr><td rowspan="1" colspan="1"><p>准确指标</p></td><td rowspan="1" colspan="1"><p>知识提炼准确率</p></td><td rowspan="1" colspan="1"><p>≥85%</p></td><td rowspan="1" colspan="1"><p>保证金领域 ≥90%</p></td><td rowspan="1" colspan="1"><p>🟢</p></td></tr></tbody></table>

## 三、技术方案

### 3.1 整体设计

#### 3.1.1 llm-wiki 插件命令与职责

<table><colgroup><col width="78"> <col width="276"> <col width="402"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>命令</p></td><td rowspan="1" colspan="1"><p>核心职责</p></td><td rowspan="1" colspan="1"><p>关键区别</p></td></tr><tr><td rowspan="1" colspan="1"><p>setup</p></td><td rowspan="1" colspan="1"><p>初始化知识库目录结构和配置</p></td><td rowspan="1" colspan="1"><p>一次性执行，创建 raw/、wiki/、.llm-wiki/ 目录</p></td></tr><tr><td rowspan="1" colspan="1"><p>harvest</p></td><td rowspan="1" colspan="1"><p>从多源抓取原始内容</p></td><td rowspan="1" colspan="1"><p>只写入raw/，不做提炼，支持 --watch 定时监听</p></td></tr><tr><td rowspan="1" colspan="1"><p>refine</p></td><td rowspan="1" colspan="1"><p>提炼raw/内容, 生成结构化wiki条目</p></td><td rowspan="1" colspan="1"><p>输出到wiki/，生成 frontmatter 和 wiki-link</p></td></tr><tr><td rowspan="1" colspan="1"><p>compile</p></td><td rowspan="1" colspan="1"><p>全库质量检查与优化</p></td><td rowspan="1" colspan="1"><p>不修改内容，只检测：重复、孤立页、洞察建议</p></td></tr><tr><td rowspan="1" colspan="1"><p>publish</p></td><td rowspan="1" colspan="1"><p>审核 _inbox/ 并发布到 wiki/</p></td><td rowspan="1" colspan="1"><p>人工审核低确信度内容，personal 自动过，team 强制审</p></td></tr><tr><td rowspan="1" colspan="1"><p>lint</p></td><td rowspan="1" colspan="1"><p>健康检查：死链、孤立页、碎片页</p></td><td rowspan="1" colspan="1"><p>生成健康报告，支持自动修复</p></td></tr></tbody></table>

#### 3.1.2 wiki 结构与 kind 分类

目录结构

wiki/

├── entities/ # 实体：系统、接口、产品

├── concepts/ # 概念：业务规则、设计模式

├── comparisons/ # 对比：方案、版本差异

├── queries/ # 综合分析：跨文档问答

└── \_inbox/ # 待审核区（低确信度内容）

kind 区分原则

<table><colgroup><col width="106"> <col width="175"> <col width="173"> <col width="228"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>kind</p></td><td rowspan="1" colspan="1"><p>记什么</p></td><td rowspan="1" colspan="1"><p>不记什么</p></td><td rowspan="1" colspan="1"><p>去重策略</p></td></tr><tr><td rowspan="1" colspan="1"><p>entity</p></td><td rowspan="1" colspan="1"><p>可独立存在的"事物"</p></td><td rowspan="1" colspan="1"><p>临时方案、已下线功能</p></td><td rowspan="1" colspan="1"><p>同名/同概念 → 更新</p></td></tr><tr><td rowspan="1" colspan="1"><p>concept</p></td><td rowspan="1" colspan="1"><p>需要解释的"抽象"</p></td><td rowspan="1" colspan="1"><p>通用常识</p></td><td rowspan="1" colspan="1"><p>同概念不同粒度 → 共存+链接</p></td></tr><tr><td rowspan="1" colspan="1"><p>comparison</p></td><td rowspan="1" colspan="1"><p>多事物对比</p><p>（六期vs七期架构）</p></td><td rowspan="1" colspan="1"><p>主观优劣判断</p></td><td rowspan="1" colspan="1"><p>对比对象重叠 → 合并</p></td></tr><tr><td rowspan="1" colspan="1"><p>query</p></td><td rowspan="1" colspan="1"><p>跨文档综合分析</p><p>（FAQ、全景指南）</p></td><td rowspan="1" colspan="1"><p>单一文档能回答的问题</p></td><td rowspan="1" colspan="1"><p>主题重叠 → 合并为更全面分析</p></td></tr></tbody></table>

#### 3.1.3 核心设计原则

●

生产与消费解耦：llm-wiki 插件负责知识生产（harvest→publish），下游通过 MCP/SKILL

●

消费Git 托管：产出物通过 Git 托管，wiki/ 目录作为结构化知识的标准格式，版本控制、变更追溯

●

运维即代码：插件统一管理，配置即代码，Git 记录完整变更历史

![](https://oss-ata.alibaba.com/article/2026/05/801d0422-4354-403d-879e-3d61ec3fda14.png)

### 3.2 关键实现

#### 3.2.1 变更感知与多源同步

通过构建流式知识更新管道实现异构数据源的变更感知与及时同步。

核心设计原则：

●

变更驱动，而非全量轮询：管道由变更事件驱动——updated\_at 变化、新 commit、新会议纪要——而非定时全量重跑，保证时效性同时避免冗余计算

●

异构适配，统一管道：语雀、Dima、钉钉会议、Git 仓库各有变更检测策略，但变更一旦检出，统一进入 raw → refine → compile → publish 管道

●

级联传播，分钟级闭环：源变更自动级联下游——新 raw → refine，新 wiki → compile，新 live → publish——从变更到知识更新分钟级闭环

变更流转：

数据源变更检出

│

├─ 新增 → harvest → raw/

├─ 更新 → 增量 harvest → raw/ 版本递增

└─ 删除 → 标记 deprecated → 触发衰减检测

│

▼ 自动级联

refine → compile → publish

│

▼

状态持久化（断点续传）

分层存储：

<table><colgroup><col width="129"> <col width="137"> <col width="156"> <col width="217"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>层级</p></td><td rowspan="1" colspan="1"><p>目录</p></td><td rowspan="1" colspan="1"><p>特性</p></td><td rowspan="1" colspan="1"><p>说明</p></td></tr><tr><td rowspan="1" colspan="1"><p>原始层</p></td><td rowspan="1" colspan="1"><p>raw/</p></td><td rowspan="1" colspan="1"><p>只增不改</p></td><td rowspan="1" colspan="1"><p>保留溯源，支持重新提炼</p></td></tr><tr><td rowspan="1" colspan="1"><p>知识层</p></td><td rowspan="1" colspan="1"><p>wiki/</p></td><td rowspan="1" colspan="1"><p>Living Document</p></td><td rowspan="1" colspan="1"><p>AI 持续编辑，版本递增</p></td></tr></tbody></table>

监听机制：

\# 启动 Watch 模式 /llm-wiki:harvest --watch

每个数据源维护独立状态并持久化：

●

指数退避：5m → 10m → 20m，3 次重试后标记 failed

●

冷却期：10 分钟内同一 source 不重复处理（防抖）

●

优雅停止：Ctrl+C 时保存状态为 stopped，下次可断点续传

#### 3.2.2 知识更新而非堆积

通过语义去重判断新建/更新、版本递增替代重复创建、跨文档关联联动更新，实现知识持续精炼而非无限堆积。

核心设计原则：

●

语义去重，而非标题去重：同名文档可能是不同概念，不同标题可能是同一知识——只有 LLM 语义判断才能准确区分"新建"还是"更新"

●

版本递增，而非重复创建：同一知识的更新通过 version++ 写入原条目，而非新建条目——知识库只增价值，不增冗余

●

关联联动，而非孤立更新：更新一个条目时，通过 \[\[wiki-link\]\] 关联网络定位并提示相关条目是否需要同步更新

两阶段去重检测：

新文档输入

│

▼

阶段1: 轻量筛选（纯文本匹配，不调用 LLM）

├─ 标题相同或包含关系

├─ provenance 引用相同来源

└─ links 有 2+ 交集

│

▼ 筛出候选对

阶段2: LLM 语义精判

│

├─ create → 新建条目（无实质重复）

├─ update → 版本递增（新条目是超集）

├─ skip → 仅追加 provenance（无增量信息）

└─ merge → 人工合并（各有独特价值）

版本递增机制：

raw/ 层：原文更新 → 归档旧版本 → version++

raw/yuque/保证金缴纳.md (v2, 最新)

raw/yuque-archive/保证金缴纳-v1.md (归档)

wiki/ 层：语义去重判定 update → 合并增量内容 → version++

wiki/entities/保证金缴纳.md (v1 → v2, 合并增量信息)

跨文档关联联动：

更新条目 A

│

├─ 解析 A 的 \[\[wiki-link\]\] 网络

│ → A 引用了 B、C （下游依赖）

│ → D 引用了 A （上游影响）

│

▼ compile 阶段检测

├─ 孤立页面：无入站链接 → 可能需要补充关联

├─ 关联建议：A 更新后，B/C/D 是否需要同步更新

└─ 洞察生成：跨来源综合分析 → 新 query 条目

#### 3.2.3 更新质量与可信度

通过置信度门控与分级审核策略，确保 LLM 自动更新的内容可信可查。

确信度门控（Certainty Gate）：

frontmatter:

certainty: 0.0-1.0 # LLM 评估的置信度

scope: personal|team # 个人知识 vs 团队知识

stage: draft|live|archived # 生命周期阶段

复合置信度 = LLM 打分 × 源可信度 × 结构完整度 × 时效性

<table><colgroup><col width="94"> <col width="182"> <col width="447"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>因子</p></td><td rowspan="1" colspan="1"><p>校准什么</p></td><td rowspan="1" colspan="1"><p>典型值域</p></td></tr><tr><td rowspan="1" colspan="1"><p>LLM 打分</p></td><td rowspan="1" colspan="1"><p>内容清晰度与完整度</p></td><td rowspan="1" colspan="1"><p>0.85–0.95（几乎无区分度）</p></td></tr><tr><td rowspan="1" colspan="1"><p>源可信度</p></td><td rowspan="1" colspan="1"><p>数据源内在可靠性</p></td><td rowspan="1" colspan="1"><p>语雀 1.0 / 代码 1.0 / / 会议 0.7</p></td></tr><tr><td rowspan="1" colspan="1"><p>结构完整度</p></td><td rowspan="1" colspan="1"><p>提炼后内容的结构质量</p></td><td rowspan="1" colspan="1"><p>有标题+链接+来源+属性表 → 1.0 / 裸文本 → 0.2</p></td></tr><tr><td rowspan="1" colspan="1"><p>时效性</p></td><td rowspan="1" colspan="1"><p>源数据距今天数</p></td><td rowspan="1" colspan="1"><p>≤7天 1.0 / ≤30天 0.95 / ≤90天 0.85 / ≤180天 0.7 / 超期 0.5</p></td></tr></tbody></table>

分级决策：

![](https://oss-ata.alibaba.com/article/2026/05/6d7ef251-17b1-453d-b216-7590b3f93267.png)

#### 3.2.4 知识更新能力使用

通过维护与使用解耦的设计，让知识库托管/运维/使用各司其职。

配置流程：

![](https://oss-ata.alibaba.com/article/2026/05/8d3d2863-e5e6-4658-9c9f-f039ff7abc1e.png)

Skill运行时机制：

![](https://oss-ata.alibaba.com/article/2026/05/3f689f5e-4e4b-448e-bcc8-8dcadb5abee3.png)

## 四、场景实践-设备保证金

### 4.1 知识库管理

<table><colgroup><col width="131"> <col width="143"> <col width="133"> <col width="145"> <col width="142"> <col width="127"> <col width="126"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>知识库初始化</p></td><td rowspan="1" colspan="1"><p>知识收割</p></td><td rowspan="1" colspan="1"><p>知识提炼</p></td><td rowspan="1" colspan="1"><p>知识编译</p></td><td rowspan="1" colspan="1"><p>审核发布</p></td><td rowspan="1" colspan="1"><p>健康检查</p></td><td rowspan="1" colspan="1"><p>watch监听模式</p></td></tr><tr><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/de4b58da-dd2e-4644-adfe-4d0a21d79e5f.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/896aefe9-fa9f-43b8-b3c6-8415a1a19df6.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/5d8f9ca6-e941-4ab6-b9d9-4f3ba8c44371.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/638d73f6-1eb3-44bc-8a08-112fec410108.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/01a165fd-1111-46a8-9522-92cbda1409a1.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/8bf841b0-fedf-454b-b8be-1af21ba78694.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/adb3c51d-7ddb-4c3b-83c9-d971d117a3ba.png"></td></tr></tbody></table>

### 4.2 知识条目示例

Concepts（概念）: 保证金水位计算.md

Entity（实体）: 保证金.md

Comparison（对比）: 六期与七期架构演进对比.md

Query（综合分析）: 扣罚业务全景指南.md

### 4.3 Homi管理知识库

<table><colgroup><col width="214"> <col width="213"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>知识库健康检查</p></td><td rowspan="1" colspan="1"><p>定时任务配置</p></td></tr><tr><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/9e705771-6017-476c-b9fb-bb3e020b5d6b.png"></td><td rowspan="1" colspan="1"><img src="https://oss-ata.alibaba.com/article/2026/05/297f2943-38a3-4db1-ab5e-6d0f8183220f.png"></td></tr></tbody></table>

### 4.4 灵矽答疑 Agent 集成

wiki-query SKILL：

问答示例：

![](https://oss-ata.alibaba.com/article/2026/05/465740c2-b37e-4f7b-bdb3-d40c49411260.png) ![](https://oss-ata.alibaba.com/article/2026/05/85902ec2-bd5e-43bf-8786-8810f1b2b8a7.png)

## 五、未来规划

![](https://oss-ata.alibaba.com/article/2026/05/74e42f88-69e6-4263-b19e-50e4e0199371.png)

### 短期

#### 1\. 接入更多数据源，消除知识盲区

当前已支持语雀文档、Dima 工作项、会议纪要三类数据源，但知识的完整性受限于数据源覆盖范围。短期重点补齐代码侧的知识入口，代码即真相，校验 wiki 提炼的准确性。

●

新数据源遵循现有 harvest → refine → compile → publish 管道，无需改动下游流程

●

每个数据源独立配置 watch\_mode、poll\_interval、require\_review，复用 Watch 模式基础设施

●

AntCode 数据源作为高优先级，因为代码是技术领域最可靠的真相来源

#### 2\. 知识完备度与准确度自动评测

当前知识质量依赖 LLM 的 certainty 评分和人工 publish 审核，缺乏系统化的量化评测机制。需要接入评测机制，替代人工经验判断：

完备度评测：

●

Kind 分布均衡度：检查 entity/concept/comparison/query 四类条目的比例是否合理（如 entity 过多而 query 过少，说明提炼深度不够）

●

接入外部测评机制

准确度评测：

●

源文回溯校验：对每个 wiki 条目，回溯其 provenance 源文档，对比关键事实是否一致（LLM-as-Judge 模式）

●

交叉一致性检查：多个 wiki 条目引用同一源文档时，检查是否存在矛盾描述

●

时效性校验：结合现有 KnowledgeDecayRule机制，探索更优的差异化策略，对已衰减条目自动标记并触发重新提炼

### 中长期

#### 3\. 建立知识库基准——以代码为真相的评测与校准

核心问题：当前 wiki 知识全部由 LLM 从文档提炼生成，但文档本身可能过时、不一致甚至错误。没有"真相锚点"，就无法判断 wiki 条目中哪些是真实的、哪些是 LLM 幻觉或源文档偏差导致的错误。

设计思路：以领域代码仓库作为事实基准（Ground Truth），建立"代码→知识"的校准链路：

代码仓库（真相源）

│

├─ 静态分析 ──→ 代码事实集（API 签名、调用链、配置项、状态机）

│

▼

知识校准引擎 ──→ 对比 wiki 条目 vs 代码事实集

│

├─ ✅ 一致 → 标记为 verified，提升 certainty

├─ ⚠️ 冲突 → 生成校准报告，标记为 disputed

└─ ❌ 缺失 → 生成补全建议，进入缓冲区

#### 4\. 知识缓冲区——不确定知识的渐进式晋升机制

核心问题：当前 certainty 门控是二元决策——certainty ≥ 0.6 直接进 live，否则进 draft。但现实中大量知识处于"不确定但可能有价值"的灰色地带：单次提炼 certainty 低，但多个来源交叉印证后可信度上升。需要更精细的分级机制。

设计：三级知识空间

┌─────────────────────────────────────────────────────────────┐

│ wiki/live/ （正式知识） │

│ certainty ≥ 0.8 | verified by code | 人工审核通过 │

│ → 对外可见，Agent 可引用 │

├─────────────────────────────────────────────────────────────┤

│ wiki/buffer/ （缓冲区） │

│ certainty 0.4-0.79 | 单一来源 | 待校准 │

│ → 仅内部可见，不对外输出，积累证据后可晋升 │

├─────────────────────────────────────────────────────────────┤

│ wiki/draft/ （草稿区） │

│ certainty < 0.4 | LLM 低置信 | 待补充 │

│ → 待人工审核或新来源补充 │

└─────────────────────────────────────────────────────────────┘

晋升机制：

<table><colgroup><col width="77"> <col width="270"> <col width="487"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>晋升路径</p></td><td rowspan="1" colspan="1"><p>触发条件</p></td><td rowspan="1" colspan="1"><p>示例</p></td></tr><tr><td rowspan="1" colspan="1"><p>多源印证</p></td><td rowspan="1" colspan="1"><p>2+ 独立来源指向同一知识且内容一致</p></td><td rowspan="1" colspan="1"><p>语雀文档和会议纪要都提到"扣罚支持批量"，合并后 certainty 提升</p></td></tr><tr><td rowspan="1" colspan="1"><p>代码校准</p></td><td rowspan="1" colspan="1"><p>代码事实集验证通过</p></td><td rowspan="1" colspan="1"><p>缓冲区条目"扣罚幂等号=source+outBizNo+batchNo"代码确认后晋升</p></td></tr><tr><td rowspan="1" colspan="1"><p>时间积累</p></td><td rowspan="1" colspan="1"><p>在缓冲区存活超过 N 天且无冲突</p></td><td rowspan="1" colspan="1"><p>一条低 certainty 的概念解释，30 天内无衰减告警，自动晋升</p></td></tr><tr><td rowspan="1" colspan="1"><p>人工审核</p></td><td rowspan="1" colspan="1"><p>人工 review 通过</p></td><td rowspan="1" colspan="1"><p>领域专家确认缓冲区条目准确</p></td></tr></tbody></table>

降级机制：

<table><colgroup><col width="195"> <col width="462"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>降级路径</p></td><td rowspan="1" colspan="1"><p>触发条件</p></td></tr><tr><td rowspan="1" colspan="1"><p>代码校准降级</p></td><td rowspan="1" colspan="1"><p>代码事实与 live 条目冲突</p></td></tr><tr><td rowspan="1" colspan="1"><p>源文档撤回降级</p></td><td rowspan="1" colspan="1"><p>provenance 源文档被删除或标记为过时</p></td></tr><tr><td rowspan="1" colspan="1"><p>衰减降级</p></td><td rowspan="1" colspan="1"><p>超过衰减阈值且未更新（现有 KnowledgeDecayRule）</p></td></tr></tbody></table>

## 附录

### A. 相关链接

<table><colgroup><col width="117"> <col width="510"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>资源</p></td><td rowspan="1" colspan="1"><p>链接</p></td></tr><tr><td rowspan="1" colspan="1"><p>llim-wiki 插件</p></td><td rowspan="1" colspan="1"><p><a href="https://code.alipay.com/afa.wq/skills/blob/master/plugins/llm-wiki/README.md">https://code.alipay.com/afa.wq/skills/blob/master/plugins/llm-wiki/README.md</a></p></td></tr><tr><td rowspan="1" colspan="1"><p>保证金知识库</p></td><td rowspan="1" colspan="1"><p><a href="https://code.alipay.com/llm_wiki/bail_llm_wiki">https://code.alipay.com/llm_wiki/bail_llm_wiki</a></p></td></tr></tbody></table>

END

一、课题背景

1.1 问题现状

1.2 核心洞察

1.3 业务场景

二、核心挑战

2.1 技术挑战

2.2 关键指标

三、技术方案

3.1 整体设计

3.1.1 llm-wiki 插件命令与职责

3.1.2 wiki 结构与 kind 分类

3.1.3 核心设计原则

3.2 关键实现

3.2.1 变更感知与多源同步

3.2.2 知识更新而非堆积

3.2.3 更新质量与可信度

3.2.4 知识更新能力使用

四、场景实践-设备保证金

4.1 知识库管理

4.2 知识条目示例

4.3 Homi管理知识库

4.4 灵矽答疑 Agent 集成

五、未来规划

短期

1\. 接入更多数据源，消除知识盲区

2\. 知识完备度与准确度自动评测

中长期

3\. 建立知识库基准——以代码为真相的评测与校准

4\. 知识缓冲区——不确定知识的渐进式晋升机制

附录

A. 相关链接

有什么问题，和我聊聊吧～

**

内部资料

INTERNAL

334273