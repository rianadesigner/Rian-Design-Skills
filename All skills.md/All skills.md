---
name: design-skill-router
description: 统一设计技能路由表（1–23 号技能包 + opensource-ui）。根据用户意图选择子包与 SKILL.md；支持在对话中 @ 本文件或任意 SKILL.md 直接唤起。
---

# Design Skill 总路由表

本文件是**仓库内设计类 Agent Skills 的总索引**。在 Cursor / Claude Code 等环境中，通过 **`@` 引用** 本文件或下表中的 **`SKILL.md` 路径**即可加载对应指令。

> **Cursor 一键唤起：** 在对话中 **`@all-skills`**（项目技能 `.cursor/skills/all-skills/SKILL.md`）即可挂载本路由；该 Skill 会指示 Agent 读取本文件 `All skills.md/All skills.md` 并按表执行。

---

## 一、如何执行与唤起（`All skills.md` + `SKILL.md`）

### 方式 A：先路由、再直达（推荐）

1. 在对话中引用 **`@All skills.md/All skills.md`**（本文件），说明你的目标（例如：「做移动端表单」「从 Figma 还原」「设计系统从 0 搭建」）。
2. Agent 根据下文 **总览表 / 快速决策流程** 选定技能包后，再引用具体文件，例如：  
   `@All skills.md/14.ui-ux-design/SKILL.md` 或 `@All skills.md/2.impeccable/.agents/skills/audit/SKILL.md`。

### 方式 B：直接 @ 某个 `SKILL.md`（跳过路由）

在已打开本仓库为工作区的前提下，直接 **`@<路径>/SKILL.md`**，例如：

- `@All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md`
- `@All skills.md/21.design-critique/SKILL.md`
- `@All skills.md/22.eva-ui-skill/SKILL.md`
- `@All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md`

### 方式 C：写入 Cursor 规则 / Skills（长期生效）

在 **Cursor Settings → Rules** 或 **Skills** 中，将常用目录或单个 `SKILL.md` 加入 **Project** 或 **User** 范围（具体菜单名随 Cursor 版本可能为 “Project Rules”“Agent Skills” 等）。

### 路径说明

- **1–23 号技能包** 均位于 **`All skills.md/`** 目录下；下表路径均 **相对于本仓库根目录**（例如 `All skills.md/14.ui-ux-design/SKILL.md`）。
- **Web** = 网页、后台、落地页、桌面端 Web 应用；**App/Mobile** = 原生 / RN / Flutter 等移动端界面；**全端** = 文档明确同时覆盖或偏通用 UI 逻辑。

---

## 二、总览表（1–23 + opensource-ui）

| # | 包目录 | Web | App/Mobile | 主入口 `SKILL.md` | 一句话场景 |
|---|--------|:---:|:----------:|-------------------|------------|
| 1 | `All skills.md/1.ui-ux-pro-max-skill` | ✅ | ✅ | `All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md` | 行业/风格/配色/字体/图表一站式 UI 决策与落地 |
| 2 | `All skills.md/2.impeccable` | ✅ | ✅ | `All skills.md/2.impeccable/.agents/skills/<子技能名>/SKILL.md` | 审计、打磨、动效、排版、适配等 20+ 子技能质量工程 |
| 3 | `All skills.md/3.ui-skill` | ✅ | ✅ | `All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md` | Tailwind/动效/无障碍等「反 AI slop」基线守卫 |
| 4 | `All skills.md/4.taste-skill` | ✅ | ◐ | `All skills.md/4.taste-skill/taste-skill/SKILL.md` 等 | 品味引擎、去 AI 味、极简/高端子技能 |
| 5 | `All skills.md/5.better-icons` | ✅ | ✅ | `All skills.md/5.better-icons/skills/SKILL.md` | 跨库图标搜索 / MCP，服务任意前端栈 |
| 6 | `All skills.md/6.ui-design-brain` | ✅ | ✅ | `All skills.md/6.ui-design-brain/SKILL.md` | 基于大量组件模式的量产级 Web UI |
| 7 | `All skills.md/7.superdesign` | ✅ | ○ | **无单一 SKILL.md**（IDE 扩展/工程） | 在 IDE 内生图、组件、线框；见 `All skills.md/7.superdesign/README.md` |
| 8 | `All skills.md/8.design-plugin` | ✅ | ✅ | `All skills.md/8.design-plugin/design-and-refine/skills/design-lab/SKILL.md` | 设计访谈 + 多方案探索 + 定稿与清理临时文件 |
| 9 | `All skills.md/9.make-interface-feel-better` | ✅ | ✅ | `All skills.md/9.make-interface-feel-better/skills/make-interfaces-feel-better/SKILL.md` | 圆角、阴影、动效、排版等「质感」细节 |
| 10 | `All skills.md/10.emilkowalski` | ✅ | ✅ | `All skills.md/10.emilkowalski/skills/emil-design-eng/SKILL.md` | Emil 式设计工程：动画与不可见细节 |
| 11 | `All skills.md/11.ui.wiki` | ✅ | ◐ | `All skills.md/11.ui.wiki/.agents/skills/userinterface-wiki/SKILL.md` | 152 条 Web 界面规则，适合代码审阅 / 动效 |
| 12 | `All skills.md/12.agent-skills` | ✅ | ✅ | `All skills.md/12.agent-skills/skills/<名称>/SKILL.md` | Web 指南、React、**React Native**、Vercel 部署等 |
| 13 | `All skills.md/13.designer-skills` | ✅ | ✅ | `All skills.md/13.designer-skills/<插件>/skills/<技能>/SKILL.md` | 用研、设计系统、交互、原型测试、设计 Ops 等 63 技能 |
| 14 | `All skills.md/14.ui-ux-design` | ✅ | ✅ | `All skills.md/14.ui-ux-design/SKILL.md` | 现代 UI/UX、Tailwind、Shadcn、WCAG、微交互 |
| 15 | `All skills.md/15.ux-ui-specialist` | ✅ | ✅ | `All skills.md/15.ux-ui-specialist/SKILL.md` | 专家式分析方案权衡、无障碍与可用性问题 |
| 16 | `All skills.md/16.ui-audit` | ✅ | ✅ | `All skills.md/16.ui-audit/SKILL.md` | 基于 UX 决策框架的快速界面审计 |
| 17 | `All skills.md/17.design-system-creation` | ✅ | ✅ | `All skills.md/17.design-system-creation/design-system-creation/SKILL.md` | 从 0 搭建有个性设计系统（元技能 + 相关子技能） |
| 18 | `All skills.md/18.design-to-code` | ✅ | ✅ | `All skills.md/18.design-to-code/SKILL.md` | 设计稿/截图高保真还原前端（Figma/Sketch/图） |
| 19 | `All skills.md/19.variant-design-skill` | ✅ | ✅ | `All skills.md/19.variant-design-skill/SKILL.md` | 一提示多方案变体、领域参考 + 设计系统引用 |
| 20 | `All skills.md/20.figma-design` | ✅ | ✅ | `All skills.md/20.figma-design/SKILL.md` | **依赖 Figma MCP**：按链接拉取设计上下文并落代码 |
| 21 | `All skills.md/21.design-critique` | ✅ | ✅ | `All skills.md/21.design-critique/SKILL.md` | 上传界面截图：多维度设计点评与修复建议 |
| 22 | `All skills.md/22.eva-ui-skill` | ✅ | ✅ | `All skills.md/22.eva-ui-skill/SKILL.md` | EVA/NERV 监视器风格高密度仪表 UI |
| 23 | `All skills.md/23.ui-ux-guide` | ✅ | ✅ | `All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md` | 现代极简 UI/UX：可执行规则 + P0/P1/P2 评审（guide / review） |
| — | `opensource-ui` | ✅ | ◐ | 见下文 **§ 七** | 开源 UI 仓库克隆索引，非单一 Skill |

**图例：** ✅ 适用；◐ 文档偏 Web 但原则可迁移；○ 非传统 SKILL 工作流。

---

## 三、快速决策流程

```
用户请求
  │
  ├─ 从零构建界面 / 要行业+风格+配色+字体？
  │   ├─ 一站式规则库 ───────────────────→ @All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md
  │   ├─ 高端品味 / 去 AI 味 / 参数可调 ─→ @All skills.md/4.taste-skill/taste-skill/SKILL.md
  │   └─ 极简编辑风 / Notion 风 ─────────→ @All skills.md/4.taste-skill/minimalist-skill/SKILL.md
  │
  ├─ 改良已有界面？
  │   ├─ 全面审计 ───────────────────────→ @All skills.md/2.impeccable/.agents/skills/audit/SKILL.md
  │   ├─ 定向升级 AI 指纹 ───────────────→ @All skills.md/4.taste-skill/redesign-skill/SKILL.md
  │   └─ 单维度精修 ─────────────────────→ @All skills.md/2.impeccable/.agents/skills/<typeset|colorize|arrange|…>/SKILL.md
  │
  ├─ 跨端适配？ ─────────────────────────→ @All skills.md/2.impeccable/.agents/skills/adapt/SKILL.md
  ├─ 图标？ ─────────────────────────────→ @All skills.md/5.better-icons/skills/SKILL.md
  ├─ 代码 UI 基线检查？ ─────────────────→ @All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md
  ├─ 多方案探索 + 定稿？ ─────────────────→ @All skills.md/8.design-plugin/design-and-refine/skills/design-lab/SKILL.md
  ├─ 截图/视觉点评？ ───────────────────→ @All skills.md/21.design-critique/SKILL.md
  ├─ Figma 链接 + MCP 已实现？ ─────────→ @All skills.md/20.figma-design/SKILL.md
  ├─ 设计稿还原（图/Figma）？ ───────────→ @All skills.md/18.design-to-code/SKILL.md
  ├─ 一题多风格界面草案？ ───────────────→ @All skills.md/19.variant-design-skill/SKILL.md
  ├─ EVA 指挥台风格？ ───────────────────→ @All skills.md/22.eva-ui-skill/SKILL.md
  ├─ 极简界面可执行规则 / P0–P2 改造清单？ ─→ @All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md
  ├─ 用研/设计系统/交互/测试文案？ ───────→ @All skills.md/13.designer-skills/...（见 § 六）
  └─ 查组件库源码？ ─────────────────────→ § 七 opensource-ui
```

---

## 四、1–5 号包详解（原有说明）

### 1. @All skills.md/1.ui-ux-pro-max-skill — 设计系统生成引擎

> 主入口：`All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md`  
> 一站式生成完整设计系统：行业匹配 → 风格推荐 → 配色方案 → 字体搭配 → 组件模式 → 反模式清单。**Web + Mobile**（多技术栈）。

#### 核心能力（摘录）

| 能力 | 做什么 |
|------|--------|
| **ui-ux-pro-max** | 多行业 / 风格 / 配色 / 字体 / 图表 / UX 指南，跨多栈 |
| **数据与脚本** | 包内 `cli/`、`data/` 支持检索与生成（见包内 README） |

#### 典型 Prompt

```
@All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md 帮我的宠物喂养 App 定配色+字体+风格
```

---

### 2. @All skills.md/2.impeccable — 设计质量工程工具链

> 子技能目录：`All skills.md/2.impeccable/.agents/skills/<name>/SKILL.md`（如 `audit`、`adapt`、`typeset`）  
> **Web + Mobile** 通用；`adapt` 显式覆盖多端。

#### 核心能力（20 个子 Skill，名称即文件夹）

`frontend-design`、`teach-impeccable`、`extract`、`audit`、`colorize`、`bolder`、`quieter`、`delight`、`polish`、`arrange`、`adapt`、`normalize`、`animate`、`optimize`、`harden`、`onboard`、`overdrive`、`clarify`、`distill`、`typeset`、`critique`。

#### 典型 Prompt

```
@All skills.md/2.impeccable/.agents/skills/audit/SKILL.md 审查这个首页的 UX
@All skills.md/2.impeccable/.agents/skills/adapt/SKILL.md 把这个页面从手机适配到桌面
```

---

### 3. @All skills.md/3.ui-skill — UI 基线守卫

> 入口：`All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md`  
> **Web 为主**（Tailwind 约定），原则可迁移到移动端样式代码。

---

### 4. @All skills.md/4.taste-skill — 设计品味与去 AI 味

> 入口示例：  
> - `All skills.md/4.taste-skill/taste-skill/SKILL.md`  
> - `All skills.md/4.taste-skill/redesign-skill/SKILL.md`  
> - `All skills.md/4.taste-skill/minimalist-skill/SKILL.md`  
> - `All skills.md/4.taste-skill/soft-skill/SKILL.md`  
> - `All skills.md/4.taste-skill/output-skill/SKILL.md`  

**偏 Web**，移动端可用同一套原则做 RN/Flutter 样式。

---

### 5. @All skills.md/5.better-icons — 跨库图标搜索

> 入口：`All skills.md/5.better-icons/skills/SKILL.md`  
> **全端**（任何用 SVG/组件图标的技术栈）。

---

## 五、6–12 号包详解

### 6. `All skills.md/6.ui-design-brain`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/6.ui-design-brain/SKILL.md` |
| **平台** | Web 为主，通用组件模式也可指导移动端 UI 结构 |
| **唤起** | `@All skills.md/6.ui-design-brain/SKILL.md` |
| **场景** | 用「真实组件模式」生成后台、表单、导航等，减少泛 AI 布局 |

### 7. `All skills.md/7.superdesign`

| 项目 | 内容 |
|------|------|
| **入口** | **无标准 `SKILL.md`**；为独立工程 + IDE 扩展 |
| **平台** | Web 原型为主 |
| **唤起** | 按 `All skills.md/7.superdesign/README.md` 安装扩展；在支持的环境用 SuperDesign 工作流 |
| **场景** | 语言生成 Mock、组件、线框，与 Cursor 并排使用 |

### 8. `All skills.md/8.design-plugin`（Design Lab）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/8.design-plugin/design-and-refine/skills/design-lab/SKILL.md` |
| **平台** | Web / App UI 均可 |
| **唤起** | `@All skills.md/8.design-plugin/design-and-refine/skills/design-lab/SKILL.md` |
| **场景** | 访谈 → 5 套方向 → 收反馈 → 定稿；**结束须清理临时设计目录**（见 SKILL） |

### 9. `All skills.md/9.make-interface-feel-better`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/9.make-interface-feel-better/skills/make-interfaces-feel-better/SKILL.md` |
| **平台** | **全端**（实现层细节） |
| **唤起** | `@All skills.md/9.make-interface-feel-better/skills/make-interfaces-feel-better/SKILL.md` |
| **场景** | 「感觉不对」时修圆角、阴影、动效、字号与触控区域等 |

### 10. `All skills.md/10.emilkowalski`（Design Engineering）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/10.emilkowalski/skills/emil-design-eng/SKILL.md` |
| **平台** | **全端** |
| **唤起** | `@All skills.md/10.emilkowalski/skills/emil-design-eng/SKILL.md` |
| **场景** | 动画决策、组件质感、微交互哲学 |

### 11. `All skills.md/11.ui.wiki`（User Interface Wiki）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/11.ui.wiki/.agents/skills/userinterface-wiki/SKILL.md` |
| **平台** | **偏 Web**（Motion、CSS、View Transition 等） |
| **唤起** | `@All skills.md/11.ui.wiki/.agents/skills/userinterface-wiki/SKILL.md` |
| **场景** | 自动审阅前端代码，输出 `file:line` 级违反项 |

### 12. `All skills.md/12.agent-skills`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/12.agent-skills/skills/web-design-guidelines/SKILL.md` 等（同目录下还有 `react-best-practices`、`react-native-skills`、`deploy-to-vercel`、`composition-patterns`、`vercel-cli-with-tokens`） |
| **平台** | Web + **React Native（移动）** |
| **唤起** | `@All skills.md/12.agent-skills/skills/<目录名>/SKILL.md` |
| **场景** | 全栈交付、RN 界面实践、部署与组合模式 |

---

## 六、13–23 号包详解

### 13. `All skills.md/13.designer-skills`

| 项目 | 内容 |
|------|------|
| **入口模式** | `All skills.md/13.designer-skills/<插件>/skills/<技能名>/SKILL.md` |
| **插件示例** | `design-research`、`design-systems`、`ux-strategy`、`ui-design`、`interaction-design`、`prototyping-testing`、`design-ops`、`designer-toolkit` |
| **平台** | **全端**（流程与文档为主，不限定平台） |
| **唤起** | `@All skills.md/13.designer-skills/ui-design/skills/color-system/SKILL.md` 等 |
| **场景** | 用户画像、旅程图、设计令牌、交互状态机、可用性测试、设计评审与 handoff |

### 14. `All skills.md/14.ui-ux-design`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/14.ui-ux-design/SKILL.md` |
| **平台** | **Web + Mobile** |
| **唤起** | `@All skills.md/14.ui-ux-design/SKILL.md` |
| **场景** | 2026 趋势、Tailwind、Shadcn、响应式、WCAG、微交互 |

### 15. `All skills.md/15.ux-ui-specialist`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/15.ux-ui-specialist/SKILL.md` |
| **平台** | **Web + App** |
| **唤起** | `@All skills.md/15.ux-ui-specialist/SKILL.md` |
| **场景** | 方案对比、潜在 UX 问题、无障碍专项建议 |

### 16. `All skills.md/16.ui-audit`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/16.ui-audit/SKILL.md`（可配合 `references/`、`CLAUDE.md`） |
| **平台** | **全端** |
| **唤起** | `@All skills.md/16.ui-audit/SKILL.md` |
| **场景** | 时间紧时的界面决策与检查清单式审计 |

### 17. `All skills.md/17.design-system-creation`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/17.design-system-creation/design-system-creation/SKILL.md` |
| **相关** | `All skills.md/17.design-system-creation/related-skills/*/SKILL.md` |
| **平台** | **全端** |
| **唤起** | `@All skills.md/17.design-system-creation/design-system-creation/SKILL.md` |
| **场景** | 新建或重构设计系统、Token、组件与动效编排 |

### 18. `All skills.md/18.design-to-code`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/18.design-to-code/SKILL.md` |
| **平台** | **全端** |
| **唤起** | `@All skills.md/18.design-to-code/SKILL.md` |
| **场景** | 「还原设计图」「切图」「设计稿转代码」 |

### 19. `All skills.md/19.variant-design-skill`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/19.variant-design-skill/SKILL.md`（引用 `references/`） |
| **平台** | **全端**（HTML 默认，可 React） |
| **唤起** | `@All skills.md/19.variant-design-skill/SKILL.md` |
| **场景** | 同一 Brief 输出多套明显不同风格，并可迭代 vary / polish / critique |

### 20. `All skills.md/20.figma-design`（implement-design）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/20.figma-design/SKILL.md` |
| **平台** | **全端**（实现仍按项目栈） |
| **依赖** | **须连接 [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)**（如 `get_design_context`） |
| **唤起** | `@All skills.md/20.figma-design/SKILL.md` |
| **场景** | 用户粘贴带 `node-id` 的 Figma 链接，按 MCP 数据 1:1 落代码 |

### 21. `All skills.md/21.design-critique`（Designers Eye）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/21.design-critique/SKILL.md` |
| **平台** | **全端**（视觉稿） |
| **唤起** | `@All skills.md/21.design-critique/SKILL.md` + 在对话中附上截图 |
| **场景** | 不做重设计，输出分级修改意见（Critical / Important / Polish） |

### 22. `All skills.md/22.eva-ui-skill`

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/22.eva-ui-skill/SKILL.md`（`references/`、`assets/example-lab/`） |
| **平台** | **全端** |
| **唤起** | `@All skills.md/22.eva-ui-skill/SKILL.md` |
| **场景** | EVA 监视器风：高密、硬边、红橙状态色、条纹刻度等 |

### 23. `All skills.md/23.ui-ux-guide`（Oiloil UI/UX Guide）

| 项目 | 内容 |
|------|------|
| **入口** | `All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md`（`references/`、`AGENTS.md`、`.cursor/rules/` 等跨工具桥接） |
| **平台** | **Web + App**（截图 / 原型 / HTML 评审均可） |
| **唤起** | `@All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md` |
| **场景** | **`guide`**：现代简洁界面的可执行 do/don't；**`review`**：输出 P0/P1/P2 与可落地改法；强调任务优先、状态闭环、CRAP、禁 emoji 当图标 |
| **上游** | [oil-oil/oiloil-ui-ux-guide](https://github.com/oil-oil/oiloil-ui-ux-guide) |

---

## 七、`opensource-ui` — 开源组件库索引（非单一 Skill）

> 路径：`opensource-ui/README.md`  
> 本目录为 **vendor 仓库克隆**，用于查文档、组件源码与官方 Agent Skill（若上游提供）。

| 子目录（`vendor-repos/`） | 典型用途 |
|---------------------------|----------|
| `shadcn-ui`、`material-ui`、`ant-design`、`nuxt-ui`、`creative-tim-ui`、`andlabs-ui`、`shoutem-ui`、`laravel-ui`、`lovelace-minimalist`、`rancher-ui` | 对照实现、抄 Token、查 Issue/Skill |

**可选 Skill 示例（随上游变动，以仓库内实际路径为准）：**

- `opensource-ui/vendor-repos/nuxt-ui/skills/nuxt-ui/SKILL.md`
- `opensource-ui/vendor-repos/creative-tim-ui/skills/creative-tim-ui/SKILL.md`
- `opensource-ui/vendor-repos/ant-design/.agents/skills/*/`（多个）

**唤起**：`@opensource-ui/vendor-repos/<库>/...` 下具体 `SKILL.md` 或 `README.md`。

**场景**：技术栈已选定某库时，让 Agent **结合官方文档与源码** 写组件；**不等价**于本仓库 1–23 的通用设计方法论包。

---

## 八、Skill 组合使用推荐

### 场景 1：从零构建一个完整产品界面

```
@All skills.md/1.ui-ux-pro-max-skill/.claude/ui-ux-pro-max/SKILL.md  → 设计系统方向
@All skills.md/4.taste-skill/taste-skill/SKILL.md                    → 品味与参数
@All skills.md/5.better-icons/skills/SKILL.md                        → 图标
@All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md        → 基线检查
```

### 场景 2：升级「AI 味」界面

```
@All skills.md/4.taste-skill/redesign-skill/SKILL.md
@All skills.md/2.impeccable/.agents/skills/audit/SKILL.md
@All skills.md/2.impeccable/.agents/skills/polish/SKILL.md
@All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md
```

### 场景 3：设计审查

```
@All skills.md/2.impeccable/.agents/skills/critique/SKILL.md
@All skills.md/16.ui-audit/SKILL.md
@All skills.md/21.design-critique/SKILL.md（配截图）
@All skills.md/23.ui-ux-guide/skills/oiloil-ui-ux-guide/SKILL.md（review：P0/P1/P2 + 可落地改法）
```

### 场景 4：跨端适配

```
@All skills.md/2.impeccable/.agents/skills/adapt/SKILL.md
@All skills.md/3.ui-skill/.agents/skills/baseline-ui/SKILL.md
```

### 场景 5：Figma → 代码（需 MCP）

```
@All skills.md/20.figma-design/SKILL.md
（确保 Figma MCP 已连接后再贴设计链接）
```

---

## 九、维护说明

- 新增 **`24.*`** 及后续技能包时：将目录放在 **`All skills.md/`** 下，在本文件 **§ 二 总览表** 增加一行，路径写成 `All skills.md/<编号>.xxx/...`，并同步更新文内「1–N」范围与 **§ 六** 对应小节。
- 某包 **主 `SKILL.md` 路径变更**时：以仓库内实际文件为准，同步改表内路径。
