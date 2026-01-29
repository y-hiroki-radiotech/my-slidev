---
name: create-lecture
description: 授業計画から講義全体のスライドを一括自動生成する
tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# 講義全体の自動生成

**引数:** 講義回数または講義テーマ (例: `第1回` または `放射線治療学入門`)

このスキルは、lesson_plan/の内容から講義全体を完全自動で生成します。ユーザーの介入なしに、開始から完了まで実行します。

## 実行フロー

### ステップ1: 準備とコンテキスト設定

1. タスクコンテキストを確立:
  - 講義名: ユーザー提供の講義名
  - 日付: YYYYMMDD形式
  - プランニングディレクトリ: `.lecture-planning/[日付]-[講義名]/`

2. プランニングファイルを作成:
  - `lecture-structure.md` (講義構造)
  - `content-outline.md` (内容アウトライン)
  - `tasklist.md` (タスクリスト)
  - `section-breakdown.md` (セクション分解)

### ステップ2: 授業計画の詳細分析

1. プロジェクトルールを理解:
  - `CLAUDE.md`
  - `lesson_plan/第1回授業の全体像.md`
  - `lesson_plan/本論部分の詳細.md`
  - `slidev_write.md`
  - `format/template_sides.md`

2. 授業計画から抽出:
  - 授業の目的と到達目標
  - 全体の時間配分
  - 各セクションのタイトルと内容
  - 重要な概念・キーワード
  - 必要な図表・画像
  - 学生に考えさせたいポイント

3. 自己紹介が必要か判断（必要なら`pages/who_am_i.md`を確認）

### ステップ3: 既存リソースとパターンの調査

1. `slides.md`が存在すれば読み込み、現状把握
2. `pages/`内の既存ページを確認
3. `components/`内のVueコンポーネントを確認
4. `public/`内の画像リソースを確認
5. Grepで既存レイアウトパターンを検索

### ステップ4: 計画フェーズ

プランニングファイルを作成:

**lecture-structure.md:**
```markdown
# 講義全体構造
- 講義名: [名前]
- 対象: [対象学生]
- 時間: [総時間]
- 到達目標: [目標]

## セクション構成
1. 導入 (10分)
2. 本論 (70分)
3. まとめ (10分)
```

**content-outline.md:**
各セクションの詳細内容、スライドタイトル、レイアウト、必要素材

**section-breakdown.md:**
セクション別のスライド枚数見積もり

**tasklist.md:**
```markdown
## 準備
- [ ] slides.mdのバックアップ（git commit）
- [ ] 必要画像リソースをリストアップ

## フロントマター設定
- [ ] テーマ、レイアウト、フォント設定

## 導入セクション
- [ ] 自己紹介（必要な場合）
- [ ] 講義の目的
- [ ] 本日の流れ

## 本論セクション
- [ ] 各セクションのスライド作成

## まとめセクション
- [ ] 重要ポイント復習
- [ ] Take-homeメッセージ
- [ ] 次回予告
- [ ] 質疑応答

## 最終調整
- [ ] フォーマット統一
- [ ] 文字サイズチェック
- [ ] プレビュー確認
```

### ステップ5: バックアップの作成

1. `slides.md`が存在する場合、git commitでバックアップ:
```bash
git add slides.md
git commit -m "Backup before creating new lecture: [講義名]"
```

2. 既存スライドを`previous_slides/`に移動（必要に応じて）

### ステップ6: 実装ループ

tasklist.mdの全タスクが完了するまで実行:

1. タスクリストを読み込む
2. 未完了タスクを確認
3. 先頭の未完了タスクを実行:
  - フロントマター適切に設定
  - `---`でスライド区切り
  - タイトルと内容の間に`***`と`<div class="mt-5"></div>`
  - 本文28pt以上
  - 画像は`public/`に保存
  - `@iconify-json/mdi`からアイコン選択
  - 自己紹介は`pages/who_am_i.md`をインポート
4. タスクを`[x]`に更新

**例外処理:**
- タスクが大きすぎる → サブタスク分割
- 技術的理由で不要 → 理由記載してスキップ
- 画像未作成 → プレースホルダーとコメント

### ステップ7: プレビュー確認と最終調整

1. `npm run dev`でプレビュー（未起動の場合）
2. 以下を確認:
  - フロントマター設定
  - スライド区切り
  - レイアウト統一
  - 文字サイズ（28pt以上）
  - 画像配置
  - アイコン使用
  - スライド番号

### ステップ8: フォーマット検証

チェックリスト:
- [ ] フロントマター適切
- [ ] `---`でスライド区切り
- [ ] `***`と`<div class="mt-5"></div>`
- [ ] 本文28pt以上
- [ ] 画像は`public/`
- [ ] アイコン適切
- [ ] 自己紹介インポート（必要な場合）
- [ ] 授業計画の内容を網羅
- [ ] スライド枚数適切

### ステップ9: 振り返りとドキュメント更新

1. tasklist.mdに申し送り事項を記載

2. git commitで保存:
```bash
git add .
git commit -m "Complete lecture creation: [講義名] - XX slides

Created [講義名] with XX slides based on lesson plan.

Sections:
- Introduction: X slides
- Main content: X slides
- Summary: X slides

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## 完了条件

- バックアップ作成済み
- tasklist.md全タスク完了
- プレビュー確認済み
- フォーマット検証済み
- 申し送り事項記載済み
- git commit完了

## フロントマター例

```yaml
---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## 放射線治療学入門
  第1回講義資料
drawings:
  persist: false
transition: slide-left
title: 放射線治療学入門
mdc: true
---
```

## ページインポート例

```markdown
---
src: ./pages/who_am_i.md
---
```
