# `@iflow.cn/iflow-design`

心流（iFlow）设计系统 **单 npm 包**：内含 **运行时 Token CSS**（含 `design-specs` 同步生成的 `iflow.component-tokens.css`、`tokens.json`）与 **React 组件**。安装一次即可，`npm publish` **只需发这一包**。

**版本说明：** **1.x** 与早前 npm 上的 **`0.1.x`（旧用途）无兼容约定**；若曾依赖旧用法，勿直接升级。

## 安装

```bash
npm install @iflow.cn/iflow-design react react-dom
```

## 使用组件

```tsx
import { Button } from "@iflow.cn/iflow-design";
```

## 引入样式（CSS）

### 推荐：一行全部样式

在项目入口：

```tsx
import "@iflow.cn/iflow-design/styles";
```

包含：`iflow.tokens.css`、`iflow.component-tokens.css`、组件 `dist/index.css`。

### 按需拆分

```tsx
import "@iflow.cn/iflow-design/css";
import "@iflow.cn/iflow-design/component-tokens";
import "@iflow.cn/iflow-design/dist/index.css";
```

若不需要由 MD frontmatter 生成的变量，可不引 `component-tokens`。

### 机器可读 token

应用或脚本可读 `tokens.json`（随包安装）：

```js
import meta from "@iflow.cn/iflow-design/tokens.json" assert { type: "json" };
```

（具体语法取决于你的 Node/Bundler 对 JSON import 的支持。）

**本仓库维护：** 根目录执行 `npm run sync`（读 `design-specs/*.md` 更新 CSS / `tokens.json`），再 `npm run build`（tsup）。
