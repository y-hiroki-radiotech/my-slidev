---
name: prepare-pdf
description: PDF出力用にスライドを最適化し、自動的にPDFを生成する
tools: [Read, Write, Edit, Bash]
---

# PDF出力用最適化

**引数:** なし（現在のslides.md）またはスライドファイルパス

**オプション:**
- `--skip-backup`: バックアップをスキップ（非推奨）
- `--export-only`: 最適化をスキップ、PDF出力のみ実行
- `--theme [theme-name]`: 特定のテーマを使用（デフォルト: default）

**例:**
- （引数なし）現在のslides.mdを最適化
- `pages/abstract-Smith-2024.md`
- `--export-only`
- `--skip-backup`

このスキルは、背景色を白に変更し、文字色を黒系統に調整し、PDF出力を実行します。

## 実行フロー

### ステップ1: 準備とコンテキスト設定

1. タスクコンテキストを確立:
  - 対象ファイル: 引数で指定、または`slides.md`
  - 日付: YYYYMMDD形式
  - プランニングディレクトリ: `.pdf-planning/[日付]-[ファイル名]/`

2. プランニングファイルを作成:
  - `optimization-checklist.md` (最適化チェックリスト)
  - `changes-log.md` (変更履歴)
  - `tasklist.md` (タスクリスト)

### ステップ2: プロジェクト理解

1. `CLAUDE.md`を読み、PDF出力ルールを確認:
  - "PDF用のスライドは背景を白に変更し、文字色も調整"

2. 対象ファイルを読み込み、現状把握:
  - フロントマター設定
  - 背景色設定
  - テーマ設定
  - 文字色使用状況
  - 画像・アイコン使用状況

### ステップ3: バックアップの作成

`--skip-backup`オプションがない場合:

1. git commitでバックアップ:
```bash
git add [対象ファイル]
git commit -m "Backup before PDF optimization: [ファイル名]"
```

2. バックアップファイル作成:
  - `[対象ファイル].backup-[日付]`にコピー

### ステップ4: 最適化計画の作成

`--export-only`オプションの場合、このステップをスキップしてステップ7へ。

optimization-checklist.mdに最適化項目をリストアップ:
```markdown
## フロントマター最適化
- [ ] theme: 'default'
- [ ] background: 'white'

## 文字色の最適化
- [ ] text-white → text-black
- [ ] text-gray-xxx（明）→ text-gray-xxx（暗）

## 背景色の最適化
- [ ] bg-dark系 → bg-light系

## アイコン・画像の最適化
- [ ] アイコン色調整（明→暗）

## レイアウトの最適化
- [ ] ボーダー色調整

## コードブロックの最適化
- [ ] 背景色確認

## 印刷品質の確認
- [ ] 文字サイズ適切（28pt以上）
- [ ] コントラスト比十分（WCAG基準）
```

tasklist.mdを作成:
```markdown
## フロントマター変更
- [ ] theme設定変更
- [ ] background設定変更

## スライド本体の最適化
- [ ] 文字色一括置換
- [ ] 文字色個別調整
- [ ] 背景色調整
- [ ] アイコン色調整
- [ ] レイアウト要素調整

## 検証
- [ ] プレビュー確認
- [ ] コントラスト比確認

## PDF出力
- [ ] slidev exportコマンド実行
- [ ] 生成PDF確認

## 完了処理
- [ ] 変更ログ記録
- [ ] git commit
```

### ステップ5: 実装ループ

tasklist.mdの全タスクが完了するまで実行:

1. タスクリストを読み込む
2. 未完了タスクを確認
3. 先頭の未完了タスクを実行:

**フロントマター変更例:**
```yaml
変更前:
theme: seriph
background: https://source.unsplash.com/...

変更後:
theme: default
background: white
```

**文字色変換パターン:**
- `text-white` → `text-black` / `text-gray-900`
- `text-gray-100` → `text-gray-900`
- `text-blue-400` → `text-blue-700`
- `text-yellow-500` → `text-yellow-700`

**背景色変換パターン:**
- `bg-gray-800` → `bg-gray-100` / `bg-white`
- `bg-gray-900` → `bg-gray-50`

**アイコン色変更例:**
```markdown
変更前: <mdi-radioactive class="text-4xl text-yellow-500" />
変更後: <mdi-radioactive class="text-4xl text-yellow-700" />
```

**レイアウト調整例:**
```markdown
変更前: <div class="bg-gray-800 text-white p-4">
変更後: <div class="bg-gray-50 text-black p-4 border border-gray-300">
```

4. 変更内容をchanges-log.mdに記録
5. タスクを`[x]`に更新

**例外処理:**
- タスク大 → サブタスク分割
- 色判断困難 → text-gray-900使用、コントラスト比4.5:1以上確保
- 複雑カスタムスタイル → 可能な範囲で最適化
- 変更不要 → 理由記載

### ステップ6: プレビュー確認

1. `npm run dev`でプレビュー
2. 確認:
  - 背景が白
  - 文字が黒系統で読みやすい
  - アイコン色適切
  - レイアウト崩れなし
  - コントラスト十分

### ステップ7: PDF出力の実行

1. slidev exportコマンド実行:
```bash
npm run export
```
または:
```bash
npx slidev export [対象ファイル]
```

2. エラー確認、発生時は修正して再実行

3. PDF生成成功を確認:
  - デフォルト: `slides-export.pdf`
  - カスタム: `[ファイル名]-export.pdf`

### ステップ8: PDF品質の検証

1. 生成PDFについて確認:
  - [ ] ファイル正常生成
  - [ ] ファイルサイズ妥当
  - [ ] ページ数が予想通り

2. changes-log.mdにPDF生成結果を記録

### ステップ9: 振り返りと完了処理

1. changes-log.mdに全体サマリーを追記:
```markdown
## 最適化サマリー
- 対象ファイル: [...]
- 実施した変更: [...]
- 生成PDF: [...]
- 品質評価: [...]
```

2. git commitで保存:
```bash
git add [対象ファイル] [PDFファイル] .pdf-planning/
git commit -m "Optimize for PDF export and generate PDF: [ファイル名]

Changes:
- Changed theme to 'default' and background to 'white'
- Adjusted text colors for better contrast
- Adjusted icon colors
- Optimized layout elements

Generated PDF:
- File: [PDFファイル名]
- Pages: [ページ数]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## 完了条件

- バックアップ作成済み（skip-backupでない場合）
- 最適化計画作成済み（export-onlyでない場合）
- tasklist.md全タスク完了（export-onlyでない場合）
- プレビュー確認済み（export-onlyでない場合）
- PDF出力成功、ファイル生成済み
- PDF品質検証済み
- 変更ログ・git commit完了

## 色変換対応表

### 文字色（Text Colors）
| ダークモード用 | ライトモード用 | 用途 |
|--------------|--------------|------|
| text-white | text-black / text-gray-900 | 基本テキスト |
| text-gray-100 | text-gray-900 | 基本テキスト |
| text-blue-400 | text-blue-700 | リンク・強調 |
| text-yellow-400 | text-yellow-700 | 注意・ハイライト |

### 背景色（Background Colors）
| ダークモード用 | ライトモード用 | 用途 |
|--------------|--------------|------|
| bg-gray-900 | bg-white / bg-gray-50 | メイン背景 |
| bg-gray-800 | bg-gray-100 | セカンダリ背景 |

## トラブルシューティング

**"Chromium not found"エラー:**
```bash
npx playwright install chromium
```

**"Out of memory"エラー:**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run export
```

**レイアウト崩れ:**
- フロントマター設定確認
- ブラウザプレビューと比較

**文字化け:**
- フォント設定確認
- 日本語フォント読み込み確認
