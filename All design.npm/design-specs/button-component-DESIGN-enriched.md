---
version: "1.1"
name: "按钮组件规范（心流 · 组件库 · Figma）"
description: >-
  B 端说明文档风按钮与版式基线。供 vibe-design / AI 生成界面时对齐颜色、排版、
  组件状态与 token；以实现文件《心流 · 组件库》中「General/按钮 Button」一节为准，
  long-form 文档 Frame `.按钮` 见同页画布。
source:
  figma: "https://www.figma.com/design/ErWWXrlAhgsY2aXyy8WNNq/%E5%BF%83%E6%B5%81-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=0-91582"
  node: "0:91582"
  pageCanvas: "0:91582"
  docFrame: "0:91672"
  frame: ".按钮"
colors:
  colorTextBase: "#111111"
  colorTextSecondary: "#5f6471"
  colorTextTertiary: "#8d93a1"
  colorBgPage: "#f2f3f5"
  colorBgSubtle: "#f8f8f8"
  colorBgElevated: "#ffffff"
  colorBorder: "#e4e6ed"
  colorBorderAlt: "#dfe3ec"
  colorPrimary: "#5057f6"
  colorPrimaryHover: "#94a9ff"
  colorPrimaryActive: "#2944d9"
  colorPrimaryDeep: "#2944d9"
  colorError: "#f23c3c"
  colorTextOnPrimary: "#ffffff"
  colorDeepSurface: "#000614"
typography:
  doc-hero-zh:
    fontFamily: '"PingFang SC", -apple-system, sans-serif'
    fontSize: "100px"
    fontWeight: 500
    lineHeight: "1.1"
  doc-subtitle-en:
    fontFamily: '"SF Pro Display", -apple-system, "PingFang SC", sans-serif'
    fontSize: "48px"
    fontWeight: 400
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  section-title:
    fontFamily: '"PingFang SC", -apple-system, sans-serif'
    fontSize: "32px"
    fontWeight: 500
    lineHeight: "1.35"
  body-md:
    fontFamily: '"PingFang SC", -apple-system, sans-serif'
    fontSize: "24px"
    fontWeight: 400
    lineHeight: "1.5"
  button-label-md:
    fontFamily: '"PingFang SC", -apple-system, sans-serif'
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "20px"
  button-label-sm:
    fontFamily: '"PingFang SC", -apple-system, sans-serif'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "20px"
rounded:
  button: "8px"
  button-lg: "12px"
  card: "8px"
spacing:
  base: "4px"
  button-padding-lg-x: "20px"
  button-padding-md-x: "16px"
  button-padding-sm-x: "12px"
  button-gap-lg: "12px"
  button-gap-md: "8px"
  button-gap-sm: "4px"
  button-height-lg: "36px"
  button-height-md: "32px"
  button-height-sm: "24px"
components:
  button-primary:
    backgroundColor: "{colors.colorPrimary}"
    textColor: "{colors.colorTextOnPrimary}"
    borderColor: "{colors.colorPrimary}"
    hoverBackground: "{colors.colorPrimaryHover}"
    activeBackground: "{colors.colorPrimaryActive}"
    typographyMd: "{typography.button-label-md}"
    typographySm: "{typography.button-label-sm}"
    roundedMd: "{rounded.button}"
    roundedLg: "{rounded.button-lg}"
    heightLg: "{spacing.button-height-lg}"
    heightMd: "{spacing.button-height-md}"
    heightSm: "{spacing.button-height-sm}"
    paddingLgX: "{spacing.button-padding-lg-x}"
    paddingMdX: "{spacing.button-padding-md-x}"
    paddingSmX: "{spacing.button-padding-sm-x}"
    gapLg: "{spacing.button-gap-lg}"
    gapMd: "{spacing.button-gap-md}"
    gapSm: "{spacing.button-gap-sm}"
  button-default:
    backgroundColor: "{colors.colorBgSubtle}"
    textColor: "{colors.colorTextBase}"
    borderColor: "transparent"
    hoverText: "{colors.colorPrimaryHover}"
    hoverBorder: "transparent"
    typographyMd: "{typography.button-label-md}"
    typographySm: "{typography.button-label-sm}"
    roundedMd: "{rounded.button}"
    roundedLg: "{rounded.button-lg}"
    heightLg: "{spacing.button-height-lg}"
    heightMd: "{spacing.button-height-md}"
    heightSm: "{spacing.button-height-sm}"
    paddingLgX: "{spacing.button-padding-lg-x}"
    paddingMdX: "{spacing.button-padding-md-x}"
    paddingSmX: "{spacing.button-padding-sm-x}"
    gapLg: "{spacing.button-gap-lg}"
    gapMd: "{spacing.button-gap-md}"
    gapSm: "{spacing.button-gap-sm}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.colorTextBase}"
    hoverText: "{colors.colorPrimaryHover}"
    hoverTint: "rgba(80, 87, 246, 0.06)"
    typographyMd: "{typography.button-label-md}"
    typographySm: "{typography.button-label-sm}"
    roundedMd: "{rounded.button}"
    roundedLg: "{rounded.button-lg}"
    heightLg: "{spacing.button-height-lg}"
    heightMd: "{spacing.button-height-md}"
    heightSm: "{spacing.button-height-sm}"
    paddingLgX: "{spacing.button-padding-lg-x}"
    paddingMdX: "{spacing.button-padding-md-x}"
    paddingSmX: "{spacing.button-padding-sm-x}"
    gapLg: "{spacing.button-gap-lg}"
    gapMd: "{spacing.button-gap-md}"
    gapSm: "{spacing.button-gap-sm}"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.colorPrimary}"
    hoverText: "{colors.colorPrimaryHover}"
    underlineOnHover: true
    typographyMd: "{typography.button-label-md}"
    heightMd: "{spacing.button-height-md}"
  button-danger:
    backgroundColor: "{colors.colorBgElevated}"
    textColor: "{colors.colorError}"
    borderColor: "rgba(242, 60, 60, 0.35)"
    typographyMd: "{typography.button-label-md}"
    typographySm: "{typography.button-label-sm}"
    roundedMd: "{rounded.button}"
    roundedLg: "{rounded.button-lg}"
    heightLg: "{spacing.button-height-lg}"
    heightMd: "{spacing.button-height-md}"
    heightSm: "{spacing.button-height-sm}"
    paddingLgX: "{spacing.button-padding-lg-x}"
    paddingMdX: "{spacing.button-padding-md-x}"
    paddingSmX: "{spacing.button-padding-sm-x}"
    gapLg: "{spacing.button-gap-lg}"
    gapMd: "{spacing.button-gap-md}"
    gapSm: "{spacing.button-gap-sm}"
motion:
  level: restrained
  durationMs: [120, 150, 200]
  easing: ["ease-out", "cubic-bezier(0.4, 0, 0.2, 1)"]
  properties: ["background-color", "border-color", "color", "box-shadow"]
  reducedMotion: "遵守 prefers-reduced-motion：可降级为瞬时切换或淡出时长 ≤ 1ms。"
---

<!-- 以下为人类可读语义层；与上方 YAML 冲突时以 Figma 与 YAML 中高置信 token 校准后的一致版本为准。 -->

# Design System: 按钮组件规范（心流 · 组件库）

**来源文件：** [Figma — 心流 · 组件库 · General / 按钮](https://www.figma.com/design/ErWWXrlAhgsY2aXyy8WNNq/%E5%BF%83%E6%B5%81-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=0-91582)  
**画布 Page：** `0:91582`（`✅ 基础 General/按钮 Button`）  
**长文档 Frame：** `0:91672` · **`.按钮`**（与同页组件矩阵配套，画布高度约 `14494`）。  
**用途：** vibe-design / AI 生成界面时与 **变量集合（变量 / 背景 / 文字和图标 …）及 Button 矩阵**对齐；以下为 YAML 与人类可读语义层——与 Figma 实例冲突时以大文件源稿为准。

---

## Overview（结构提示）

- **composition：** 文档栅格 + 侧栏可能的深底区块；正文以浅灰分区与白色内容卡片为主。  
- **content width：** 以规范长页为目标，可读性优于全屏花哨装饰。  
- **材质：** 扁平为主，分割线清晰；不强求玻璃拟态或大阴影。

---

## 1. Visual Theme & Atmosphere

- **气质：** 偏 **B 端 / 生产力** 的说明文档页：大量 **表格、规则列表、示意图**，信息密度中高，强调 **可读性** 与 **规范可执行性**。
- **背景：** 以 **浅灰白底**（如 `#f2f3f5`、`#f8f8f8`、`#e4e6ed`）与 **纯白区块**（`#ffffff`）交替，形成分区而不抢眼。
- **主色倾向：** **靛蓝**（`colorPrimary` `#5057f6`）；**Hover** 在矩阵上绑 `变量/colorHover` → **`#94a9ff`**（与原 Untitled 稿中 `#6685ff` 不同，以组件库为准）；按压绑 `变量/colorActive` → **`#2944d9`**；正文与标题深色见 `colorDeepSurface`、`colorTextBase`。
- **语义色：** **红**（`#f23c3c` 一类）用于错误 / 危险提示；中性灰阶（`#5f6471`、`#8d93a1`、`#cccccc`）用于次要信息与分割线。

---

## 2. Color Palette & Roles

以下为自画布抽样统计的 **高频色**（括号内为十六进制，便于开发与 vibe-design 对齐）。**实现请优先对齐 frontmatter `colors` 键名。**

| 角色（语义） | Hex | 说明 |
|--------------|-----|------|
| 正文 / 主标题 | `#111111` | 大段说明、规则正文 |
| 页面深底 / 重色块 | `#000614`、`#010613`、`#1a2740` | 侧栏或重色区域（用量少于浅底） |
| 表面 / 卡片白 | `#ffffff` | 内容区、按钮浅色底 |
| 浅灰背景 | `#f2f3f5`、`#f8f8f8` | 分区底、弱对比背景 |
| 边框 / 分割线灰 | `#e4e6ed`、`#dfe3ec` | 分割线、表格线 |
| 主色蓝（亮 / Hover） | `#94a9ff`（`colorPrimaryHover`，Figma：`变量/colorHover`） | 组件库矩阵 hover 取样 |
| 主色蓝（饱和） | `#5057f6`、`#2944d9`、`#2927a8` | 主按钮默认 / 按压、链接强调 |
| 深蓝按压（Active） | `#2944d9`（`colorPrimaryActive` / `colorPrimaryDeep`，Figma：`变量/colorActive`） | 实心主按钮 Pressed |
| 危险红 | `#f23c3c` | 错误、危险操作 |
| 中性字色 | `#5f6471`、`#8d93a1` | 次要说明、禁用感文字 |

**文档内嵌的 token 名（实现与 prompt 优先用 YAML）：** 《心流 · 组件库》里变量按 **集合** 分层（如 **`变量`、`背景`、`文字和图标`**），与 MCP 导出到 Tailwind/CSS 的名称形如 **`--变量/colorprimary`**（导出时常为全小写）。下表沿用 **可读书写**（camelCase）；在 Figma 变量面板请以实际大小写为准。

### 2.1 《心流 · 组件库》Figma 变量 ↔ YAML（canonical）

**规则：** **实现与 vibe-design prompt 以 frontmatter 的 YAML 键名为准**。读设计稿时按下表从左列（或 MCP 展开的 `--集合/变量名`）定位到 YAML。

#### A. 颜色（来自 Button 矩阵实例：`Middle,Primary/Default,...`）

| 《心流》变量集合 / 样式名（Figma MCP 等价片段） | YAML `colors.*` | 组件库取样 |
|--------------------------------------------|-----------------|------------|
| `变量/colorPrimary`（`--变量/colorprimary`） | `colorPrimary` | 实心主按钮底、字描边同色 |
| `变量/colorHover` | `colorPrimaryHover` | Primary / Default Hover 底或字，`#94a9ff` |
| `变量/colorActive` | `colorPrimaryActive`（与 `colorPrimaryDeep` 同为 `#2944d9`，后者作语义别名保留） | Primary Pressed |
| `变量/colorWhite` | `colorTextOnPrimary` | 主按钮默认态反白 |
| `文字和图标/textSolid` | `colorTextOnPrimary` | Hover/Pressed 上主按钮白字等价语义 |
| `文字和图标/colorText` | `colorTextBase` | 默认灰底按钮 `#111`，纯文规范例 |
| `背景/colorFillQuaternary` | `colorBgSubtle` | **Default** 实心按钮浅色底 `#f8f8f8`（非描边白板） |

**仍适用于文档页 / 未出现在上述矩阵取样中的 YAML 补充键：** `colorTextSecondary`、`colorTextTertiary`、`colorBgPage`、`colorBgElevated`、`colorBorder`、`colorBorderAlt`、`colorError`、`colorDeepSurface` 等——与长页 `.文档` Frame 分割线、次级说明一致；Danger / Link 若在组件库中单开变量再补行。

#### B. 《心流》通用间距 / 半径（导出变量名，`get_design_context` 可见）

这些名称可能挂在 Button 外层 auto-layout；YAML 中为 **等价 px**，便于不写 Figma SDK 的工程落地。

| Figma MCP 片段举例 | YAML 建议用法 |
|--------------------|---------------|
| `--padding`、`--padding-md`（Large 横向 20）、`--padding-sm`（Small 横向 12） | `spacing.button-padding-{lg,md,sm}-x` |
| `--padding-xs`（纵向 8）、Large 纵向 `py-12px`（见源码节点） | 实现里与 `button-height-*` 一起守恒；按需补 `padding-y` token |
| `--gap-xs`（Mid 常与 8）、Large Primary `gap-[12px]` | `spacing.button-gap-md`、`button-gap-lg` |
| `--radius-xl`（Large 控件 12）、Mid/Small 圆角字面 8 | `rounded.button-lg`、`rounded.button` |

#### C. 排版（按钮字样式多数绑 **Typography/正文/Strong|Normal**，变量链路 `正文/fontSize`、`正文/lineHeight`）

| 语义（《心流》样式 / 取样） | YAML |
|---------------------------|------|
| Middle / Large 主按钮字：PingFang **Semibold 600**，`正文/fontSize` 链 | `typography.button-label-md` |
| Small 主按钮字：**Regular 400**，同字号链 | `typography.button-label-sm` |
| 文档主标题、副标 | `doc-hero-zh`、`doc-subtitle-en` 等（见 frontmatter） |

#### D. 组件变体矩阵命名（≠「Ant 文案档」用词）

| Figma Property / Layer 前缀 | YAML / 语义 |
|-----------------------------|-------------|
| 尺寸：**`Large`、`Middle`、`Small`** | 「中号」=`Middle`，**不要使用 `Default` 当作尺寸名** |
| 类型：`Primary`、`Default` | ↔ `button-primary`、`button-default`（Default=浅灰实心 + Hover 仅字色变 `colorPrimaryHover`，无额外描边） |
| State：`Disabled`、`Focused`、`Pressed`、`Hover`、`Default` … | Hover/Pressed 颜色见 §2 表 |
| 「纯文本」Frame：`ButtonPlainText` | ↔ 规范中的 Text / Plain 链路（与设计库子组件对齐） |

#### E. 历史 / 别名（旧 Untitled、`color*` 泛泛命名）

若在旧稿件或 Prompt 仍见 `colorTextLightSolid`、`colorBgBase`、`colorTextEmbed`：**不要与《心流》集合名等同**，请按 **上文 A+E** 归入 `colorTextOnPrimary`、`colorBgPage`/`colorBgSubtle`、`colorTextTertiary` 等，或按节点内 Inspect 校对。

---

## 3. Typography Rules

- **西文 / 数字：** **SF Pro Display · Regular** 用于大标题与长正文（如 48px 级说明、32px 级小节）。
- **中文：** **PingFang SC** — 文档段落 **Regular**；**Middle / Large 主按钮**在矩阵上使用 **Semantic / Strong（Semibold ~600）**；**Small 主按钮**为 **Regular 400**，均走 **Typography/正文** 链路（`正文/fontSize` → 当前画布约 **12px**）。
- **层级（从 `.按钮` Frame 取样）：**
  - 文档主标题：**约 100px**（展示「按钮」二字）。
  - 英副标 Doc：**约 48px**。
  - 规则区标题 / 小节：**约 48px / 32px**。
  - 表格与规范说明：**约 32px / 28px / 24px**（随区块略降）。
- **规则：** 按钮内文案 **最多五个字**；实现时 **优先 `正文/fontSize` / `正文/lineHeight` 变量**（与 MCP 导出一致）。

**排版 token：** 参见 frontmatter `typography`，按钮标签以 `button-label-md` / `button-label-sm` 为默认锚点。

---

## 4. Component Stylings

### 按钮（Button）

- **形状：** **Large** 外框半径绑 **`半径/radius-xl`（取样 12px）** ↔ frontmatter **`rounded.button-lg`**；**Middle / Small** 取样 **8px** ↔ **`rounded.button`**。（旧 Untitled 长页写过 4px，以组件库为准。）
- **结构：** **文本**（必） + **可选图标**（属性矩阵与 Ant 命名一致：`start`/`end`、`UploadOutlined` 等）。
- **尺寸（矩阵属性名，勿与「默认态」混淆）：**
  - **Large：** 高 **36px**，横向约 **20px** 级内边距，图标与文案间距约 **12px**。
  - **Middle（绝非 `Default` 尺寸名）：** 高 **32px**，横向约 **16px**，间距 **8px**（`gap-xs`）。
  - **Small：** 高 **24px**，横向 **12px**（`padding-sm`），间距 **4px**。
- **类型：** Primary / Default / Text / Link（文档示例表）；视觉随 **Type + State** 变化。配方见 frontmatter `components`（`button-primary`、`button-default` 等）。**Default** 为 **浅灰实心**（`colorBgSubtle`），非白底描边。
- **状态：** Default、Hover、Pressed、Loading、Focused、Disabled、Danger；Loading 使用 **`Loading3QuartersOutlined`** 左侧图标。
- **描边：** 矩阵内 **Default 类型** 取样为 **无可见描边**（`borderColor: transparent`）；Focus ring 由设计系统 focus 规范决定。
- **工程注意：** `Large,Primary,Default` 某实例在 MCP 导出中字色曾误链 `背景/colorFillQuaternary`；**实现时主按钮字色一律 `colorTextOnPrimary`**，以语义为准勿跟误链。

### 文档页组件

- **分割线：** 1px 高，浅灰（见 `#e4e6ed` 类）。
- **表格 / 规范块：** 顶栏 **示例 / 功能 / 描述** 或 **属性名 / 变量 / 描述** 三列式；行距宽松，便于扫读。

---

## 5. Layout Principles

- **版心：** 左侧 **约 500px** 导航区 + 右侧 **约 2118px** 正文栏（以 Frame **`.按钮`** `0:91672` 子级尺寸为参考）。
- **留白：** 区块之间用 **分割线 + 垂直间距** 分段；规则区采用 **标题 + 多列文字**（如「简一性原则」+ 说明）。
- **栅格：** 示意图区常见 **1080 宽** 画板示意 + 标注线；保持 **左对齐** 阅读动线。

---

## 6. Motion（轻量，B 端默认）

过渡应 **克制、可感知但不喧宾夺主**。具体数值见 frontmatter `motion`。

### Do（动效）

- 使用短时长 **120–200ms** 的状态过渡（Hover / Press / Focus ring 显现）。
- 优先过渡 **background、border、color、box-shadow**，避免大范围 layout 抖动。

### Don't（动效）

- 不要为大段文档规范页加入高强度弹簧或长时长循环动画。
- 不要忽略 **`prefers-reduced-motion`**；必要动效应提供降级。

---

## 7. Content Rules（自文档摘录，供生成文案时遵守）

- 同一组 **主按钮仅 1 个**；主按钮 **不得居中**；多按钮时 **左主右副**，优先级从左到右递减。
- 图标与 **场景** 绑定需一致（同场景同位置、同 icon token）。

**Do / Don't（内容与层级）**

### Do

- 同一视线区块内 **只保留一个 Primary 实心主按钮**。
- 次级操作使用 Default / Text / Link，并保持 **左主右副**。
- Prompt 与实现中 **先写 token 名**，再在括号内必要时补 hex。

### Don't

- 不要用多个并列主按钮争抢注意力。
- 不要把主按钮放在 **水平居中作主 CTA**（除非设计系统另有专区规范）。
- 不要在同一语义场景混用不一致的图标位置或命名。

---

## 8. For vibe-design（提示用短清单）

生成新界面时请携带：

1. **主色：** 靛蓝系（`colorPrimary` 一类），危险操作用 `colorError`。  
2. **背景：** 浅灰分区 + 白卡片；正文 `#111111`。  
3. **字体：** 中文 PingFang SC，英文 SF Pro；标题大、正文 32/28/24 阶梯。  
4. **按钮：** `Middle`/`Small` 外框 **8px** 圆角、`Large` **12px**；三档高度 36/32/24；属性名 **Middle=中号**；主按钮唯一、左对齐 CTA。  
5. **实现：** 颜色与字重 **优先 YAML `colors` / `components` 引用链**；与 Figma 变量集合对齐时对照 **§2.1**。

---

## 与其它 DESIGN.md 形态的关系

- **YAML：** 便于脚本校验、与设计工具对齐、以及在长 prompt 中原样粘贴「单一代码块」而不会丢字段。  
- **正文：** 保留设计决策与人类扫读必需的「气氛 + 表格 + Figma 链接」。二者应 **同步演进**，不以互相矛盾的冗长重复为荣。

---

*本 enriched 版本以 [心流 · 组件库](https://www.figma.com/design/ErWWXrlAhgsY2aXyy8WNNq/) 中 **General/按钮** 与 **`.按钮`** 文档 Frame 的变量与矩阵为准校准命名与取值；若源文件更新，请以设计稿为准并同步修订 frontmatter 与正文。*
