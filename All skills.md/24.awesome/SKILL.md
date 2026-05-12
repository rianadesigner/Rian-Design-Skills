---
name: awesome-design-md
description: >-
  VoltAgent「Awesome Design MD」策展库：各品牌/产品的 Stitch 风格 DESIGN.md（配色、字体、组件、布局、响应式与 Agent 提示）。
  需要「像某站一样」的像素级参考时，从 design-md/<站点>/ 取 DESIGN.md；见仓库内 README.md 与 CONTRIBUTING.md。
---

# 24 · Awesome Design MD（`awesome-design-md`）

## 这是什么

本目录为上游 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 的本地副本（`design-md/` 下为各站点子目录）。

每个站点通常包含：

| 文件 | 用途 |
|------|------|
| `DESIGN.md` | 给 Agent 读的设计系统正文（Stitch DESIGN.md 风格） |
| `README.md` | 站点说明 |
| `preview.html` / `preview-dark.html` | 色板与组件预览（浏览器打开） |

## 何时用

- 用户指定「做成 Vercel / Linear / Stripe 那种观感」→ 打开对应目录的 `DESIGN.md`，按其中 Token 与规则实现。
- 与 `AGENTS.md` 配合：把选中的 `DESIGN.md` 放进项目根或 `docs/`，让实现阶段始终引用同一套视觉规范。

## 路径示例（均相对于本包根目录 `All skills.md/24.awesome/`）

- `design-md/vercel/DESIGN.md`
- `design-md/linear.app/DESIGN.md`
- `design-md/stripe/DESIGN.md`

完整列表见根目录 **`README.md`** 中的 **Collection** 章节。

## 更新上游

```bash
cd "All skills.md/24.awesome" && git pull
```

（本目录为 `git clone` 结果，含 `.git`。）
