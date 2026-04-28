#!/usr/bin/env bash
set -euo pipefail

# Install Bun if it is not already installed.
if ! command -v bun >/dev/null 2>&1; then
  echo "Installing Bun..."
  curl -fsSL https://bun.sh/install | bash
  BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
  export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Ensure Bun is available in this script run.
if ! command -v bun >/dev/null 2>&1; then
  echo "Error: bun install failed or was not found on PATH." >&2
  exit 1
fi

# Install dependencies and start the app.
echo "Installing dependencies..."
bun install

echo "Starting Gimmick..."
bun start
