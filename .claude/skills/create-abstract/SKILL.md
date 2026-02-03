---
name: create-abstract
description: 医学論文情報から抄読会用スライドを自動生成する
tools: [Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch]
---

# 抄読会スライドの自動生成

**引数:** 論文のDOI、PubMed ID、タイトル、またはオプション付き

**オプション:**
- `--pdf [PDFファイルパス]`: PDFから論文情報を抽出
- `--url [論文URL]`: Web上の論文から情報を抽出

**例:**
- `10.1016/j.ijrobp.2023.xxxxx`
- `Radiotherapy outcomes in lung cancer`
- `--pdf /path/to/paper.pdf`
- `--url https://pubmed.ncbi.nlm.nih.gov/12345678/`

このスキルは、論文情報を自動取得し、`format/abstract_reading_slide.md`テンプレートに従った抄読会スライドを生成します。

## 実行フロー

### ステップ1: 準備とコンテキスト設定

1. タスクコンテキストを確立:
  - 論文識別子: ユーザー提供の情報
  - 日付: YYYYMMDD形式
  - プランニングディレクトリ: `.abstract-planning/[日付]-[論文識別子]/`

2. プランニングファイルを作成:
  - `paper-info.md` (論文基本情報)
  - `content-extraction.md` (内容抽出)
  - `tasklist.md` (タスクリスト)
  - `slide-outline.md` (スライド構成)

### ステップ2: プロジェクト理解

1. プロジェクトルールを理解:
  - `CLAUDE.md`
  - `format/abstract_reading_slide.md` - テンプレート
  - `slidev_write.md`

### ステップ3: 論文情報の取得と抽出

引数の種類に応じて論文情報を取得:

**A. DOIまたはPubMed ID:**
- WebSearchまたはWebFetchで論文情報取得
- タイトル、著者、雑誌名、出版年、DOI、アブストラクト抽出

**B. タイトル:**
- WebSearchでタイトル検索、論文特定
- メタデータとアブストラクト取得

**C. PDFファイルパス:**
- Readツールでpdf読み込み
- 全文から情報抽出

**D. URL:**
- WebFetchでURL取得
- 全文またはアブストラクト抽出

paper-info.mdに基本情報を記録:
```markdown
# 論文基本情報
- タイトル: [...]
- 著者: [...]
- 雑誌名: [...]
- 出版年: [...]
- DOI: [...]
- アブストラクト: [...]
```

### ステップ4: 論文内容の詳細分析

論文情報を以下のセクションに分解:
- 背景（Background）
- 目的（Objectives）
- 方法（Methods）
- 結果（Results）
- 考察（Discussion）
- 結論（Conclusions）

content-extraction.mdに構造化して記録:
```markdown
## 背景
### 既存の知見
### 研究の重要性
### 未解決の問題
### 研究のギャップ

## 目的
- [研究の目的]

## 方法
### 研究デザイン
### 参加者選定
### 評価項目
### 統計解析

## 結果
### 主要な結果
### 副次的結果

## 考察
### 主要な発見とその意味
### 既存の知見との整合性
### 研究の強みと限界

## 結論
- [主要な知見]
```

### ステップ5: 計画フェーズ

slide-outline.mdにスライド構成を設計:
```markdown
# 抄読会スライド構成

## 全体構成
- 推定スライド枚数: 25-35枚
- 推定発表時間: 15-20分

## スライドリスト
1. タイトルスライド (1枚)
2. 背景 (3-4枚)
3. 方法 (4-5枚)
4. 結果 (4-6枚)
5. 考察 (4-5枚)
6. 結論 (1枚)
7. 終了スライド (1枚)
```

tasklist.mdを作成:
```markdown
## 準備
- [ ] 出力ファイル名決定
- [ ] 必要図表リストアップ

## フロントマター設定
- [ ] theme: default
- [ ] background: white

## スライド作成
- [ ] タイトルスライド
- [ ] 背景スライド（3-4枚）
- [ ] 方法スライド（4-5枚）
- [ ] 結果スライド（4-6枚）
- [ ] 考察スライド（4-5枚）
- [ ] 結論スライド
- [ ] 終了スライド

## 最終調整
- [ ] v-clicksの適切な使用
- [ ] レイアウト統一
- [ ] プレビュー確認
```

### ステップ6: 実装ループ

tasklist.mdの全タスクが完了するまで実行:

1. タスクリストを読み込む
2. 未完了タスクを確認
3. 先頭の未完了タスクを実行:
  - `format/abstract_reading_slide.md`テンプレートに厳密に従う
  - ファイル名: `pages/abstract-[FirstAuthor]-[Year].md`
  - フロントマター: theme: default, background: white
  - v-clicksを適切に使用
  - レイアウト: two-cols（方法）、center（セクションタイトル）
  - `{{...}}`プレースホルダーを実際の内容に置換
4. タスクを`[x]`に更新

**例外処理:**
- タスク大 → サブタスク分割
- 論文情報不足 → `[情報なし]`と記載
- 図表取得不可 → 説明テキストのみ
- 技術的理由で不要 → 理由記載

### ステップ7: プレビュー確認

1. `npm run dev`でプレビュー
2. 確認:
  - v-clicksアニメーション
  - レイアウト
  - 文字サイズ
  - transition設定

### ステップ8: フォーマット検証

チェックリスト:
- [ ] テンプレートに従っている
- [ ] フロントマター適切（theme: default, background: white）
- [ ] `{{...}}`すべて置換済み
- [ ] v-clicks適切
- [ ] レイアウト（two-cols, center）適切
- [ ] transition設定済み
- [ ] 全セクション網羅
- [ ] 終了スライド含む

### ステップ9: 振り返りとドキュメント更新

1. tasklist.mdに申し送り事項を記載

2. git commitで保存:
```bash
git add .
git commit -m "Add abstract reading slides: [FirstAuthor] et al. ([Year])

Created presentation for:
[論文タイトル]

[著者]
[雑誌名], [出版年]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

## 完了条件

- 論文情報取得・記録済み
- 論文内容分析・構造化済み
- スライド構成設計済み
- tasklist.md全タスク完了
- プレビュー確認済み
- フォーマット検証済み
- 申し送り事項記載済み
- git commit完了

## 論文情報取得方法

1. **DOI**: CrossRef APIやDOI.orgから書誌情報
2. **PubMed ID**: PubMed APIから論文情報
3. **タイトル**: Google Scholar/PubMedで検索
4. **PDF**: PDFファイル直接読み込み
5. **URL**: Webページからスクレイピング

取得できない情報は利用可能な情報のみで作成し、不足情報を明示。
