# Slidev Skills（スラッシュコマンド）

このディレクトリには、Claude Codeで直接実行可能なスキル（スラッシュコマンド）が含まれています。

## Skillsとは

Skillsは、ユーザーが直接呼び出す具体的なアクションです。スラッシュコマンド（例: `/add-slide`）として実行され、明確な成果物を生成します。

## 利用可能なスキル

### 1. `/add-slide` - 新規スライドセクション追加

授業計画を参照しながら、新しいスライドセクションを自動生成します。

**使用方法:**
```
/add-slide 放射線の種類と特性
```

**引数:** スライドテーマ/トピック名

**成果物:**
- 新しいスライドセクション（`slides.md`または`pages/`内）
- プランニングファイル（`.slide-planning/`）

**機能:**
- 授業計画（`lesson_plan/`）との整合性チェック
- 既存スタイル・レイアウトパターンの自動踏襲
- フォーマット検証（文字サイズ28pt以上など）
- プレビュー確認の自動実行

**詳細:** `add-slide.md` を参照

---

### 2. `/create-lecture` - 講義全体の自動生成

授業計画から講義全体のスライドを一括生成します。

**使用方法:**
```
/create-lecture 第1回
/create-lecture 放射線治療学入門
```

**引数:** 講義回数または講義テーマ

**成果物:**
- 完全な講義スライド（`slides.md`）
- プランニングファイル（`.lecture-planning/`）
- 自動git commit

**機能:**
- `lesson_plan/`の内容を完全反映
- フロントマター、導入、本論、まとめまで自動化
- 自己紹介ページ（`pages/who_am_i.md`）の自動インポート
- セクション別スライド枚数管理
- 時間配分（10-70-10分）の考慮

**詳細:** `create-lecture.md` を参照

---

### 3. `/create-abstract` - 抄読会スライド生成

医学論文情報から抄読会用のスライドを自動生成します。

**使用方法:**
```
# DOIから生成
/create-abstract 10.1016/j.ijrobp.2023.xxxxx

# タイトルから生成
/create-abstract Radiotherapy outcomes in lung cancer

# PDFファイルから生成
/create-abstract --pdf /path/to/paper.pdf

# URLから生成
/create-abstract --url https://pubmed.ncbi.nlm.nih.gov/12345678/
```

**引数:** 論文のDOI、PubMed ID、タイトル、または `--pdf` / `--url` オプション

**成果物:**
- 抄読会用スライド（`pages/abstract-[FirstAuthor]-[Year].md`）
- プランニングファイル（`.abstract-planning/`）
- 自動git commit

**機能:**
- 論文情報の自動取得（DOI、PubMed ID、タイトル、PDF、URL対応）
- 論文内容の構造化抽出（背景、方法、結果、考察、結論）
- `format/abstract_reading_slide.md`テンプレートへの準拠
- v-clicksによる段階的表示の自動設定

**詳細:** `create-abstract.md` を参照

---

### 4. `/prepare-pdf` - PDF出力用最適化

スライドをPDF出力用に最適化し、自動的にPDFを生成します。

**使用方法:**
```
# 現在のslides.mdを最適化してPDF出力
/prepare-pdf

# 特定のファイルを最適化してPDF出力
/prepare-pdf pages/abstract-Smith-2024.md

# 最適化をスキップしてPDF出力のみ
/prepare-pdf --export-only

# バックアップをスキップ（非推奨）
/prepare-pdf --skip-backup
```

**引数:** なし（現在のslides.md）またはスライドファイルパス

**オプション:**
- `--skip-backup`: バックアップをスキップ
- `--export-only`: 最適化をスキップ、PDF出力のみ
- `--theme [theme-name]`: 特定のテーマを使用

**成果物:**
- 最適化されたスライドファイル
- PDFファイル（`slides-export.pdf`または`[ファイル名]-export.pdf`）
- プランニングファイル（`.pdf-planning/`）
- バックアップファイル

**機能:**
- 背景色を白に自動変更
- 文字色を黒系統に自動調整（コントラスト比4.5:1以上）
- アイコン色の最適化（700番台の色）
- レイアウト要素の調整
- 自動バックアップ（git commit + バックアップファイル）
- `slidev export`の自動実行

**詳細:** `prepare-pdf.md` を参照

---

## Skillsの特徴

すべてのスキルは以下の特徴を持ちます：

### 完全自動実行
- ユーザー介入なしで開始から完了まで実行
- 各ステップ完了後、自動的に次のステップへ移行
- 問題発生時は自律的に解決

### タスク管理
- `tasklist.md`で進捗を自動管理
- すべてのタスクが完了するまで実行継続
- 例外処理ルールによる柔軟な対応

### バージョン管理
- 重要な変更前に自動git commit
- バックアップファイルの作成
- 変更履歴の詳細記録

### 品質保証
- プレビュー確認（`npm run dev`）
- フォーマット検証
- 既存パターンとの整合性チェック

### プランニング
- 専用ディレクトリで計画を管理
- 要件定義、設計、タスクリストを保存
- 実行履歴と振り返りを記録

---

## CommandsとAgentsとの違い

このプロジェクトには3種類のClaude Code機能があります：

### Skills（このディレクトリ）
**実行可能なスラッシュコマンド**
- 起動方法: `/skill-name 引数`
- 目的: 具体的なタスクの自動実行
- 成果物: スライドファイル、PDF等の実ファイル
- 使用場面: 実装・実行フェーズ

### Commands（`.claude/commands/`）
**詳細な実行手順書（参照用）**
- Skillsの詳細版・参照用ドキュメント
- 完全な実行フローの記述
- トラブルシューティング情報

### Agents（`.claude/agents/`）
**専門家システム（相談・分析）**
- 起動方法: Taskツール or プロンプト
- 目的: 専門家として分析・設計・相談
- 成果物: 提案、設計、分析結果
- 使用場面: 計画・設計フェーズ

---

## 推奨ワークフロー

### 新しい講義を作成する場合
1. `lesson_plan/`ディレクトリに授業計画を作成・更新
2. `/create-lecture [講義名]`で講義全体を生成
3. プレビューで確認（`npm run dev`）
4. 必要に応じて`/add-slide`で追加セクションを作成
5. `/prepare-pdf`でPDF出力

### 既存の講義に追加する場合
1. `lesson_plan/`で授業計画を確認
2. `/add-slide [セクション名]`で新しいセクションを追加
3. プレビューで確認
4. 必要に応じて`/prepare-pdf`でPDF更新

### 抄読会の準備をする場合
1. 論文情報（DOI、タイトル、PDF等）を用意
2. `/create-abstract [論文情報]`でスライド生成
3. プレビューで内容確認
4. `/prepare-pdf pages/abstract-xxx.md`でPDF出力

### Agentsと組み合わせる場合
1. **計画**: Agentsに相談して設計を固める
   - 例: radiation-therapy-educatorに講義構成を相談
2. **実装**: Skillsで実際のスライドを生成
   - 例: `/create-lecture`で講義スライドを自動生成
3. **改善**: Agentsにレビューを依頼
   - 例: adaptive-lecture-designerに時間配分をレビュー依頼
4. **出力**: Skillsで最終成果物を生成
   - 例: `/prepare-pdf`でPDF出力

---

## トラブルシューティング

### スキルが途中で停止した場合
1. `.xxx-planning/`ディレクトリの`tasklist.md`を確認
2. 未完了のタスクを確認
3. エラーメッセージがあればそれに従って修正
4. 必要に応じて手動で作業を完了

### 生成されたスライドが期待と異なる場合
1. `lesson_plan/`の内容を確認・更新
2. `.xxx-planning/`の設計ファイルを確認
3. `git revert`で元に戻す
4. 必要に応じてスキルを再実行

### PDF出力が失敗する場合
- "Chromium not found": `npx playwright install chromium`
- "Out of memory": `NODE_OPTIONS=--max-old-space-size=4096 npm run export`
- レイアウト崩れ: フロントマター設定を確認

詳細は各スキルのファイルを参照してください。
