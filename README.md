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
│   ├── skills/                  # 20スキル
│   │   ├── create-presentation/ # プレゼンテーション全体生成
│   │   ├── choose-template/     # テンプレート選択（Playwrightプレビュー）
│   │   ├── add-slide/           # スライド追加
│   │   ├── create-document-summary/ # 文書要約スライド
│   │   ├── slide-style-rector/  # スタイル整形
│   │   ├── layout-fix/          # レイアウト修正
│   │   ├── slide-test/          # Playwrightテスト＋オーバーフロー自動修正
│   │   ├── slidev-diagram/      # 図解生成
│   │   ├── prepare-pdf/         # PDF出力
│   │   ├── archive-lecture/     # プレゼンテーションアーカイブ
│   │   ├── add-notes/           # スピーカーノート追加
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
│   │   ├── auto-branch.py       # ブランチ自動作成・マージチェック
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
│   │   ├── research/            # Gemini調査結果
│   │   └── slide-errors/        # エラーカタログ＆テストレポート
│   │       ├── error-catalog.md # エラーパターン集（CSSクリッピング検出対応）
│   │       └── reports/         # テスト結果レポート
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
├── agents/                      # エージェント定義
│   ├── adaptive-content-structure.md
│   ├── adaptive-lecture-designer.md
│   ├── interactive-medical-presenter.md
│   ├── medical-slidev-architect.md
│   ├── radiation-therapy-educator.md
│   └── README.md
│
├── lesson_plan/                 # プレゼンテーション計画
│   ├── lecture-02-radiation-biology.md
│   ├── 第1回授業の全体像.md
│   └── 本論部分の詳細.md
│
├── format/                      # テンプレート
│   ├── layout-patterns.md       # 40種類のレイアウトパターン
│   ├── template_sides.md
│   └── abstract_reading_slide.md
│
├── pages/                       # 個別スライドページ
│   ├── flowchart.md
│   ├── imported-slides.md
│   ├── resources.md
│   └── who_am_i.md
│
├── scripts/                     # 自動化スクリプト
│   ├── check-layout.sh
│   ├── cleanup.sh
│   ├── export-pdf.sh
│   ├── fix-overflow.mjs         # オーバーフロー自動修正
│   └── start-server.sh
│
├── how-to-use/                  # 使い方ドキュメント
│   ├── how_to_use.md
│   └── slidev_write.md
│
├── reviews/                     # レビューレポート保存先
├── previous_lecture/            # アーカイブ済みプレゼンテーション
├── pdf/                         # PDF出力先
├── images/                      # 画像アセット
├── public/                      # 静的アセット
├── components/                  # Vueコンポーネント
├── layouts/                     # カスタムレイアウト
└── snippets/                    # コードスニペット
```

## Skills（20スキル）

### プレゼンテーション作成

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/choose-template` | テンプレート選択（Playwrightプレビュー） | `/choose-template` |
| `/create-presentation` | プレゼンテーション全体生成 | `/create-presentation プロジェクト概要` |
| `/add-slide` | 新規スライドセクション追加 | `/add-slide 技術概要` |
| `/create-document-summary` | 文書要約スライド生成 | `/create-document-summary 10.1016/xxx` |
| `/slidev-diagram` | 図解生成とスライド挿入 | `/slidev-diagram 構造を図解して` |
| `/add-notes` | スピーカーノート追加 | `/add-notes 3-10` |

### スタイル・品質管理

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/slide-style-rector` | スタイル自動整形 | `/slide-style-rector slides.md` |
| `/layout-fix` | レイアウト崩れ自動修正 | `/layout-fix slides.md` |
| `/slide-test` | Playwrightテスト＋オーバーフロー自動修正 | `/slide-test` |

### 出力・管理

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/prepare-pdf` | PDF出力用最適化 | `/prepare-pdf` |
| `/archive-lecture` | プレゼンテーションアーカイブ | `/archive-lecture` |

### 計画・記録

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/plan` | 実装計画作成 | `/plan` |
| `/design-tracker` | 設計決定の自動記録（プロアクティブ） | 自動トリガー |
| `/checkpointing` | ワークフロー保存 | `/checkpointing --full` |

### Git/PR

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/commit-push` | Conventional Commitでコミット・プッシュ | `/commit-push` |
| `/pr-generator` | PR自動生成 | `/pr-generator` |

### レビュー

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/student-review` | 初学者視点レビュー | `/student-review docs/lecture.md` |

### NotebookLM

| スキル | 説明 | 使用例 |
|--------|------|--------|
| `/notebook-ask` | NotebookLMに質問 | `/notebook-ask 質問内容` |
| `/notebook-manage` | NotebookLM管理 | `/notebook-manage list` |
| `/notebook-add` | NotebookLM追加 | `/notebook-add URL` |

## スキル詳細

### `/slide-test` — Playwrightテスト＋オーバーフロー自動修正

Playwright MCPでスライドを自動テストし、CSSクリッピングによるオーバーフローを検出・段階的に自動修正します。

```
/slide-test
/slide-test --no-fix
```

**自動修正フロー:**
1. **Step 1: スペーシング縮小** — `mt-6`→`mt-3`, `p-5`→`p-3`, `space-y-4`→`space-y-2` 等
2. **Step 2: フォントサイズ縮小** — `text-lg`→`text-base`, `text-xl`→`text-lg`
3. **Step 3: ユーザーに確認** — 「さらに縮小」or「スライド分割」を選択

**自動修正スクリプト（直接実行も可能）:**
```bash
node scripts/fix-overflow.mjs slides.md 6,10,11        # Step 1
node scripts/fix-overflow.mjs slides.md 6,10 --step=2  # Step 2
node scripts/fix-overflow.mjs slides.md 6 --dry-run    # ドライラン
```

### `/create-document-summary` — 文書要約スライド

```
/create-document-summary 10.1016/j.example.2024.xxxxx
/create-document-summary --pdf /path/to/document.pdf
/create-document-summary --url https://example.com/document
```

### `/archive-lecture` — プレゼンテーションアーカイブ

```
/archive-lecture
/archive-lecture --custom-name "special-lecture"
/archive-lecture --no-commit
```

ファイル名形式: `lecture-{番号}-{スラッグ化したタイトル}-{日付}.md`

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
bash scripts/cleanup.sh         # 一時ファイル削除
```

### Design System

- **Minimum Text**: 28pt
- **Layout Patterns**: 40 patterns
- **Color Palette**: Primary #1e3a8a (deep blue)
- **Icons**: @iconify-json/mdi

## Hooks

自動化フックにより、適切なタイミングでエージェント連携を提案します。

| フック                         | トリガー           | 動作                              |
| ------------------------------ | ------------------ | --------------------------------- |
| `auto-branch.py`               | ユーザー入力       | mainで作業開始時にブランチ自動作成 |
| `agent-router.py`              | ユーザー入力       | 専門用語・レイアウト質問でGemini提案 |
| `suggest-gemini-research.py`   | WebSearch前        | Gemini調査を提案                  |
| `log-cli-tools.py`             | Gemini実行         | 入出力ログ記録                    |

## Gemini CLI Integration

### いつGeminiを使うか

- **専門性の確認** - 最新情報、業界標準
- **プレゼンテーション設計相談** - 認知負荷、視覚階層、効果
- **レイアウト判断** - 40パターンから最適なものを推奨
- **文書分析** - PDF文書の構造化抽出
- **PDF→Markdown変換** - PDFをMarkdown形式に変換

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

## ワークフロー

### 新規プレゼンテーション作成

1. **プレゼンテーション計画作成** - `lesson_plan/` にプレゼンテーション計画を作成
2. **テンプレート選択（任意）** - `/choose-template` でプレビュー付き選択
3. **スライド生成** - `/create-presentation` で一括生成
4. **図解追加** - `/slidev-diagram` で必要な図解を追加
5. **スタイル整形** - `/slide-style-rector` で統一
6. **テスト・修正** - `/slide-test` でオーバーフロー検出＆自動修正
7. **PDF出力** - `/prepare-pdf` で発表用PDF作成

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

## Language Rules

- **コード・思考**: 英語
- **専門用語**: 適切な言語（分野による）
- **Slidev markdown**: 英語
- **ユーザーへの応答**: 日本語
- **スライドコンテンツ**: 日本語

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

## Resources

- **Slidev Documentation**: https://sli.dev/
- **Vue 3 Documentation**: https://vuejs.org/
- **Material Design Icons**: https://pictogrammers.com/library/mdi/
