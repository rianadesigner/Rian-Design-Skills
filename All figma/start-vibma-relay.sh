#!/usr/bin/env bash
# Vibma MCP 依赖本机 WebSocket 中继；未运行时会出现：
# Relay not reachable on port 3055. Start the relay first, then connect.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT/vibma"
export VIBMA_PORT="${VIBMA_PORT:-3055}"
echo "Starting Vibma relay on port ${VIBMA_PORT} (keep this terminal open)"
echo "Self-check: curl -s http://127.0.0.1:${VIBMA_PORT}/channels"
exec npm run socket
