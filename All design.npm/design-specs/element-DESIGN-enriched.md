---
version: "1.2"
name: "基础元素 Element（心流 · 组件库 · Figma）"
description: >-
  设计系统「词元 / 颜色 / 字体 / 尺寸 / 间距 / 高度 / 圆角 / 描边 / 投影」 foundation 文档，
  供 vibe-design / AI 生成界面时对齐全局 token；与《心流 · 组件库》画布「✅ 元素 Element」一致时以设计稿为准。
source:
  figma: "https://www.figma.com/design/ErWWXrlAhgsY2aXyy8WNNq/%E5%BF%83%E6%B5%81-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=0-25"
  pageCanvas: "0:25"
  pageName: "✅ 元素 Element"
variablesSnapshot:
  fileKey: "ErWWXrlAhgsY2aXyy8WNNq"
  exportedAt: "2026-05-13"
  method: "Figma Plugin API getLocalVariables() · Cursor MCP use_figma（本文 §11 与 frontmatter 同步）"
  totalLocalVariables: 292
  collections:
    - { name: Palette Colors, count: 160 }
    - { name: Colors, count: 28 }
    - { name: Corner, count: 9 }
    - { name: Typography, count: 17 }
    - { name: Size, count: 21 }
    - { name: Space, count: 14 }
    - { name: Height, count: 4 }
    - { name: Border, count: 4 }
    - { name: Shadow, count: 30 }
    - { name: Diver, count: 5 }
docFrames:
  tokenNaming: "0:3537"
  color: "0:137"
  typography: "0:917"
  size: "0:1682"
  spacing: "0:2306"
  height: "0:4334"
  radius: "0:2740"
  stroke: "0:4512"
  elevation: "0:3072"
  coreColorsBoard: "0:5874"
foundations:
  baseUnitPx: 4
  spacingRhythm: "以 4 为倍数递进（画布「变量」说明与 gap / sizeUnit 表一致）"
---

<!-- 以下为人类可读语义层；与上方 YAML 冲突时以 Figma 与高置信 token 校准后的版本为准。 -->

# Design System: 基础元素 Element（心流 · 组件库）

**来源：** [Figma — 心流 · 组件库 · ✅ 元素 Element](https://www.figma.com/design/ErWWXrlAhgsY2aXyy8WNNq/%E5%BF%83%E6%B5%81-%E7%BB%84%E4%BB%B6%E5%BA%93?node-id=0-25)  
**Page / Canvas：** `0:25` · **✅ 元素 Element**

本页为组件库 **原子层与设计令牌说明**：在长画布上水平排列多块文档 Frame（均以 `.` 前缀命名），并在画布其它区域挂载示意组件（表格行控件、分页等）。下列 Frame ID 便于在设计稿内检索或与 MCP `get_metadata` 对齐。

| 文档主题 | Frame 名称（画布） | Node ID |
|---------|-------------------|---------|
| 词元命名规则 | `.词元` | `0:3537` |
| 颜色语义 | `.颜色` | `0:137` |
| 字体与字号阶梯 | `.字体` | `0:917` |
| 尺寸（padding/margin 语义） | `.尺寸` | `0:1682` |
| 间距（gap） | `.间距` | `0:2306` |
| 组件高度档位 | `.高度` | `0:4334` |
| 圆角原则与案例 | `.圆角` | `0:2740` |
| 描边 | `.描边` | `0:4512` |
| 投影 | `.投影` | `0:3072` |
| 色板总览（栅格展示） | `Core colors` | `0:5874` |

---

## 1. 词元 Token（`.词元`）

- **定位：** 统一「组件尺寸命名 ↔ Token 命名 ↔ 示例」的映射规则（画布表格：**组件尺寸命名 / Token 命名 / 示例（圆角、文本、边距）**）。
- **阶梯示例（节选，完整阶梯见设计稿）：**

| 组件尺寸（可读名） | Token 缩写示例 | 关联语义 |
|-------------------|----------------|----------|
| — | `NONE` | 无尺寸档 |
| Extra extra small | `XXXS` | 极小档 |
| Extra small | `XXS` |  |
| Extra small | `XS` |  |
| Small | `SM` | 与小号控件 / `paddingSM` / `borderRadiusSM` 等一致 |
| Default | `Base` | 默认档 |
| — | `MD` | 中间档 |
| Large | `LG` | 大号档 |
| — | `XL` | 特大档 |

实现时请 **以 Figma Variables 面板实际名称为准**；上表反映画布表格结构，便于 AI prompt 与设计对齐。

---

## 2. 颜色（`.颜色` · `Core colors`）

- **`.颜色`**：说明预埋文字、反色、链接色等语义角色（画布取样包含 `#111111`、`#CCCCCC`、`#FFFFFF`、`#3D5EFF` 等标签示意）。
- **`Core colors`**（`0:5874`）：按 General / Grid 分区展示核心色板，适合对照全局调色。
- **与其它章节的关系：** 具体组件（如按钮）上的 **`变量/colorPrimary`** 等仍以 Variables 为准；Element 页承担 **语义说明 + 总览**，不要把画布示意图 hex 当作唯一真源而不绑定变量。
- **全量 Variables：** 见 **§11**（含 `Palette Colors` 色阶与 `Colors` 语义色 Light/Dark）。

---

## 3. 字体（`.字体`）

画布「变量」表示例结构：**示例 / 设计令牌 / 值 / 类型 / 描述**。以下为从画布文本层摘录的 **字号阶梯**（实现绑定 Typography / `正文/fontSize` 等变量）。

| 设计令牌（画布示例） | 值 | 类型 | 用途摘要（画布描述节选） |
|---------------------|-----|------|-------------------------|
| `fontFamily`（seed） | SF Pro Text（示例） | seed | 系统字体样式种子 |
| `fontWeight` | 300 | alias | 纤细 |
| `fontWeight` | 400 | alias | 正常 |
| `fontWeight` | 600 | alias | 加粗 |
| `fontSize` | 10 | alias | 最小字，用于角标等 |
| `fontSize` | 12 | alias | 正文（系统主体） |
| `fontSize` | 14 | alias | 弹窗、气泡、抽屉等 |
| `fontSize` | 16 | alias | 小模块卡片标题 |
| `fontSize` | 18 | alias | 页面级卡片标题 |
| `fontSize` | 22 | alias | 小运营内容区主标题 |
| `fontSize` | 28 | alias | 运营内容区主标题 |
| `fontSize` | 32 | alias | 需特别强化信息的标题 |

衍生组合（如 `SM.SM Normal`、`Base Normal`）见 `.字体` Frame 内 **衍生变量**表。

---

## 4. 尺寸（`.尺寸`）

- **构成：** 内边距（padding）、外边距（margin）——「调整元素内部疏密 / 外部疏密」。
- **基准：** `sizeUnit` **4px**，`sizeStep` **4px**（画布变量表）。
- **规则：** 与间距一致，强调 **4px 倍数节奏**。

---

## 5. 间距 · Gap（`.间距`）

**构成：** 行间距（元素上下间距）、列间距（元素左右间距）；画布示意图标注 `rowGap`、`columnGap`。

**Gap 令牌与取值（画布变量表摘录）：**

| 令牌示例 | 值 | 用途摘要（画布） |
|---------|-----|------------------|
| `gapNONE` | 0px | 零距离 |
| `gapXXXS` | 2px | 极小间距 |
| `gapXXS` | 4px | 微小间距 |
| `gapXS` | 8px | 基础间距 |
| `gapSM` | 12px | 中等内容间距 |
| `gap`（画布中单列名「gap」） | 16px | 中等间距（列表等） |
| `gapMD` | 20px | 中等间距 |
| `gapLG` | 24px | 较大区块 |
| `gapXL` | 32px | 大间距 |
| `gapXXL` | 48px | 结构大间距 |

**规则摘录：** 统一性原则（同类组件间距一致）、邻近性原则（相关元素更近）。

---

## 6. 高度（`.高度`）

- **用途：** 控制组件或模块垂直占位（画布：**元素定义 / 功能用途**）。
- **细节：** 档位与令牌见 Frame `.高度` 内表格（node `0:4334`）；与词元阶梯 `SM` / `Base` / `LG` 等组合使用。

---

## 7. 圆角（`.圆角`）

**文档主旨（画布正文摘录）：**

- 圆角引导视线聚焦内容，减弱冲突、提升美感；采用 **偏小圆角** 的中性策略。
- **统一性：** 同类组件须 **同一圆角等级**，避免混用。
- **阶梯性：** **外圈圆角 ≥ 内圈圆角**。
- **同心圆：** 当内外间距 **小于 12px** 时，满足 **内圆角半径 + 间距 = 外圆角半径**（同心）。

画布内含 **Radius Case / 圆角案例**（含 `CardCenter`、`.利益点` 等示意）。

---

## 8. 描边（`.描边`）与投影（`.投影`）

- **`.描边`：** 线宽与语义边框规则（见 Frame `0:4512`）。
- **`.投影`：** 阴影层级与「控件投影」叙事（画布说明：**模拟光线、区分组件层次**）。

---

## 9. YAML `foundations` 与工程映射提示

| YAML 键 | 含义 |
|---------|------|
| `foundations.baseUnitPx` | **4**，全局步进基数 |
| `foundations.spacingRhythm` | 与设计稿「以 4 为倍数」一致 |

建议在代码中将 `gapXS`、`gapSM`、`fontSize` 等与 **Figma Variables**（如 MCP 中出现的 `--间距/gap-xs` 风格命名以实际库为准）做一层映射表；组件专项文档（如 `button-component-DESIGN-enriched.md`）在其 `colors` / `spacing` 中 **引用同一变量集合**。

---

## 10. For vibe-design（短清单）

1. **先定词元档：** NONE → XXXS → … → XL，组件尺寸名与 Token 缩写一致。  
2. **颜色：** 语义角色对齐 `.颜色` / `Core colors`，变量名优先于孤立 hex；**落地数值以 §11 表格为准**。  
3. **排版：** `fontFamily` / `fontWeight` / `fontSize` 走画布表格阶梯，正文主线多为 **12**（§11 `Typography`）。  
4. **间距：** `gap*` 使用上表 **0–48px** 阶梯；大块留白用 `gapXL` / `gapXXL`（§11 `Space`）。  
5. **圆角：** 小圆角 + 统一 / 阶梯 / 同心圆三条原则必遵守（§11 `Corner`）。

---

## 11. Figma Variables 全量快照（本地文件）

以下为 **《心流 · 组件库》文件**（`ErWWXrlAhgsY2aXyy8WNNq`）内 **`figma.variables.getLocalVariables()`** 枚举结果：按 **Variable Collection** 分组。  
多 Mode 集合表中列出各 Mode 列；`FLOAT` 数值单位为 **px**（与画布一致）；`→ \`变量名\`` 表示 **别名引用**（VARIABLE_ALIAS）。  
若之后在 Figma 中增删变量，请在 Cursor 中重新执行 **`use_figma` 导出脚本** 并替换本节表格。

### Palette Colors（160）

| Variable | Type | Mode 1 |
|---|---|---|
| `Blue/10` | COLOR | #f0fbff |
| `Blue/100` | COLOR | #0a334d |
| `Blue/20` | COLOR | #f0fbff |
| `Blue/30` | COLOR | #cff1ff |
| `Blue/40` | COLOR | #a3e3ff |
| `Blue/50` | COLOR | #72c9f2 |
| `Blue/60` | COLOR | #45b0e5 |
| `Blue/70` | COLOR | #308ebf |
| `Blue/80` | COLOR | #3b84a8 |
| `Blue/90` | COLOR | #114e73 |
| `Cyan/10` | COLOR | #e4f2f1 |
| `Cyan/100` | COLOR | #01181a |
| `Cyan/20` | COLOR | #cae6e4 |
| `Cyan/30` | COLOR | #9ad9d6 |
| `Cyan/40` | COLOR | #6eccc9 |
| `Cyan/50` | COLOR | #23b2b2 |
| `Cyan/60` | COLOR | #158b8c |
| `Cyan/70` | COLOR | #158b8c |
| `Cyan/80` | COLOR | #0a6466 |
| `Cyan/90` | COLOR | #033d40 |
| `DustRed/10` | COLOR | #fff1f0 |
| `DustRed/100` | COLOR | #5c0009 |
| `DustRed/20` | COLOR | #ffd1d1 |
| `DustRed/30` | COLOR | #ffa6a7 |
| `DustRed/40` | COLOR | #ff7a7d |
| `DustRed/50` | COLOR | #ff4f56 |
| `DustRed/60` | COLOR | #f5222d |
| `DustRed/70` | COLOR | #cf131e |
| `DustRed/80` | COLOR | #a80713 |
| `DustRed/90` | COLOR | #82000c |
| `Error/10` | COLOR | #fff1f0 |
| `Error/100` | COLOR | #59070c |
| `Error/20` | COLOR | #ffeeed |
| `Error/30` | COLOR | #ffc4c2 |
| `Error/40` | COLOR | #ff9996 |
| `Error/50` | COLOR | #ff6d6b |
| `Error/60` | COLOR | #f23c3c |
| `Error/70` | COLOR | #cc292b |
| `Error/80` | COLOR | #a6191d |
| `Error/90` | COLOR | #800d11 |
| `Gold/10` | COLOR | #fffbf0 |
| `Gold/100` | COLOR | #664003 |
| `Gold/20` | COLOR | #fff6e0 |
| `Gold/30` | COLOR | #ffe9b5 |
| `Gold/40` | COLOR | #ffdb8a |
| `Gold/50` | COLOR | #ffcc5e |
| `Gold/60` | COLOR | #ffbb33 |
| `Gold/70` | COLOR | #d99921 |
| `Gold/80` | COLOR | #b37912 |
| `Gold/90` | COLOR | #8c5b07 |
| `Green/10` | COLOR | #f7f7e9 |
| `Green/100` | COLOR | #1a1f00 |
| `Green/20` | COLOR | #e9ebb7 |
| `Green/30` | COLOR | #dade87 |
| `Green/40` | COLOR | #cad15c |
| `Green/50` | COLOR | #bac435 |
| `Green/60` | COLOR | #a9b812 |
| `Green/70` | COLOR | #849107 |
| `Green/80` | COLOR | #5f6b00 |
| `Green/90` | COLOR | #3c4500 |
| `Lime/10` | COLOR | #fbffed |
| `Lime/100` | COLOR | #2a4000 |
| `Lime/20` | COLOR | #f1ffc2 |
| `Lime/30` | COLOR | #e6ff96 |
| `Lime/40` | COLOR | #cef266 |
| `Lime/50` | COLOR | #b7e639 |
| `Lime/60` | COLOR | #a0d911 |
| `Lime/70` | COLOR | #7fb305 |
| `Lime/80` | COLOR | #618c00 |
| `Lime/90` | COLOR | #456600 |
| `Magenta/10` | COLOR | #fff0f5 |
| `Magenta/100` | COLOR | #59022c |
| `Magenta/20` | COLOR | #ffdeea |
| `Magenta/30` | COLOR | #ffb3d1 |
| `Magenta/40` | COLOR | #ff87b8 |
| `Magenta/50` | COLOR | #ff5ca0 |
| `Magenta/60` | COLOR | #f24e84 |
| `Magenta/70` | COLOR | #cc1d6b |
| `Magenta/80` | COLOR | #a60f54 |
| `Magenta/90` | COLOR | #80053f |
| `Orange/10` | COLOR | #fff6f0 |
| `Orange/100` | COLOR | #662203 |
| `Orange/20` | COLOR | #ffede0 |
| `Orange/30` | COLOR | #ffd3b5 |
| `Orange/40` | COLOR | #ffb88a |
| `Orange/50` | COLOR | #ff9b5e |
| `Orange/60` | COLOR | #ff7e33 |
| `Orange/70` | COLOR | #d96221 |
| `Orange/80` | COLOR | #b34812 |
| `Orange/90` | COLOR | #8c3307 |
| `Purple/10` | COLOR | #f7f0ff |
| `Purple/100` | COLOR | #160338 |
| `Purple/20` | COLOR | #f1e6ff |
| `Purple/30` | COLOR | #d3b5f7 |
| `Purple/40` | COLOR | #b183eb |
| `Purple/50` | COLOR | #9157de |
| `Purple/60` | COLOR | #722ed1 |
| `Purple/70` | COLOR | #561dab |
| `Purple/80` | COLOR | #391085 |
| `Purple/90` | COLOR | #28075e |
| `Secondary/10` | COLOR | #fbfbfb |
| `Secondary/100` | COLOR | #000000 |
| `Secondary/20` | COLOR | #f8f8f8 |
| `Secondary/30` | COLOR | #f0f0f0 |
| `Secondary/40` | COLOR | #d9d9d9 |
| `Secondary/50` | COLOR | #bfbfbf |
| `Secondary/60` | COLOR | #a0a0a0 |
| `Secondary/70` | COLOR | #8c8c8c |
| `Secondary/80` | COLOR | #434343 |
| `Secondary/90` | COLOR | #1f1f1f |
| `Success/10` | COLOR | #f1fff0 |
| `Success/100` | COLOR | #043306 |
| `Success/20` | COLOR | #ecffeb |
| `Success/30` | COLOR | #b8f2b6 |
| `Success/40` | COLOR | #88e685 |
| `Success/50` | COLOR | #5bd959 |
| `Success/60` | COLOR | #31cc31 |
| `Success/70` | COLOR | #1fa621 |
| `Success/80` | COLOR | #128015 |
| `Success/90` | COLOR | #08590b |
| `Taobao/10` | COLOR | #ffefe6 |
| `Taobao/100` | COLOR | #661b00 |
| `Taobao/20` | COLOR | #ffccad |
| `Taobao/30` | COLOR | #ffaf82 |
| `Taobao/40` | COLOR | #ff9057 |
| `Taobao/50` | COLOR | #ff712b |
| `Taobao/60` | COLOR | #ff5500 |
| `Taobao/70` | COLOR | #d44f0d |
| `Taobao/80` | COLOR | #b33400 |
| `Taobao/90` | COLOR | #8c2700 |
| `Warning/10` | COLOR | #fff4e6 |
| `Warning/100` | COLOR | #662e00 |
| `Warning/20` | COLOR | #ffdbad |
| `Warning/30` | COLOR | #ffc682 |
| `Warning/40` | COLOR | #ffaf57 |
| `Warning/50` | COLOR | #ff982b |
| `Warning/60` | COLOR | #ff8000 |
| `Warning/70` | COLOR | #d96900 |
| `Warning/80` | COLOR | #b35400 |
| `Warning/90` | COLOR | #8c4100 |
| `Yellow/10` | COLOR | #fffeed |
| `Yellow/100` | COLOR | #594c00 |
| `Yellow/20` | COLOR | #fffcc2 |
| `Yellow/30` | COLOR | #fff996 |
| `Yellow/40` | COLOR | #fff46b |
| `Yellow/50` | COLOR | #ffee40 |
| `Yellow/60` | COLOR | #fadb14 |
| `Yellow/70` | COLOR | #ccb606 |
| `Yellow/80` | COLOR | #a69100 |
| `Yellow/90` | COLOR | #806e00 |
| `iFlowBlue/10` | COLOR | #f2f3ff |
| `iFlowBlue/100` | COLOR | #181c6b |
| `iFlowBlue/20` | COLOR | #e0e3ff |
| `iFlowBlue/30` | COLOR | #c5caff |
| `iFlowBlue/40` | COLOR | #9fa6ff |
| `iFlowBlue/50` | COLOR | #7a83ff |
| `iFlowBlue/60` | COLOR | #5057f6 |
| `iFlowBlue/70` | COLOR | #3e45d6 |
| `iFlowBlue/80` | COLOR | #2f35b3 |
| `iFlowBlue/90` | COLOR | #23288f |

### Colors（28）

| Variable | Type | Light | Dark |
|---|---|---|---|
| `变量/colorActive` | COLOR | #2944d9 | #2944d9 |
| `变量/colorBgActive` | COLOR | #f5f7ff | #f5f7ff |
| `变量/colorGlobal` | COLOR | #ff0037 | #ff0037 |
| `变量/colorHover` | COLOR | #94a9ff | #94a9ff |
| `变量/colorIcon` | COLOR | #999999 | #999999 |
| `变量/colorIconHover` | COLOR | #000000 | #000000 |
| `变量/colorPrimary` | COLOR | #5057f6 | #5057f6 |
| `变量/colorSecondary` | COLOR | #f2f3ff | #f2f3ff |
| `变量/colorTaobao` | COLOR | #ff5500 | #ff5500 |
| `变量/colorWhite` | COLOR | #ffffff | #ffffff |
| `情绪/colorError` | COLOR | #f54a45 | #f54a45 |
| `情绪/colorInfo` | COLOR | #2b58ff | #2b58ff |
| `情绪/colorSuccess` | COLOR | #00b324 | #00b324 |
| `情绪/colorWarning` | COLOR | #ff8f1f | #ff8f1f |
| `描边/colorBorder` | COLOR | #f2f3f5 | #f2f3f5 |
| `描边/colorBorderSecondary` | COLOR | #d6d9e3 | #d6d9e3 |
| `描边/colorBorderThird` | COLOR | #d9d9d9 | #d9d9d9 |
| `描边/colorSplit` | COLOR | #ebeef5 | #ebeef5 |
| `数据/colorDown` | COLOR | #2c968a | #2c968a |
| `数据/colorUp` | COLOR | #f54a45 | #f54a45 |
| `文字和图标/TextQuaternary` | COLOR | #999999 | #999999 |
| `文字和图标/TextSecondary` | COLOR | #333333 | #333333 |
| `文字和图标/TextSolid` | COLOR | #ffffff | #ffffff |
| `文字和图标/TextTertiary` | COLOR | #666666 | #666666 |
| `文字和图标/colorLink` | COLOR | #2927a8 | #2927a8 |
| `文字和图标/colorText` | COLOR | #111111 | #111111 |
| `背景/colorBgActive` | COLOR | #f5f7ff | #f5f7ff |
| `背景/colorFillQuaternary` | COLOR | #f8f8f8 | #f8f8f8 |

### Corner（9）

| Variable | Type | 1 |
|---|---|---|
| `radius/LG` | FLOAT | 8 |
| `radius/NONE` | FLOAT | 0 |
| `radius/SM` | FLOAT | 2 |
| `radius/XL` | FLOAT | 12 |
| `radius/XS` | FLOAT | 1 |
| `radius/XXL` | FLOAT | 16 |
| `radius/XXXL` | FLOAT | 24 |
| `radius/base` | FLOAT | 4 |
| `radius/full` | FLOAT | 999 |

### Typography（17）

| Variable | Type | Mode 1 |
|---|---|---|
| `H1/fontSize` | FLOAT | 32 |
| `H1/lineHeight` | FLOAT | 40 |
| `H2/fontSize` | FLOAT | 28 |
| `H2/lineHeight` | FLOAT | 36 |
| `H3/fontSize` | FLOAT | 22 |
| `H3/lineHeight` | FLOAT | 30 |
| `H4/fontSize` | FLOAT | 18 |
| `H4/lineHeight` | FLOAT | 26 |
| `H5/fontSize` | FLOAT | 16 |
| `H5/lineHeight` | FLOAT | 24 |
| `fontFamily` | STRING | PingFang SC |
| `小标题/fontSize` | FLOAT | 14 |
| `小标题/lineHeight` | FLOAT | 22 |
| `正文/fontSize` | FLOAT | 12 |
| `正文/lineHeight` | FLOAT | 20 |
| `辅助内容/fontSize` | FLOAT | 10 |
| `辅助内容/lineHeight` | FLOAT | 18 |

### Size（21）

| Variable | Type | Mode 1 |
|---|---|---|
| `margin/LG` | FLOAT | 24 |
| `margin/MD` | FLOAT | 20 |
| `margin/NONE` | FLOAT | 0 |
| `margin/SM` | FLOAT | 12 |
| `margin/XL` | FLOAT | 32 |
| `margin/XS` | FLOAT | 8 |
| `margin/XXL` | FLOAT | 48 |
| `margin/XXS` | FLOAT | 4 |
| `margin/XXXS` | FLOAT | 2 |
| `margin/base` | FLOAT | 16 |
| `padding/LG` | FLOAT | 24 |
| `padding/MD` | FLOAT | 20 |
| `padding/NONE` | FLOAT | 0 |
| `padding/SM` | FLOAT | 12 |
| `padding/XL` | FLOAT | 32 |
| `padding/XS` | FLOAT | 8 |
| `padding/XXL` | FLOAT | 40 |
| `padding/XXS` | FLOAT | 4 |
| `padding/XXXL` | FLOAT | 48 |
| `padding/XXXS` | FLOAT | 2 |
| `padding/base` | FLOAT | 16 |

### Space（14）

| Variable | Type | Mode 1 |
|---|---|---|
| `base/sizeStep` | FLOAT | 4 |
| `base/sizeUnit` | FLOAT | 4 |
| `gap/LG` | FLOAT | 24 |
| `gap/MD` | FLOAT | 20 |
| `gap/NONE` | FLOAT | 0 |
| `gap/SM` | FLOAT | 12 |
| `gap/XL` | FLOAT | 32 |
| `gap/XS` | FLOAT | 8 |
| `gap/XXL` | FLOAT | 48 |
| `gap/XXS` | FLOAT | 4 |
| `gap/XXXS` | FLOAT | 2 |
| `gap/base` | FLOAT | 16 |
| `layout/columnGap` | FLOAT | → `gap/base` |
| `layout/rowGap` | FLOAT | → `gap/base` |

### Height（4）

| Variable | Type | Mode 1 |
|---|---|---|
| `control/LG` | FLOAT | 36 |
| `control/SM` | FLOAT | 24 |
| `control/XS` | FLOAT | 16 |
| `control/base` | FLOAT | 32 |

### Border（4）

| Variable | Type | Mode 1 |
|---|---|---|
| `lineWidth/Light` | FLOAT | 0.5 |
| `lineWidth/base` | FLOAT | 1 |
| `lineWidth/bold` | FLOAT | 2 |
| `lineWidth/extraBold` | FLOAT | 3 |

### Shadow（30）

| Variable | Type | Mode 1 |
|---|---|---|
| `boxShadow/blur` | FLOAT | 12 |
| `boxShadow/color` | COLOR | rgba(0,0,0,0.03999999910593033) |
| `boxShadow/offsetX` | FLOAT | 0 |
| `boxShadow/offsetY` | FLOAT | 4 |
| `boxShadow/spread` | FLOAT | 0 |
| `boxShadowSecondary/blur` | FLOAT | 16 |
| `boxShadowSecondary/color` | COLOR | rgba(0,0,0,0.11999999731779099) |
| `boxShadowSecondary/offsetX` | FLOAT | 0 |
| `boxShadowSecondary/offsetY` | FLOAT | 6 |
| `boxShadowSecondary/spread` | FLOAT | 0 |
| `boxShadowTertiary/blur` | FLOAT | 2 |
| `boxShadowTertiary/color` | COLOR | rgba(0,0,0,0.029999999329447746) |
| `boxShadowTertiary/offsetX` | FLOAT | 0 |
| `boxShadowTertiary/offsetY` | FLOAT | 1 |
| `boxShadowTertiary/spread` | FLOAT | 0 |
| `focusError/blur` | FLOAT | 0 |
| `focusError/color` | COLOR | #fff1f0 |
| `focusError/offsetX` | FLOAT | 0 |
| `focusError/offsetY` | FLOAT | 0 |
| `focusError/spread` | FLOAT | 2 |
| `focusPrimary/blur` | FLOAT | 0 |
| `focusPrimary/color` | COLOR | rgba(61,126,255,0.10000000149011612) |
| `focusPrimary/offsetX` | FLOAT | 0 |
| `focusPrimary/offsetY` | FLOAT | 0 |
| `focusPrimary/spread` | FLOAT | 2 |
| `focusWarning/blur` | FLOAT | 0 |
| `focusWarning/color` | COLOR | #fffbe6 |
| `focusWarning/offsetX` | FLOAT | 0 |
| `focusWarning/offsetY` | FLOAT | 0 |
| `focusWarning/spread` | FLOAT | 2 |

### Diver（5）

| Variable | Type | Default |
|---|---|---|
| `Dashed` | BOOLEAN | false |
| `Size/0-5` | FLOAT | 0.5 |
| `Size/1` | FLOAT | 1 |
| `Size/2` | FLOAT | 2 |
| `Type` | STRING | horizontal |

---

*§1–§10：本文档依据 Figma MCP `get_metadata` 对 Page `0:25` 的结构与文本节点抽样。**§11**：本地 Variables 通过 `use_figma` / Plugin API 导出（2026-05-13）；若设计稿变更请重新导出并替换 §11 与 frontmatter `variablesSnapshot`。*
