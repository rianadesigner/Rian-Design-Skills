# opensource-ui

本目录**仅保留**各开源 UI 相关仓库的本地克隆（`vendor-repos/`）。

原先的 Vite + React 演示工程、`node_modules`、构建产物等已全部移除。

## `vendor-repos/` 目录

| 子目录 | 来源仓库（浅克隆） |
|--------|-------------------|
| `shadcn-ui` | shadcn-ui/ui |
| `creative-tim-ui` | creativetimofficial/ui |
| `nuxt-ui` | nuxt/ui |
| `andlabs-ui` | andlabs/ui |
| `shoutem-ui` | shoutem/ui |
| `laravel-ui` | laravel/ui |
| `lovelace-minimalist` | UI-Lovelace-Minimalist/UI |
| `ant-design` | ant-design/ant-design |
| `rancher-ui` | rancher/ui |
| `material-ui` | mui/material-ui |

更新某个仓库：进入对应子目录执行 `git pull`（若使用浅克隆可能需要 `git fetch --unshallow` 再拉取，视需求而定）。
