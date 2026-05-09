#!/usr/bin/env bash
# Cursor 拉起 MCP 时 PATH 往往不含 nvm/Homebrew → spawn npx ENOENT。
# 优先使用全局安装的 marquex-mcp（npm install -g @ali/marquex-mcp），否则回退 npx。
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:${HOME}/.local/bin:${PATH:-}"

if [[ -f "${HOME}/.nvm/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  source "${HOME}/.nvm/nvm.sh"
fi
if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env)"
fi

if command -v marquex-mcp >/dev/null 2>&1; then
  exec marquex-mcp "$@"
fi

if ! command -v npx >/dev/null 2>&1; then
  echo "marquex-mcp: 未找到全局 marquex-mcp 且 npx 不在 PATH。请先: npm install -g @ali/marquex-mcp" >&2
  exit 127
fi

exec npx --yes @ali/marquex-mcp@latest "$@"
