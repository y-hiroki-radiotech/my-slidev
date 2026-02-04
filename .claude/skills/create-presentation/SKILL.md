---
name: create-presentation
description: プレゼンテーション計画から全体のスライドを一括自動生成する
tools: [Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion]
---

# プレゼンテーション全体の自動生成

**引数:** プレゼンテーションテーマまたはトピック (例: `プロジェクト概要` または `技術紹介`)

このスキルは、lesson_plan/の内容からプレゼンテーション全体を完全自動で生成します。ユーザーの介入なしに、開始から完了まで実行します。

## 実行フロー

### Phase 0.5: プレゼンテーション要件確認

AskUserQuestion tool で以下を確認:

**Question 1: プレゼンテーションの用途**
- Header: "用途"
- multiSelect: false
- Options:
  - label: "講義・授業資料"
    description: "教育目的のスライド"
  - label: "研究発表・学会"
    description: "研究成果の発表"
  - label: "ビジネスプレゼン"
    description: "企業向けプレゼンテーション"
  - label: "技術セミナー"
    description: "技術的な内容の説明"

**Question 2: 聴衆の属性**
- Header: "聴衆"
- multiSelect: false
- Options:
  - label: "学生・初学者"
    description: "基礎から説明が必要"
  - label: "専門家・研究者"
    description: "高度な内容を期待"
  - label: "一般向け"
    description: "専門用語を避けた説明"
  - label: "混合（専門家+一般）"
    description: "バランスの取れた内容"

**Question 3: 予備知識レベル**
- Header: "予備知識"
- multiSelect: false
- Options:
  - label: "ほぼなし"
    description: "基本概念から説明"
  - label: "基礎レベル"
    description: "基本的な用語は理解している"
  - label: "中級レベル"
    description: "ある程度の専門知識あり"
  - label: "専門家レベル"
    description: "高度な知識を前提"

**Question 4: 内容の充実度**
- Header: "詳細度"
- multiSelect: false
- Options:
  - label: "概要のみ"
    description: "要点を簡潔に"
  - label: "標準的な詳しさ"
    description: "バランスの取れた内容"
  - label: "詳細まで網羅"
    description: "詳しい説明と例"
  - label: "完全網羅"
    description: "すべての側面をカバー"

これらの回答を受けて、スライド生成の方針（詳細度、専門用語の使用、例の多さ等）を調整する。

### ステップ1: 準備とコンテキスト設定

1. タスクコンテキストを確立:
  - プレゼンテーション名: ユーザー提供のタイトル
  - 日付: YYYYMMDD形式
  - プランニングディレクトリ: `.lecture-planning/[日付]-[タイトル]/`

2. プランニングファイルを作成:
  - `presentation-structure.md` (プレゼンテーション構造)
  - `content-outline.md` (内容アウトライン)
  - `tasklist.md` (タスクリスト)
  - `section-breakdown.md` (セクション分解)

### ステップ2: プレゼンテーション計画の詳細分析

1. プロジェクトルールを理解:
  - `CLAUDE.md`
  - `lesson_plan/` ディレクトリの計画ファイル
  - `slidev_write.md`
  - `format/template_sides.md`

2. プレゼンテーション計画から抽出:
  - プレゼンテーションの目的と到達目標
  - 全体の時間配分
  - 各セクションのタイトルと内容
  - 重要な概念・キーワード
  - 必要な図表・画像
  - 聴衆に考えさせたいポイント

3. 自己紹介が必要か判断（必要なら`pages/who_am_i.md`を確認）

### ステップ3: 既存リソースとパターンの調査

1. `slides.md`が存在すれば読み込み、現状把握
2. `pages/`内の既存ページを確認
3. `components/`内のVueコンポーネントを確認
4. `public/`内の画像リソースを確認
5. Grepで既存レイアウトパターンを検索

### ステップ4: 計画フェーズ

プランニングファイルを作成:

**presentation-structure.md:**
```markdown
# プレゼンテーション全体構造
- タイトル: [名前]
- 対象: [対象聴衆]
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
