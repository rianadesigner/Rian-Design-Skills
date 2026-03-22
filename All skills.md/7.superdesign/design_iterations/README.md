# SuperDesign · design_iterations

**SuperDesign Canvas** only loads **`.html`** and **`.svg`** files from this folder (not `.css` alone).

## Naming

Use `{name}_{n}.html` with a unique `n`, e.g. `calculator_1.html`, `login_2.html`.

## Fix: “No design files found”

If Canvas is empty:

1. Ensure this folder exists: `.superdesign/design_iterations/`
2. Add at least one `.html` or `.svg` here (or ask the agent to write one).
3. Reload Canvas or save a file in this folder to trigger the file watcher.

## Seeded files (repo default)

- `calculator_1.html` — interactive calculator (copy of root `calculator-ui.html`)
- `ledger_home_1.html` — 记账 App 首页（copy of root `记账-app-home.html`）
