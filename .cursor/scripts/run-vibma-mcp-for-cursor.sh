#!/usr/bin/env bash
# 启动 Vibma MCP；若 3055 上无 WebSocket relay 则先启动（与「Relay not reachable on port 3055」相关）
# 优先：本仓库 figma/vibma 下 npm run socket；否则 npx @ufira/vibma-tunnel@latest
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:${HOME}/.local/bin:${PATH:-}"

VIBMA_PORT="${VIBMA_PORT:-3055}"
export VIBMA_PORT

if [[ -f "${HOME}/.nvm/nvm.sh" ]]; then
  # shellcheck source=/dev/null
  source "${HOME}/.nvm/nvm.sh"
fi
if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env)"
fi

find_repo_from_walk() {
  local d
  d="$(pwd -P 2>/dev/null || pwd)"
  local -i i
  for ((i = 0; i < 12; i++)); do
    if [[ -f "${d}/figma/vibma/package.json" || -f "${d}/figma/vibma/packages/core/dist/mcp.cjs" ]]; then
      echo "${d}"
      return 0
    fi
    if [[ "${d}" == / ]]; then
      break
    fi
    d="$(cd "${d}/.." && pwd -P 2>/dev/null || echo /)"
  done
  return 1
}

# 1) 从脚本位置推断
REPO=""
if [[ -n "${BASH_SOURCE[0]:-}" ]]; then
  _SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P 2>/dev/null || echo "")"
  if [[ -n "${_SCRIPT_DIR}" ]]; then
    _CAND="$(cd "${_SCRIPT_DIR}/../.." && pwd -P 2>/dev/null || echo "")"
    if [[ -f "${_CAND}/figma/vibma/package.json" || -f "${_CAND}/figma/vibma/packages/core/dist/mcp.cjs" ]]; then
      REPO="${_CAND}"
    fi
  fi
  unset _SCRIPT_DIR _CAND
fi
if [[ -z "${REPO}" ]]; then
  if REPO="$(find_repo_from_walk 2>/dev/null)"; then
    :
  else
    REPO=""
  fi
fi

MCP="${REPO:+$REPO/figma/vibma/packages/core/dist/mcp.cjs}"

RELAY_LOG="${TMPDIR:-/tmp}/vibma-relay.log"

relay_is_up() {
  if command -v nc >/dev/null 2>&1; then
    if nc -z 127.0.0.1 "${VIBMA_PORT}" 2>/dev/null; then
      return 0
    fi
  fi
  if lsof -nP -iTCP:"${VIBMA_PORT}" -sTCP:LISTEN 2>/dev/null | grep -q .; then
    return 0
  fi
  return 1
}

ensure_relay() {
  if relay_is_up; then
    return 0
  fi
  echo "Vibma: 正在启动 WebSocket relay（127.0.0.1:${VIBMA_PORT}）…" >&2
  if [[ -n "${REPO}" && -f "${REPO}/figma/vibma/package.json" && -d "${REPO}/figma/vibma/node_modules" ]]; then
    (
      cd "${REPO}/figma/vibma" || exit 1
      export VIBMA_PORT
      nohup npm run socket </dev/null >>"${RELAY_LOG}" 2>&1 &
    ) || true
  else
    (
      export VIBMA_PORT
      nohup npx -y @ufira/vibma-tunnel@latest </dev/null >>"${RELAY_LOG}" 2>&1 &
    ) || true
  fi
  local -i n=0
  while ((n < 100)); do
    if relay_is_up; then
      echo "Vibma: relay 已监听 ${VIBMA_PORT}（日志: ${RELAY_LOG}）" >&2
      return 0
    fi
    sleep 0.1
    ((n++)) || true
  done
  echo "Vibma: relay 在约 10s 内未就绪，请查看 ${RELAY_LOG} 或手动: npx -y @ufira/vibma-tunnel@latest" >&2
  return 0
}

ensure_relay

if [[ -n "${MCP}" && -f "${MCP}" ]]; then
  exec node "${MCP}" "$@"
fi

echo "Vibma: 使用 npx @ufira/vibma@latest …" >&2
if ! command -v npx >/dev/null 2>&1; then
  echo "Vibma: 未找到 npx。请安装 Node/npm" >&2
  exit 127
fi
exec npx -y @ufira/vibma@latest "$@"
