# Slidev General Purpose Presentation Framework

**AI駆動の汎用プレゼンテーション自動生成システム**

![slide system](https://storage.googleapis.com/zenn-user-upload/8b968c169693-20260204.png)

**使用方法のまとめ**
![how-to-use](https://storage.googleapis.com/zenn-user-upload/1c8081222a19-20260204.png)

```
Claude Code (Orchestrator) ─┬─ Gemini CLI (Content Research)
                            └─ Slidev Skills (Presentation Generation)
```

高品質なプレゼンテーションスライドを自動生成。内容の正確性とプレゼンテーション効果を両立。

## Quick Start

### 新規プレゼンテーションを作成

```bash
# 1. プレゼンテーション計画を作成
# lesson_plan/プレゼンテーション計画.md を作成

# 2. Claude Codeでスライド生成
claude
> /create-presentation プロジェクト概要

# 3. プレビュー
npm run dev

# 4. PDF出力
> /prepare-pdf
```

### 文書要約スライド作成

```bash
claude
> /create-document-summary 10.1016/j.example.2024.xxxxx

# または PDFから
> /create-document-summary --pdf /path/to/document.pdf
```

### 既存スライドに追加

```bash
claude
> /add-slide 技術概要
> /slide-style-rector slides.md
```

## Prerequisites

### Claude Code

```bash
npm install -g @anthropic-ai/claude-code
claude login
```

### Gemini CLI（推奨）

```bash
npm install -g @google/genai-cli
gemini auth login
```

### Slidev環境

```bash
npm install
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│           Claude Code (Orchestrator)                        │
│           → スライド生成・レイアウト実装                     │
│           → ユーザー対話・調整・PDF出力                      │
│                      ↓                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Subagent (general-purpose)               │  │
│  │              → 独立したコンテキストを持つ               │  │
│  │              → Gemini を呼び出し可能                   │  │
│  │              → 結果を要約してメインに返す              │  │
│  │                                                       │  │
│  │              ┌──────────────┐                         │  │
│  │              │  Gemini CLI  │                         │  │
│  │              │  専門調査    │                         │  │
│  │              │  文書分析    │                         │  │
│  │              │  設計支援    │                         │  │
│  │              └──────────────┘                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### コンテキスト管理（重要）

メインオーケストレーターのコンテキストを節約するため、専門調査・文書分析はサブエージェント経由で実行します。

| 状況                   | 推奨方法                            |
| ---------------------- | ----------------------------------- |
| 専門性の確認           | サブエージェント経由                |
| 文書分析               | サブエージェント経由 → ファイル保存 |
| プレゼンテーション設計 | サブエージェント経由                |
| 簡単な質問             | 直接回答OK                          |

## Directory Structure

```
my-slidev/
├── CLAUDE.md                    # メインシステムドキュメント
├── README.md
├── slides.md                    # メインスライド
├── package.json
├── *.skill                      # スキルパッケージファイル
│
├── .claude/
│   ├── agents/
│   │   └── general-purpose.md   # Gemini連携サブエージェント
│   │
│   ├── skills/                  # 18スキル
│   │   ├── create-presentation/ # プレゼンテーション全体生成
│   │   ├── add-slide/           # スライド追加
│   │   ├── create-document-summary/ # 文書要約スライド
│   │   ├── slide-style-rector/  # スタイル整形
│   │   ├── layout-fix/          # レイアウト修正
│   │   ├── slidev-diagram/      # 図解生成
│   │   ├── prepare-pdf/         # PDF出力
│   │   ├── archive-lecture/     # プレゼンテーションアーカイブ
│   │   ├── plan/                # 実装計画
│   │   ├── design-tracker/      # 設計記録
│   │   ├── checkpointing/       # ワークフロー保存
│   │   ├── commit-push/         # Gitコミット・プッシュ
│   │   ├── pr-generator/        # PR自動生成
│   │   ├── student-review/      # 教材レビュー
│   │   ├── notebook-ask/        # NotebookLM質問
│   │   ├── notebook-manage/     # NotebookLM管理
│   │   └── notebook-add/        # NotebookLM追加
│   │
│   ├── hooks/                   # 自動化フック
│   │   ├── agent-router.py      # Geminiルーティング
│   │   ├── suggest-gemini-research.py
│   │   └── log-cli-tools.py
│   │
│   ├── rules/                   # 開発ガイドライン
│   │   ├── gemini-delegation.md
│   │   ├── dev-environment-slidev.md
│   │   ├── language.md
│   │   └── security.md
│   │
│   ├── docs/
│   │   ├── DESIGN.md            # プレゼンテーション設計記録
│   │   ├── style-guide.md       # ビジュアルデザイン原則
│   │   └── research/            # Gemini調査結果
│   │
│   └── logs/
│       └── cli-tools.jsonl      # Gemini入出力ログ
│
├── .gemini/                     # Gemini CLI設定
│   ├── GEMINI.md                # 役割定義
│   ├── settings.json            # mcpServers含む
│   └── skills/
│       ├── context-loader/      # コンテキスト自動読み込み
│       └── pdf-to-markdown/     # PDF→Markdown変換
│
├── .github/                     # GitHub統合
│   ├── copilot-instructions.md  # Copilot設定
│   ├── pull_request_template.md # PRテンプレート
│   └── workflows/
│       ├── claude-code-review.yml  # PR自動レビュー
│       ├── claude.yml           # @claudeメンション対応
│       └── deploy.yaml          # デプロイ
│
├── lesson_plan/                 # プレゼンテーション計画
│   └── (プレゼンテーション計画ファイル)
│
├── format/                      # テンプレート
│   ├── layout-patterns.md       # 40種類のレイアウトパターン
│   ├── template_sides.md
│   └── abstract_reading_slide.md
│
├── reviews/                     # レビューレポート保存先
│   └── (student-reviewスキルの出力)
│
└── pages/                       # 個別スライド
    └── who_am_i.md
```

## Skills

### `/create-presentation` — プレゼンテーション全体生成

プレゼンテーション計画から全体のスライドを一括生成します。

```
/create-presentation プロジェクト概要
```

**ワークフロー:**
1. `lesson_plan/` からプレゼンテーション計画を読み込み
2. 用途・聴衆・レベルを確認（AskUserQuestion）
3. フロントマター・導入・本論・まとめを自動生成
4. スタイルガイドに準拠
5. git commit

### `/add-slide` — スライド追加

既存スライドに新しいセクションを追加します。

```
/add-slide 技術概要
```

**出力:**
- 新規スライドセクション
- 既存スタイルとの整合性確保
- 用途・聴衆に応じた内容調整

### `/create-document-summary` — 文書要約スライド

文書から要約スライドを自動生成します。

```
/create-document-summary 10.1016/j.example.2024.xxxxx
/create-document-summary --pdf /path/to/document.pdf
/create-document-summary --url https://example.com/document
```

**ワークフロー:**
1. 文書情報取得（DOI/PDF/URL）
2. Geminiで文書分析（必要に応じて）
3. 要点を構造化
4. 要約スライド生成

### `/slide-style-rector` — スタイル整形

スタイルガイドとレイアウトパターンに基づいて自動整形します。

```
/slide-style-rector slides.md
```

**適用ルール:**
- 1スライド1メッセージ
- 28pt以上の文字サイズ
- 適切な余白（mt-5, mb-5）
- コロン・感嘆符禁止

### `/layout-fix` — レイアウト修正

レイアウト崩れを検出して自動修正します。

```
/layout-fix slides.md
```

**検出項目:**
- リスト項目過多（5個以上）
- テキストオーバーフロー（300文字超）
- 不適切なレイアウト

### `/slidev-diagram` — 図解生成

AI画像生成で図解を作成し、スライドに挿入します。

```
/slidev-diagram リニアックの構造を図解して。ページ7に挿入、slides.md
```

**ワークフロー:**
1. AI画像生成
2. ユーザー承認
3. images/ に保存
4. スライドに自動挿入

### `/prepare-pdf` — PDF出力

PDF出力用に最適化し、自動的にPDFを生成します。

```
/prepare-pdf
/prepare-pdf pages/abstract-Smith-2024.md
```

**最適化:**
- 背景色を白に変更
- 文字色を黒系統に調整
- レイアウト確認
- slidev export 実行

### `/archive-lecture` — 講義アーカイブ

現在のslides.mdを適切な名前でprevious_lecture/にアーカイブします。

```
/archive-lecture
/archive-lecture --custom-name "special-lecture"
/archive-lecture --no-commit
```

**ワークフロー:**
1. slides.mdからタイトル・メタデータを抽出
2. `lecture-{番号}-{スラッグ化したタイトル}-{日付}.md` として保存
3. previous_lecture/にコピー
4. git commit（オプション）

### `/plan` — 実装計画

複雑な講義作成前に実装計画を立てます。

```
/plan
```

### `/design-tracker` — 設計記録（自動）

プレゼンテーション設計決定を自動記録します。

**記録内容:**
- レイアウトパターンの選択
- 配色・ビジュアルデザイン
- プレゼンテーション設計アプローチ
- 内容の正確性確認

### `/checkpointing` — ワークフロー保存

セッションの状態を保存し、再利用可能なパターンを発見します。

```bash
/checkpointing              # 基本: 履歴ログ
/checkpointing --full       # 完全: git履歴・ファイル変更含む
/checkpointing --analyze    # 分析: スキルパターン発見
```

### `/commit-push` — Gitコミット・プッシュ

ステージされた変更からConventional Commitメッセージ候補を3つ生成し、選択後にコミット・プッシュします。

```bash
/commit-push
```

**ワークフロー:**
1. `git diff --cached` で変更内容を分析
2. `type(scope): 説明` 形式で候補3つ生成
3. ユーザーが選択または編集
4. コミット実行
5. プッシュ確認（オプション）

### `/pr-generator` — PR自動生成

PRテンプレートと変更差分を元にPRの下書きを自動生成し、ghコマンドでPRを作成します。

```bash
/pr-generator
```

**ワークフロー:**
1. `.github/pull_request_template.md` を読み込み
2. コミット範囲を選択（ブランチ全体、最新1件、カスタム）
3. 下書きを生成
4. ユーザー確認
5. `gh pr create` でPR作成

### `/student-review` — 初学者視点レビュー

学習教材（Markdownファイル）を初学者の視点で分析し、改善提案を行います。

```bash
/student-review docs/lecture-01.md
```

**出力:**
- `reviews/` ディレクトリにレビューレポートを保存
- 例: `docs/lecture-01.md` → `reviews/lecture-01.md`
- 「なぜ疑問が生じるか」「改善提案」「現場での活用」を含む

### `/notebook-ask` — NotebookLMに質問

NotebookLMに質問し、自動的にフォローアップ質問を実行します。

```bash
/notebook-ask 水吸収線量について教えて
/notebook-ask --id notebook-id 質問内容
/notebook-ask --url https://notebooklm.google.com/notebook/ID 質問内容
```

### `/notebook-manage` — NotebookLM管理

NotebookLMノートブックの一覧、検索、アクティブ化、削除を行います。

```bash
/notebook-manage list
/notebook-manage search 放射線
/notebook-manage activate notebook-id
/notebook-manage remove notebook-id
```

### `/notebook-add` — NotebookLM追加

NotebookLMのノートブックをライブラリに自動追加します。

```bash
/notebook-add https://notebooklm.google.com/notebook/abc-123
```

## GitHub Actions

### Claude Code PR Review

PR作成時に自動でコードレビューを実行します。

```yaml
# .github/workflows/claude-code-review.yml
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
```

**セットアップ:**
1. リポジトリの Settings > Secrets に `CLAUDE_CODE_OAUTH_TOKEN` を設定
2. PR作成時に自動でレビューが実行される

### Claude @メンション

IssueやPRコメントで `@claude` メンション時に対話形式で対応します。

```yaml
# .github/workflows/claude.yml
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
```

**使い方:**
```
@claude このPRの変更内容を説明して
@claude このバグの原因を調査して
```

## Development

### Tech Stack

| ツール        | 用途                    |
| ------------- | ----------------------- |
| **Slidev**    | プレゼンテーションフレームワーク |
| **Vue 3**     | コンポーネント          |
| **npm**       | パッケージ管理          |
| **Prettier**  | コードフォーマット      |

### Commands

```bash
# 開発
npm run dev              # 開発サーバー起動
npm run build            # プロダクションビルド
npm run export           # PDF出力

# スクリプト
bash scripts/start-server.sh    # 開発サーバー
bash scripts/export-pdf.sh      # PDF出力
bash scripts/check-layout.sh    # レイアウトチェック
```

### Design System

- **Minimum Text**: 28pt
- **Layout Patterns**: 40 patterns
- **Color Palette**: Primary #1e3a8a (deep blue)
- **Icons**: @iconify-json/mdi

## Hooks

自動化フックにより、適切なタイミングでエージェント連携を提案します。

| フック                         | トリガー           | 動作                             |
| ------------------------------ | ------------------ | -------------------------------- |
| `agent-router.py`              | ユーザー入力       | 専門用語・レイアウト質問でGemini提案 |
| `suggest-gemini-research.py`   | WebSearch前        | Gemini調査を提案                 |
| `log-cli-tools.py`             | Gemini実行         | 入出力ログ記録                   |

## Language Rules

- **コード・思考**: 英語
- **専門用語**: 適切な言語（分野による）
- **Slidev markdown**: 英語
- **ユーザーへの応答**: 日本語
- **スライドコンテンツ**: 日本語

---

## Gemini CLI Integration

### いつGeminiを使うか

- **専門性の確認** - 最新情報、業界標準
- **プレゼンテーション設計相談** - 認知負荷、視覚階層、効果
- **レイアウト判断** - 40パターンから最適なものを推奨
- **文書分析** - PDF文書の構造化抽出
- **PDF→Markdown変換** - PDFをMarkdown形式に変換

### Gemini Skill: pdf-to-markdown

pdfフォルダ内のPDFをMarkdown形式に変換します。

```bash
# Gemini CLIで直接実行
gemini -p "以下のPDFファイルの内容を読み取り、Markdown形式で出力してください" -f "pdf/document.pdf"
```

### 使い方

**自動提案:**
「最新情報を確認して」と質問すると、agent-routerがGemini使用を提案します。

**サブエージェント経由（推奨）:**
```
Task(subagent_type="general-purpose",
     prompt="Geminiで[トピック]について調査し、要約を返して")
```

**直接呼び出し（ターミナル）:**
```bash
gemini -p "[質問内容]" 2>/dev/null
```

---

## このフレームワークを使う

### 新規プレゼンテーション作成

1. **プレゼンテーション計画作成** - `lesson_plan/` にプレゼンテーション計画を作成
2. **スライド生成** - `/create-presentation` で一括生成
3. **図解追加** - `/slidev-diagram` で必要な図解を追加
4. **スタイル整形** - `/slide-style-rector` で統一
5. **レイアウト確認** - `/layout-fix` で修正
6. **PDF出力** - `/prepare-pdf` で発表用PDF作成

### 文書要約スライド準備

1. **文書情報準備** - DOI、PDF、URLのいずれか
2. **スライド生成** - `/create-document-summary` で自動生成
3. **PDF出力** - `/prepare-pdf` で発表用PDF作成

### 専門性の確認

1. **質問** - 「最新情報を確認して」
2. **自動ルーティング** - agent-routerがGemini提案
3. **調査** - サブエージェント経由でGemini調査
4. **保存** - `.claude/docs/research/{topic}.md` に保存
5. **記録** - design-trackerが自動的に検証結果を記録

### カスタマイズ

- **CLAUDE.md**: プロジェクト固有の情報を追加
- **lesson_plan/**: プレゼンテーション計画をカスタマイズ
- **format/**: レイアウトパターン・テンプレートを追加
- **.claude/skills/**: カスタムスキルを追加
- **.claude/rules/**: ルールをカスタマイズ

---

## Troubleshooting

### Gemini CLIエラー

```bash
# インストール確認
which gemini

# 認証
gemini auth login

# 設定確認
gemini config list
```

### PDF出力失敗

```bash
# Chromiumインストール
npx playwright install chromium

# メモリ不足の場合
NODE_OPTIONS=--max-old-space-size=4096 npm run export
```

### レイアウト崩れ

```
/layout-fix slides.md
```

---

## Resources

- **Slidev Documentation**: https://sli.dev/
- **Vue 3 Documentation**: https://vuejs.org/
- **Material Design Icons**: https://pictogrammers.com/library/mdi/

---

## Integration Benefits

### プレゼンテーションの質向上

- ✅ 最新情報との整合性確保
- ✅ 専門用語の適切な使用
- ✅ プレゼンテーション効果の科学的根拠に基づく最大化

### 開発効率の向上

- ✅ 設計決定の自動記録と追跡
- ✅ 成功パターンの発見と再利用
- ✅ 知識の組織的蓄積

### 品質保証

- ✅ 自動スタイル整形
- ✅ レイアウト崩れ検出
- ✅ git履歴による変更追跡

---

**すべての機能は既存のSlidev特化機能を維持したまま動作します。**
