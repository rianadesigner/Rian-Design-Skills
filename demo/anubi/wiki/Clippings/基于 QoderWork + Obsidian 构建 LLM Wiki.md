---
title: "基于 QoderWork + Obsidian 构建 LLM Wiki"
source: "https://ata.atatech.org/articles/11020655638?spm=ata.23639746.0.0.3fa762aay8tZ8j"
author:
published:
created: 2026-06-16
description:
tags:
  - "clippings"
---
中国电商事业群-淘天集团

粉丝 4影响力 46

** 14

** 2

**

** 原创文章

** AI辅助优化 30%

**

[黄曦(鹿涤)](https://ata.atatech.org/users/11000293049)

6月3日发表6月3日更新195次浏览

** 朗读

** 字号

** 笔记

** 分享 **

朗读文章18:22

**

## 一、Karpathy 的 LLM Wiki 核心思想

### 一句话概括

2026 年 4 月，Andrej Karpathy 发了条推文，后来整理成一篇 gist。核心观点很简单：

> 别让 LLM 每次都从零翻书。让它替你维护一套持续更新的笔记。

我们平时用 AI 处理文档，本质上都是 RAG：上传文档 → 提问时检索片段 → 拼出答案。每次都从零开始，知识从不积累。NotebookLM、ChatGPT 的文件上传，都是这个路子——能用，但什么都没沉淀下来。

Karpathy 换了个思路：知识在进入系统的那一刻，就让它被理解、被重组、被交叉引用。LLM 不只是"检索员"，而是"知识库维护者"。

### 那个精辟的类比

> Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。

这么一说，角色分工就很清楚了：

●

我：选资料、提问题、定方向——产品经理

●

LLM：读资料、写摘要、维护交叉引用、标注矛盾——程序员

●

Obsidian：本地文件存储、双向链接、知识图谱——IDE

### 为什么这个模式能 work

> 维护知识库最烦的从来不是阅读或思考，而是"记账"——更新交叉引用、保持摘要最新、标记新旧冲突、在几十个页面间保持一致性。人类放弃 Wiki 是因为维护负担增长得比价值快。而 LLM 不会无聊，不会忘记更新，一次操作修改 15 个文件。

写笔记容易，但保持笔记之间的关联、更新过时的内容、维护标签体系——这些"脏活"让知识库最终变成信息坟场。

现在 LLM 把这些脏活全包了。维护成本趋近于零，Wiki 就能一直活着，知识就能产生复利。

### 三层架构和三个操作

这部分比较结构化，直接放表：

三层架构：

<table><colgroup><col width="162"> <col width="162"> <col width="162"> <col width="162"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>层级</p></td><td rowspan="1" colspan="1"><p>放什么</p></td><td rowspan="1" colspan="1"><p>谁管</p></td><td rowspan="1" colspan="1"><p>规则</p></td></tr><tr><td rowspan="1" colspan="1"><p>Raw Sources</p></td><td rowspan="1" colspan="1"><p>文章、论文、笔记</p></td><td rowspan="1" colspan="1"><p>我</p></td><td rowspan="1" colspan="1"><p>不可变，LLM 只读</p></td></tr><tr><td rowspan="1" colspan="1"><p>Wiki</p></td><td rowspan="1" colspan="1"><p>摘要页、概念页、实体页、分析页</p></td><td rowspan="1" colspan="1"><p>LLM</p></td><td rowspan="1" colspan="1"><p>LLM 随便写</p></td></tr><tr><td rowspan="1" colspan="1"><p>Schema</p></td><td rowspan="1" colspan="1"><p>配置文档，定义结构和规范</p></td><td rowspan="1" colspan="1"><p>我 + LLM</p></td><td rowspan="1" colspan="1"><p>一起迭代</p></td></tr></tbody></table>

三个操作：

<table><colgroup><col width="216"> <col width="216"> <col width="216"></colgroup><tbody><tr><td rowspan="1" colspan="1"><p>操作</p></td><td rowspan="1" colspan="1"><p>类比</p></td><td rowspan="1" colspan="1"><p>干嘛的</p></td></tr><tr><td rowspan="1" colspan="1"><p>Ingest</p></td><td rowspan="1" colspan="1"><p>编译</p></td><td rowspan="1" colspan="1"><p>新素材进来 → 建摘要 → 更新概念/实体页 → 维护交叉引用 → 更新索引</p></td></tr><tr><td rowspan="1" colspan="1"><p>Query</p></td><td rowspan="1" colspan="1"><p>运行</p></td><td rowspan="1" colspan="1"><p>向 wiki 提问 → 读 index.md 定位 → 综合回答 → 好回答归档回 wiki</p></td></tr><tr><td rowspan="1" colspan="1"><p>Lint</p></td><td rowspan="1" colspan="1"><p>测试</p></td><td rowspan="1" colspan="1"><p>检查矛盾、孤儿页面、断链、缺失概念</p></td></tr></tbody></table>

---

## 二、我具体做了什么

### 第一步：写 agent.md

agent.md 是整个体系的"宪法"——告诉 AI 该怎么管理我的知识库。放在 Vault 根目录，我和 AI 一起维护。

下面是完整的 agent.md 内容，可以直接拿去用：

\# Agent 工作手册

\- \*\*人\*\*：精选资料、提出问题、探索发现、决定方向

\- \*\*AI\*\*：阅读资料、撰写摘要、维护交叉引用、更新索引、标注矛盾、处理记账工作

核心原则：\*\*知识库是一个持续积累的产物（compounding artifact）\*\*。每新增一份资料、每一次有价值的问答，都应该让知识库变得更丰富，而不是消失在聊天记录里。

\---

\## 1. 三层架构

\`\`\`

Obsidian Vault/

├── raw/ ← 原始资料层（不可变）

│ ├── articles/ ← ATA 文章、网页剪藏

│ ├── docs/ ← 产品文档、PRD、竞品资料

│ ├── notes/ ← 个人笔记、会议记录

│ └── assets/ ← 图片、附件

├── wiki/ ← Wiki 层（AI 拥有，自由读写）

│ ├── summaries/ ← 资料摘要页

│ ├── concepts/ ← 概念页（技术概念、业务概念）

│ ├── entities/ ← 实体页（产品、公司、人物）

│ ├── analyses/ ← 分析页（竞品对比、策略分析）

│ └── syntheses/ ← 综合页（主题综述、趋势判断）

├── index.md ← 内容索引（按分类列出所有 wiki 页面）

├── log.md ← 操作日志（追加式，记录每次操作）

└── agent.md ← 本文件（规则定义）

\`\`\`

\*\*层级规则：\*\*

| 层级 | 谁拥有 | 可读 | 可写 | 说明 |

| ---------- | ---- | ----- | ------- | ----------- |

| \`raw/\` | 人 | AI 只读 | AI 不可改 | 信息源头，保证可信 |

| \`wiki/\` | AI | 人可读 | AI 完全拥有 | 摘要、概念、分析、综合 |

| \`agent.md\` | 人+AI | 双方可读 | 双方可改 | 规则合约，共同迭代 |

\---

\## 2. 核心操作

\### 2.1 Ingest（摄入）

当人提供一份新资料时，AI 执行以下流程：

1\. \*\*阅读\*\*：完整阅读原始资料，提取关键信息

2\. \*\*讨论\*\*：与人确认核心观点和值得深挖的方向

3\. \*\*创建摘要页\*\*：在 \`wiki/summaries/\` 下创建该资料的摘要

4\. \*\*更新关联页\*\*：检查 wiki 中已有的概念页、实体页，更新或新建相关页面

5\. \*\*标注矛盾\*\*：如果新资料与已有内容冲突，用 \`⚠️ 矛盾\` 标注，等人确认

6\. \*\*更新索引\*\*：在 \`index.md\` 中添加新页面条目

7\. \*\*追加日志\*\*：在 \`log.md\` 中记录本次操作

一次摄入可能触及 10-15 个 wiki 页面——这是正常的，知识是网状扩散的。

\*\*批量摄入\*\*：多份资料可批量处理，但建议逐份确认摘要质量后再继续。

\### 2.2 Query（查询）

当人提出问题时，AI 执行以下流程：

1\. \*\*定位\*\*：先读 \`index.md\`，找到相关页面

2\. \*\*阅读\*\*：读取相关 wiki 页面（而非原始资料）

3\. \*\*综合\*\*：生成带引用的回答

4\. \*\*归档\*\*：如果回答有长期价值（对比分析、策略建议等），将其存回 \`wiki/analyses/\` 或 \`wiki/syntheses/\`，并更新索引

关键洞察：\*\*好的回答不应该消失在聊天记录里\*\*，它应该成为知识库的一部分。

\### 2.3 Lint（健康检查）

定期（或人要求时）对 wiki 进行健康检查：

\- \*\*矛盾检测\*\*：不同页面之间是否有冲突的说法

\- \*\*过时内容\*\*：是否有被更新资料取代的旧结论

\- \*\*孤儿页面\*\*：没有任何入链的页面（可能是被遗忘的知识）

\- \*\*缺失概念\*\*：被多次提及但没有独立页面的重要概念

\- \*\*缺失引用\*\*：应该建立但没有建立的交叉引用

\- \*\*知识缺口\*\*：建议需要补充的资料或需要探索的问题

\---

文件夹结构长这样：

Obsidian Vault/

├── raw/

│ ├── articles/ ← ATA 文章、网页剪藏

│ ├── docs/ ← 产品文档、PRD

│ ├── notes/ ← 个人笔记、会议记录

│ └── assets/ ← 图片、附件

├── wiki/

│ ├── summaries/ ← 资料摘要页

│ ├── concepts/ ← 概念页

│ ├── entities/ ← 实体页

│ ├── analyses/ ← 分析页

│ └── syntheses/ ← 综合页

├── index.md ← 内容索引（AI 查询入口）

├── log.md ← 操作日志

└── agent.md ← 规则合约

### 第二步：创建 index.md 和 log.md

index.md 是知识库的"目录地图"。AI 每次查询前先读它，就知道该去看哪些页面，不用遍历所有文件。log.md 是时间线，每次操作追加一条记录，方便回溯。

没有这两个文件，AI 就像进了一个没有目录的图书馆——书都在，但找起来要命。

### 第三步：写 QoderWork Skill

agent.md 写好了，但有个问题：每次开新对话，QoderWork 不会自动去读 agent.md。我得告诉它"去读这个文件、按这个规则来"，每次都重复一遍。

所以我写了个 `llm-wiki` Skill。有了它，我只需要说"导入这篇文章"或者"处理一下 raw 里那篇新文章"，Skill 就会自动读取 agent.md、了解当前状态、按流程执行、最后 Git 提交。

Skill 里定义了三条导入路径：

1.

ATA API：调接口拿文章 → 浏览器抓图片 → 保存 → 生成 wiki

2.

Web Clipper 清洗：我手动剪藏 → AI 清洗去噪、下载图片、补元数据 → 生成 wiki

3.

浏览器直接抓：丢个链接给 AI → 它自己打开页面提取 → 生成 wiki

### 第四步：初始化 Git

在 Vault 根目录 `git init` ，加了个 `.gitignore` 排除 Obsidian 的缓存和工作区文件，做了初始提交。

这一步很简单，但很重要。从此以后每次操作都有版本记录，改坏了随时回退。

### 第五步：跑通第一轮 Ingest

前面都是搭架子，这一步才是真正验证体系能不能用。我拿一篇 ATA 文章走了完整流程：原始资料存 raw、图片下载到 assets、创建摘要页和概念页、更新 index 和 log、Git 提交。

后来又用 Web Clipper 路径跑了一次，两条链路都验证通过了。

---

## 三、选型决策

搭的过程中有几个地方需要二选一，把我的结论和理由记一下。

### Git 管理：自建.git 还是用 Obsidian Git 插件？

我选了自建.git。

Obsidian Git 插件能自动定时提交，听起来很方便。但它的提交信息只能是"changed 5 files"这种，看不出做了什么。

我让 QoderWork 来管 Git，每次操作后自动提交，提交信息是语义化的。

区别在哪呢？当我需要回退的时候，看提交信息就知道该回到哪个版本，不用对着时间戳猜。而且我可以用自然语言问 QoderWork"上周导入了哪些文章"，它去翻 git log 告诉我。

### ATA 文章解析：API 抓取还是 Web Clipper？

两种都用，看场景。

我分别用两种方式导入了文章，对比下来：

API 抓取的好处是内容干净（只有正文，没有 UI 杂质）、元数据丰富（作者、部门、时间、阅读量都有）、图片能下载到本地。缺点是需要走完整流程，慢一些。

Web Clipper 的好处是快，一键剪藏。但问题是它会剪进来一堆 ATA 页面的 UI 元素（导航栏、评论区、作者信息卡），图片也只是远程链接没有本地化。

所以我的方案是：Web Clipper 快速剪藏 → 跟 QoderWork 说"处理一下" → 它自动清洗去噪、下载图片、补元数据、生成 wiki。追求质量的时候就直接走 API。

### 双链怎么加：全量加还是分层加？

只在 wiki 层内部加双链，raw 层不加。

一开始我在 raw 原始资料里也加了 `[[双链]]` ，结果 Graph View 里出现了重复节点——raw 文件是一个节点，wiki 摘要页是另一个节点，名字差不多，看着很乱。

后来想明白了：raw 是只读的素材，它的价值已经被 wiki 摘要页吸收了。摘要页的 frontmatter 里有 `sources` 字段指向原始资料，溯源关系已经有了。raw 里再加双链就是多此一举。

### agent.md 放哪：Vault 里还是 QoderWork 全局配置？

放 Vault 里。

agent.md 是知识库的一部分，不是某个工具的私有配置。放在 Vault 里，任何能访问这个目录的 AI 工具都能读。QoderWork 通过 Skill 来读它，以后换别的工具也能用。

---

## 四、最后说两句

搭这套体系的过程本身就在验证 Karpathy 说的那句话：知识库是一个持续复利的产物。

从 agent.md 第一版，到文件夹结构，到 Skill，到两轮 Ingest，到发现双链问题然后改规则——每一步都建立在前一步上面。

END

一、Karpathy 的 LLM Wiki 核心思想

一句话概括

那个精辟的类比

为什么这个模式能 work

三层架构和三个操作

二、我具体做了什么

第一步：写 agent.md

第二步：创建 index.md 和 log.md

第三步：写 QoderWork Skill

第四步：初始化 Git

第五步：跑通第一轮 Ingest

三、选型决策

Git 管理：自建.git 还是用 Obsidian Git 插件？

ATA 文章解析：API 抓取还是 Web Clipper？

双链怎么加：全量加还是分层加？

agent.md 放哪：Vault 里还是 QoderWork 全局配置？

四、最后说两句

**

**

有什么问题，和我聊聊吧～

**

内部资料

INTERNAL

334273