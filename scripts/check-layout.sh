#!/bin/bash

# スライドのレイアウトをチェック（ビルドで検証）
# 使用方法: bash scripts/check-layout.sh

echo "Building slides to check for layout issues..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful - no major layout issues detected"
else
    echo "❌ Build failed - please check the error messages above"
    exit 1
fi
