#!/bin/bash

# 開発サーバーを停止し、一時ファイルを削除
# 使用方法: bash scripts/cleanup.sh

echo "Stopping Slidev server..."
pkill -f "slidev" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Server stopped"
else
    echo "ℹ️  No running server found"
fi

echo "Cleaning up build artifacts..."
rm -rf dist/ .slidev/

echo "✅ Cleanup complete"
