# Slidev Skills（スラッシュコマンド）

このディレクトリには、Claude Codeで直接実行可能なスキル（スラッシュコマンド）が含まれています。

## Skillsとは

Skillsは、ユーザーが直接呼び出す具体的なアクションです。スラッシュコマンド（例: `/add-slide`）として実行され、明確な成果物を生成します。

## ディレクトリ構造

各スキルは専用のディレクトリを持ち、その中に`SKILL.md`ファイルを配置します。

```
.claude/skills/
├── add-slide/
│   └── SKILL.md
├── create-presentation/
│   └── SKILL.md
├── create-document-summary/
│   └── SKILL.md
├── prepare-pdf/
│   └── SKILL.md
├── slide-style-rector/
│   └── SKILL.md
├── layout-fix/
│   └── SKILL.md
├── slidev-diagram/
│   └── SKILL.md
├── archive-lecture/
│   └── SKILL.md
├── add-notes/                 # スピーカーノート追加
│   └── SKILL.md
├── create-quiz/               # 確認テスト自動生成
│   └── SKILL.md
├── plan/                      # orchestra統合
│   └── SKILL.md
├── design-tracker/            # orchestra統合
│   └── SKILL.md
├── checkpointing/             # orchestra統合
│   └── SKILL.md
├── commit-push/               # Git操作
│   └── SKILL.md
├── pr-generator/              # PR自動生成
│   └── SKILL.md
├── student-review/            # 教材レビュー
│   └── SKILL.md
├── notebook-ask/              # NotebookLM質問
│   └── SKILL.md
├── notebook-manage/           # NotebookLM管理
│   └── SKILL.md
├── notebook-add/              # NotebookLM追加
│   └── SKILL.md
└── README.md
```

各`SKILL.md`ファイルには以下の構造があります:
- **YAMLフロントマター**: name, description, tools
- **引数の説明**: スキルの使用方法
- **実行フロー**: ステップバイステップの詳細手順

## 利用可能なスキル

### 1. `/add-slide` - 新規スライドセクション追加

プレゼンテーション計画を参照しながら、新しいスライドセクションを自動生成します。

**使用方法:**
```
/add-slide 技術概要
/add-slide 市場分析
```

**引数:** スライドテーマ/トピック名

**成果物:**
- 新しいスライドセクション（`slides.md`または`pages/`内）
- プランニングファイル（`.slide-planning/`）

**機能:**
- プレゼンテーション計画（`lesson_plan/`）との整合性チェック
- 既存スタイル・レイアウトパターンの自動踏襲
- フォーマット検証（文字サイズ28pt以上など）
- プレビュー確認の自動実行

**詳細:** `add-slide.md` を参照

---

### 2. `/create-presentation` - プレゼンテーション全体の自動生成

プレゼンテーション計画からスライド全体を一括生成します。

**使用方法:**
```
/create-presentation プロジェクト概要
/create-presentation 技術紹介
```

**引数:** プレゼンテーションテーマ

**成果物:**
- 完全なプレゼンテーションスライド（`slides.md`）
- プランニングファイル（`.lecture-planning/`）
- 自動git commit

**機能:**
- `lesson_plan/`の内容を完全反映
- フロントマター、導入、本論、まとめまで自動化
- 自己紹介ページ（`pages/who_am_i.md`）の自動インポート（必要時）
- セクション別スライド枚数管理
- 時間配分の考慮

**詳細:** `create-presentation.md` を参照

---

### 3. `/create-document-summary` - 文書要約スライド生成

文書情報から要約スライドを自動生成します。

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

### 5. `/slide-style-rector` - スタイル自動整形

スタイルガイドとレイアウトパターンに基づいてスライドを自動整形します。

**使用方法:**
```
# 全スライドを整形
/slide-style-rector slides.md

# 範囲指定で整形
/slide-style-rector slides.md 10-20

# 特定のページを整形
/slide-style-rector pages/flowchart.md
```

**引数:** スライドファイルパス、オプションで範囲指定

**成果物:**
- 整形されたスライドファイル
- 自動git commit

**機能:**
- `docs/style-guide.md`のルールに従った整形
- `format/layout-patterns.md`から最適なパターンを選択
- 文体ルールの自動適用
- 1スライド1メッセージの徹底
- 本文28pt以上の維持
- 適切な余白の確保

**詳細:** `slide-style-rector.md` を参照

---

### 6. `/layout-fix` - レイアウト崩れ自動修正

スライドのレイアウト崩れを検出して自動修正します。

**使用方法:**
```
# レイアウトチェックと修正
/layout-fix slides.md

# 特定のページをチェック
/layout-fix pages/flowchart.md
```

**引数:** スライドファイルパス

**成果物:**
- 修正されたスライドファイル
- レイアウト分析レポート
- 自動git commit

**機能:**
- リスト項目過多の検出（5個以上）
- テキストオーバーフローの検出（300文字超）
- 画像サイズの確認
- タイトル間隔の検証
- 不適切なレイアウトの検出と修正提案
- 開発サーバーとの連携

**詳細:** `layout-fix.md` を参照

---

### 7. `/slidev-diagram` - 図解生成とスライド挿入

AI画像生成を使用して図解を作成し、スライドに挿入します。

**使用方法:**
```
# 図解を生成してページに挿入
/slidev-diagram リニアックの構造を図解して。ページ7に挿入、slides.md

# 図解を生成（ページ指定なし）
/slidev-diagram プロセスの流れを図解して
```

**引数:** 図解の内容説明、オプションでページ番号とファイル名

**成果物:**
- 生成された図解画像（images/フォルダ）
- 更新されたスライドファイル

**機能:**
- AI画像生成
- ユーザー承認フロー
- レイアウト選択（center, two-cols, image-right等）
- 既存コンテンツの維持
- プレビュー確認

**詳細:** `slidev-diagram.md` を参照

---

### 8. `/archive-lecture` - 講義アーカイブ

現在のslides.mdを内容から適切な名前を付けてprevious_lectureディレクトリにアーカイブします。

**使用方法:**
```
/archive-lecture
/archive-lecture --custom-name "special-lecture"
/archive-lecture --no-commit
```

**引数:**
- `--custom-name`: カスタムファイル名を指定（オプション）
- `--no-commit`: git commitをスキップ（オプション）

**成果物:**
- previous_lecture/内のアーカイブファイル
- git commit（オプション）

**機能:**
- slides.mdの内容を分析してタイトル・講義番号を抽出
- 適切なファイル名を自動生成（例: `lecture-01-radiation-therapy-introduction-2024-02-04.md`）
- previous_lecture/ディレクトリにコピー
- 重複チェックとタイムスタンプ追加
- git commitで記録

**ファイル名生成ルール:**
- フロントマターや最初のタイトルから講義名を抽出
- 講義番号を検出（「第1回」→ `01`）
- 日本語をスラッグ化（英語化、ハイフン区切り）
- 日付を自動追加

**詳細:** `archive-lecture/SKILL.md` を参照

---

### 9. `/add-notes` - スピーカーノート追加

既存スライドにプレゼンター用のスピーカーノートを追加します。

**使用方法:**
```
# slides.md全体にノート追加
/add-notes

# 特定範囲のスライドのみ
/add-notes 3-10

# 特定ファイル
/add-notes pages/section.md
```

**引数:**
- なし（デフォルト: slides.md全体）
- スライド番号範囲（例: `3-10`）
- ファイルパス（例: `pages/section.md`）

**成果物:**
- スピーカーノート付きスライドファイル
- プランニングファイル（`.notes-planning/`）
- git commit

**機能:**
- スライドタイプ別の適切なノート生成（タイトル、セクション、内容、まとめ）
- 時間配分、トーキングポイント、トランジションヒントの追加
- 既存ノートの保持（上書きしない）
- プレゼンターモードでの確認案内

**ノート詳細度オプション:**
- 簡潔: 3-5箇条書きの要点のみ
- 標準: トーキングポイント付き
- 詳細: スクリプト付きの完全な台本

**詳細:** `add-notes/SKILL.md` を参照

---

### 10. `/create-quiz` - 講義から確認テスト自動生成

過去の講義スライドから確認テスト（クイズ）を自動生成し、解答付きMarkdownとPDFを出力します。

**使用方法:**
```
/create-quiz
```

**引数:** なし（対話形式で講義・設定を選択）

**成果物:**
- クイズMarkdownファイル（`quizzes/{lecture-slug}-quiz-{YYYYMMDD}.md`）
- PDFファイル（オプション、`quizzes/{lecture-slug}-quiz-{YYYYMMDD}.pdf`）
- Gemini分析結果（`.claude/docs/research/quiz-generation-{slug}.md`）

**機能:**
- `previous_lecture/` から対象講義を選択
- 問題数（10/15/20/25問）、形式（4択/○×/穴埋め/短答式）、難易度を指定可能
- Gemini CLIで講義コンテンツを分析し、Slidevマークアップを除去して問題生成
- 解答・解説セクションを赤字ハイライト付きで生成
- Playwright経由でA4印刷用PDF出力（解答セクションは別ページ）

**詳細:** `create-quiz/SKILL.md` を参照

---

### 11. `/plan` - 実装前の計画作成 (orchestra統合)

複雑な講義作成や大規模な変更の前に、実装計画を立てます。

**使用方法:**
```
/plan
```

**引数:** なし

**成果物:**
- 実装計画ファイル
- 設計決定の記録

**機能:**
- 要件の整理
- アプローチの検討
- リスクの識別
- タスクの分解

**詳細:** orchestra統合により追加

---

### 12. `/design-tracker` - 設計決定の自動記録 (orchestra統合)

スライド設計決定を自動的に `.claude/docs/DESIGN.md` に記録します。

**使用方法:**
```
# 自動的にトリガーされます（明示的呼び出し不要）
# または明示的に呼び出し
/design-tracker
```

**引数:** なし

**成果物:**
- 更新されたDESIGN.md

**機能:**
- レイアウトパターンの選択記録
- 配色やビジュアルデザインの記録
- プレゼンテーション設計アプローチの記録
- 内容の正確性確認の記録

**特徴:** プロアクティブに動作し、設計決定を自動検知して記録

**詳細:** orchestra統合により追加

---

### 13. `/checkpointing` - ワークフローの保存とパターン発見 (orchestra統合)

プレゼンテーション作成のワークフローを保存し、再利用可能なパターンを発見します。

**使用方法:**
```
# セッション履歴の保存（デフォルト）
/checkpointing

# 完全なチェックポイント作成
/checkpointing --full

# パターン分析とスキル化
/checkpointing --full --analyze
```

**引数:** オプションで `--full` および `--analyze`

**成果物:**
- セッション履歴（デフォルト）
- チェックポイントファイル（`--full`）
- スキル候補の提案（`--full --analyze`）

**機能:**
- Git履歴の分析
- Gemini調査履歴の記録
- ワークフローパターンの発見
- 再利用可能なスキルの抽出

**詳細:** orchestra統合により追加

---

### 14. `/commit-push` - Conventional Commitでコミット・プッシュ

ステージされた変更から日本語のConventional Commitメッセージ候補を3つ生成し、選択後にコミット・プッシュを実行します。

**使用方法:**
```
/commit-push
```

**引数:** なし

**成果物:**
- gitコミット
- リモートへのプッシュ（オプション）

**機能:**
- ステージされた変更の自動分析
- Conventional Commit形式（`type(scope): 説明`）の候補3つ生成
- ユーザーによる選択または編集
- プッシュ前の確認

**詳細:** `commit-push/SKILL.md` を参照

---

### 15. `/pr-generator` - PR自動生成

PRテンプレートと変更差分を元にPRの下書きを自動生成し、確認後ghコマンドでPRを作成します。

**使用方法:**
```
/pr-generator
```

**引数:** なし

**成果物:**
- PR下書きファイル（`tmp/pr/`）
- GitHub PR

**機能:**
- PRテンプレートの自動読み込み
- コミット範囲の選択（ブランチ全体、最新1件、カスタム）
- 差分に基づく下書き生成
- ユーザー確認後のPR作成

**詳細:** `pr-generator/SKILL.md` を参照

---

### 16. `/student-review` - 初学者視点レビュー

学習教材（Markdownファイル）を初学者の視点で分析し、改善提案を行います。

**使用方法:**
```
/student-review docs/lecture-01.md
/student-review slides.md
```

**引数:** レビュー対象のMarkdownファイルパス

**成果物:**
- `reviews/` ディレクトリにレビューレポートを保存
- 例: `docs/lecture-01.md` → `reviews/lecture-01.md`

**機能:**
- 専門用語、前提知識の確認
- 説明の論理的な流れのチェック
- 具体例の充足度の評価
- 「なぜ疑問が生じるか」「改善提案」「現場での活用」を含む詳細レポート

**詳細:** `student-review/SKILL.md` を参照

---

### 17. `/notebook-ask` - NotebookLMに質問

NotebookLMに質問し、自動的にフォローアップ質問を実行して完全な回答を得ます。

**使用方法:**
```
# アクティブなノートブックに質問
/notebook-ask 水吸収線量について教えて

# 特定のノートブックに質問
/notebook-ask --id notebook-id 質問内容

# URLを直接指定
/notebook-ask --url https://notebooklm.google.com/notebook/ID 質問内容
```

**引数:** 質問内容、オプションで `--id` または `--url`

**成果物:**
- NotebookLMからの回答

**機能:**
- アクティブノートブック、ID指定、URL指定の3つの方法
- 自動フォローアップ質問
- 回答の統合

**詳細:** `notebook-ask/SKILL.md` を参照

---

### 18. `/notebook-manage` - NotebookLM管理

NotebookLMノートブックライブラリの管理操作を提供します。

**使用方法:**
```
# 一覧表示
/notebook-manage list

# 検索
/notebook-manage search 放射線

# アクティブ化
/notebook-manage activate notebook-id

# 削除
/notebook-manage remove notebook-id
```

**引数:** 操作コマンド（list, search, activate, remove）

**成果物:**
- ノートブック一覧、検索結果、操作結果

**機能:**
- ノートブック一覧表示
- トピック・キーワード検索
- アクティブ化
- 削除

**詳細:** `notebook-manage/SKILL.md` を参照

---

### 19. `/notebook-add` - NotebookLM追加

NotebookLMのノートブックをライブラリに自動追加します。

**使用方法:**
```
/notebook-add https://notebooklm.google.com/notebook/abc-123
```

**引数:** NotebookLMのURL

**成果物:**
- ライブラリに登録されたノートブック

**機能:**
- URLからの自動内容分析
- 名前、説明、トピックの自動生成
- ライブラリへの登録

**詳細:** `notebook-add/SKILL.md` を参照

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
3. `/slide-style-rector slides.md`でスタイル整形
4. `/slidev-diagram`で必要な図解を追加
5. `/layout-fix slides.md`でレイアウト確認
6. プレビューで確認（`npm run dev`）
7. `/prepare-pdf`でPDF出力

### 既存の講義に追加する場合
1. `lesson_plan/`で授業計画を確認
2. `/add-slide [セクション名]`で新しいセクションを追加
3. `/slide-style-rector slides.md`でスタイル統一
4. `/layout-fix slides.md`でレイアウト確認
5. プレビューで確認
6. 必要に応じて`/prepare-pdf`でPDF更新

### 抄読会の準備をする場合
1. 論文情報（DOI、タイトル、PDF等）を用意
2. `/create-abstract [論文情報]`でスライド生成
3. `/slide-style-rector pages/abstract-xxx.md`でスタイル整形
4. `/slidev-diagram`で図解を追加（必要に応じて）
5. `/layout-fix pages/abstract-xxx.md`でレイアウト確認
6. プレビューで内容確認
7. `/prepare-pdf pages/abstract-xxx.md`でPDF出力

### 講義後の確認テストを作成する場合
1. `/archive-lecture`で講義をアーカイブ（未アーカイブの場合）
2. `/create-quiz`で確認テストを自動生成
3. 問題数・形式・難易度を選択
4. PDF出力（オプション）で印刷用テストを生成

### スタイル改善のみを行う場合
1. `/slide-style-rector slides.md`でスタイル整形
2. `/layout-fix slides.md`でレイアウト確認
3. プレビューで確認
4. 問題があれば再度`/slide-style-rector`を実行

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
