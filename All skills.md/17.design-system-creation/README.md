# Design System Creation（ClawHub 套装）

主技能来源：[wpank/design-system-creation](https://clawhub.ai/wpank/design-system-creation)（v1.0.0，MIT-0）。

本目录通过 ClawHub 官方 ZIP 接口下载并解压；下载地址形如：

`https://wry-manatee-359.convex.site/api/v1/download?slug=<slug>`

## 目录结构

| 路径 | 说明 |
|------|------|
| `design-system-creation/` | **元技能**：从 0 搭建有个性设计系统的 6 步流程（审美文档 → Token → 字体 → Surface/CVA → 动效 → 加载态） |
| `related-skills/distinctive-design-systems/` | 元技能 Step 1–3、5 中引用的「审美与 Token」细则 |
| `related-skills/design-system-components/` | Step 4：Surface 等组件与 CVA 模式 |
| `related-skills/loading-state-patterns/` | Step 6：Skeleton / shimmer |
| `related-skills/animated-financial-display/` | 表格中列出的数字动效相关 skill |

## 与 SKILL.md 中路径的对应关系

元技能正文里写的 `Read: ai/skills/design-systems/...` 是 **OpenClaw 安装后的约定路径**。在本仓库中，请改为阅读：

- `related-skills/distinctive-design-systems/SKILL.md`
- `related-skills/design-system-components/SKILL.md`
- `related-skills/loading-state-patterns/SKILL.md`
- `related-skills/animated-financial-display/SKILL.md`

## 未能自动拉取的子技能

元技能表格中的 **`financial-data-visualization`**（图表主题）在相同 `slug` 下载接口下 **未返回有效包**（可能 slug 不同或未上架）。若你在 ClawHub 上找到对应页面，可自行下载 ZIP 并放入例如 `related-skills/financial-data-visualization/`。

## 使用提示

1. 做任务时优先打开 **`design-system-creation/SKILL.md`**，再按需 `@` 各 `related-skills/.../SKILL.md`。  
2. 技术栈假设多为 **React + Tailwind + CVA**；子技能 README 内可能有额外说明。  
3. 若使用 README 里的 `npx clawhub@latest install ...`，请先确认命令与包来源可信后再执行。
