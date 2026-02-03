#!/bin/bash

# スライドをPDFにエクスポート
# 使用方法: bash scripts/export-pdf.sh [スライドファイル]
# 例: bash scripts/export-pdf.sh slides.md

SLIDE_FILE=${1:-slides.md}

if [ ! -f "$SLIDE_FILE" ]; then
    echo "❌ Error: File '$SLIDE_FILE' not found"
    exit 1
fi

echo "Exporting $SLIDE_FILE to PDF..."
npm run export -- "$SLIDE_FILE"

if [ $? -eq 0 ]; then
    echo "✅ PDF export successful"
    # PDFファイルの場所を表示
    PDF_FILE="${SLIDE_FILE%.md}-export.pdf"
    if [ -f "$PDF_FILE" ]; then
        echo "📄 PDF file: $PDF_FILE"
    fi
else
    echo "❌ PDF export failed"
    exit 1
fi
