# Slidev Medical Education Framework

**AI駆動の医学教育プレゼンテーション自動生成システム**

![slide system](https://storage.googleapis.com/zenn-user-upload/c219b1c77e2d-20260204.png)

```
Claude Code (Orchestrator) ─┬─ Gemini CLI (Medical Research)
                            └─ Slidev Skills (Presentation Generation)
```

高品質な放射線治療学スライドを自動生成。医学的正確性と教育効果を両立。

## Quick Start

### 新規講義を作成

```bash
# 1. 授業計画を作成
# lesson_plan/第2回授業の全体像.md を作成

# 2. Claude Codeでスライド生成
claude
> /create-lecture 第2回

# 3. プレビュー
npm run dev

# 4. PDF出力
> /prepare-pdf
```

### 抄読会スライド作成

```bash
claude
> /create-abstract 10.1016/j.ijrobp.2024.xxxxx

# または PDFから
> /create-abstract --pdf /path/to/paper.pdf
```

### 既存スライドに追加

```bash
claude
> /add-slide 放射線の生物学的効果
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
│  │              │  医学調査    │                         │  │
│  │              │  論文分析    │                         │  │
│  │              │  教育設計    │                         │  │
│  │              └──────────────┘                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### コンテキスト管理（重要）

メインオーケストレーターのコンテキストを節約するため、医学調査・論文分析はサブエージェント経由で実行します。

| 状況                   | 推奨方法                            |
| ---------------------- | ----------------------------------- |
| 医学的正確性確認       | サブエージェント経由                |
| 論文分析               | サブエージェント経由 → ファイル保存 |
| 教育設計相談           | サブエージェント経由                |
| 簡単な質問             | 直接回答OK                          |

## Directory Structure

```
my-slidev/
├── CLAUDE.md                    # メインシステムドキュメント
├── README.md
├── slides.md                    # メインスライド
├── package.json
│
├── .claude/
│   ├── agents/
│   │   ├── general-purpose.md   # Gemini連携サブエージェント
│   │   ├── radiation-therapy-educator.md
│   │   ├── medical-slidev-architect.md
│   │   └── ...                  # 医学教育特化エージェント
│   │
│   ├── skills/                  # 11スキル
│   │   ├── create-lecture/      # 講義全体生成
│   │   ├── add-slide/           # スライド追加
│   │   ├── create-abstract/     # 抄読会スライド
│   │   ├── slide-style-rector/  # スタイル整形
│   │   ├── layout-fix/          # レイアウト修正
│   │   ├── slidev-diagram/      # 図解生成
│   │   ├── prepare-pdf/         # PDF出力
│   │   ├── archive-lecture/     # 講義アーカイブ
│   │   ├── plan/                # 実装計画
│   │   ├── design-tracker/      # 設計記録
│   │   └── checkpointing/       # ワークフロー保存
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
│   │   └── research/            # Gemini医学調査結果
│   │
│   └── logs/
│       └── cli-tools.jsonl      # Gemini入出力ログ
│
├── .gemini/                     # Gemini CLI設定
│   ├── GEMINI.md                # 医学教育特化の役割定義
│   ├── settings.json
│   └── skills/
│       └── context-loader/      # コンテキスト自動読み込み
│
├── lesson_plan/                 # 授業計画
│   ├── 第1回授業の全体像.md
│   └── 本論部分の詳細.md
│
├── format/                      # テンプレート
│   ├── layout-patterns.md       # 40種類のレイアウトパターン
│   ├── template_sides.md
│   └── abstract_reading_slide.md
│
└── pages/                       # 個別スライド
    └── who_am_i.md
```

## Skills

### `/create-lecture` — 講義全体生成

授業計画から講義全体のスライドを一括生成します。

```
/create-lecture 第1回
```

**ワークフロー:**
1. `lesson_plan/` から授業計画を読み込み
2. フロントマター・導入・本論・まとめを自動生成
3. スタイルガイドに準拠
4. git commit

### `/add-slide` — スライド追加

既存スライドに新しいセクションを追加します。

```
/add-slide 放射線の種類と特性
```

**出力:**
- 新規スライドセクション
- 既存スタイルとの整合性確保

### `/create-abstract` — 抄読会スライド

医学論文から抄読会用スライドを自動生成します。

```
/create-abstract 10.1016/j.ijrobp.2024.xxxxx
/create-abstract --pdf /path/to/paper.pdf
/create-abstract --url https://pubmed.ncbi.nlm.nih.gov/12345678/
```

**ワークフロー:**
1. 論文情報取得（DOI/PDF/URL）
2. Geminiで論文分析（必要に応じて）
3. 背景・方法・結果・考察を構造化
4. 抄読会フォーマットで生成

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
- 教育設計アプローチ
- 医学的正確性確認

### `/checkpointing` — ワークフロー保存

セッションの状態を保存し、再利用可能なパターンを発見します。

```bash
/checkpointing              # 基本: 履歴ログ
/checkpointing --full       # 完全: git履歴・ファイル変更含む
/checkpointing --analyze    # 分析: スキルパターン発見
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
| `agent-router.py`              | ユーザー入力       | 医学用語・レイアウト質問でGemini提案 |
| `suggest-gemini-research.py`   | WebSearch前        | Gemini調査を提案                 |
| `log-cli-tools.py`             | Gemini実行         | 入出力ログ記録                   |

## Language Rules

- **コード・思考**: 英語
- **医学用語**: 英語（国際標準）
- **Slidev markdown**: 英語
- **ユーザーへの応答**: 日本語
- **スライドコンテンツ**: 日本語

---

## Gemini CLI Integration

### いつGeminiを使うか

- **医学的正確性確認** - 最新ガイドライン、治療標準
- **教育設計相談** - 認知負荷、視覚階層、学習効果
- **レイアウト判断** - 40パターンから最適なものを推奨
- **論文分析** - PDF医学論文の構造化抽出

### 使い方

**自動提案:**
「最新のガイドラインを確認して」と質問すると、agent-routerがGemini使用を提案します。

**サブエージェント経由（推奨）:**
```
Task(subagent_type="general-purpose",
     prompt="Geminiで前立腺癌の標準分割照射について調査し、要約を返して")
```

**直接呼び出し（ターミナル）:**
```bash
gemini -p "放射線治療の分割照射について説明して" 2>/dev/null
```

---

## このフレームワークを使う

### 新規講義を作成

1. **授業計画作成** - `lesson_plan/` に授業計画を作成
2. **スライド生成** - `/create-lecture` で一括生成
3. **図解追加** - `/slidev-diagram` で必要な図解を追加
4. **スタイル整形** - `/slide-style-rector` で統一
5. **レイアウト確認** - `/layout-fix` で修正
6. **PDF出力** - `/prepare-pdf` で発表用PDF作成

### 抄読会準備

1. **論文情報準備** - DOI、PDF、URLのいずれか
2. **スライド生成** - `/create-abstract` で自動生成
3. **PDF出力** - `/prepare-pdf` で発表用PDF作成

### 医学的正確性確認

1. **質問** - 「最新のガイドラインを確認して」
2. **自動ルーティング** - agent-routerがGemini提案
3. **調査** - サブエージェント経由でGemini調査
4. **保存** - `.claude/docs/research/medical-{topic}.md` に保存
5. **記録** - design-trackerが自動的に検証結果を記録

### カスタマイズ

- **CLAUDE.md**: プロジェクト固有の情報を追加
- **lesson_plan/**: 授業計画をカスタマイズ
- **format/**: レイアウトパターン・テンプレートを追加
- **.claude/skills/**: カスタムスキルを追加
- **.claude/rules/**: ルールをカスタマイズ

---

## Medical Education Focus

### Target Audience

- 医学生
- 放射線科レジデント
- 放射線治療専門医

### Learning Objectives

- 放射線治療の基礎理論
- 治療計画の実践
- 最新治療技術の理解
- 臨床判断能力の向上

### Educational Strategies

- 段階的開示（v-clicks）
- ビジュアル重視（図解・ダイアグラム）
- 理論と実践の統合
- ケースベース学習

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
- **NCCN Guidelines**: https://www.nccn.org/
- **ASTRO Guidelines**: https://www.astro.org/

---

## Integration Benefits

### 医学教育の質向上

- ✅ 最新ガイドラインとの整合性確保
- ✅ 医学用語の国際標準への準拠
- ✅ 教育効果の科学的根拠に基づく最大化

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
