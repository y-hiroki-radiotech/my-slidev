---
name: pdf-to-markdown
description: pdfフォルダ内のPDFファイルをgemini-cliで読み取り、Markdown形式に変換してpdf-summaryディレクトリに保存する。
---

# PDF to Markdown変換

pdfフォルダ内のPDFをgemini-cliで処理し、Markdown形式でpdf-summaryディレクトリに保存する。

## ワークフロー

### 1. PDFファイルの確認

pdfフォルダ内のPDFファイル一覧を取得する。

```bash
ls -la pdf/*.pdf
```

### 2. 対象PDFの選択

AskUserQuestionツールを使用する。

- `header`: "PDF選択"
- `question`: "どのPDFファイルを読み取りますか？"
- `options`:
  - pdfフォルダ内の各PDFファイルに対して:
    - `label`: "ファイル名.pdf"
    - `description`: "ファイルサイズ、更新日時などの情報"

ファイルが多数ある場合は「その他（ファイル名を入力）」オプションも追加する。

### 3. gemini-cliによるPDF処理

選択されたPDFをgemini-cliで読み取り、Markdown形式に変換する。

```bash
gemini -p "以下のPDFファイルの内容を読み取り、構造を保持したMarkdown形式で出力してください。見出し、箇条書き、表などの構造は適切にMarkdown記法に変換してください。" -f "pdf/選択されたファイル.pdf"
```

gemini-cliの出力を一時ファイルに保存する。

### 4. 出力ディレクトリの準備

pdf-summaryディレクトリが存在しない場合は作成する。

```bash
mkdir -p pdf-summary
```

### 5. ファイル名の決定

AskUserQuestionツールを使用する。

- `header`: "ファイル名"
- `question`: "Markdownファイルの名前を入力してください（.mdは自動付与）"
- `options`:
  - `label`: "元のPDF名を使用"
  - `description`: "例: original-filename.md"
  - `label`: "日付付きで保存"
  - `description`: "例: 2024-01-15_original-filename.md"
  - `label`: "カスタム名を入力"
  - `description`: "任意のファイル名を指定"

「カスタム名を入力」を選択した場合は、追加でファイル名を入力してもらう。

### 6. Markdownファイルの保存

決定したファイル名でpdf-summaryディレクトリに保存する。

```bash
mv tmp/converted.md pdf-summary/決定したファイル名.md
```

### 7. 完了確認

保存完了後、以下の情報を表示する。

- 保存先のフルパス
- ファイルサイズ
- 変換されたMarkdownのプレビュー（先頭部分）

```bash
echo "保存完了: pdf-summary/ファイル名.md"
head -50 pdf-summary/ファイル名.md
```

## 注意事項

- gemini-cliが事前にインストール・設定されていることを確認する
- PDFのサイズが大きい場合、処理に時間がかかる可能性がある
- 画像が多いPDFは、テキスト部分のみ抽出される
- 日本語PDFの場合も適切に処理される
