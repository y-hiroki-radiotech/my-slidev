# Slidev General Purpose Presentation Framework

**AI駆動の汎用プレゼンテーション自動生成システム**

Claude Code が Gemini CLI（内容の正確性検証・プレゼンテーション設計）と協調し、高品質なプレゼンテーションスライドを自動生成する。

---

## Why This Exists

| Agent | Strength | Use For |
|-------|----------|---------|
| **Claude Code** | オーケストレーション、Slidev実装 | スライド生成、レイアウト実装、PDF出力 |
| **Gemini CLI** | 1Mトークン、専門知識、Google Search | 最新情報確認、プレゼンテーション設計コンサルテーション、文書分析 |

**IMPORTANT**: 内容の正確性とプレゼンテーション効果を両立するため、2エージェントの協調が必須。

---

## Context Management (CRITICAL)

Claude Code のコンテキストは **200k トークン** だが、ツール定義等で **実質 70-100k** に縮小する。

**YOU MUST** サブエージェント経由で Gemini を呼び出す（専門分野の調査・文書分析時）。

| タスク | 方法 | 理由 |
|--------|------|------|
| 簡単な質問 | 直接回答OK | オーバーヘッド不要 |
| 専門性の検証 | **サブエージェント経由** | メインコンテキスト保護、完全な調査結果を保存 |
| 文書分析 | サブエージェント → ファイル保存 | 詳細は `.claude/docs/research/` に永続化 |

```
# MUST: サブエージェント経由（専門分野の調査・文書分析）
Task(subagent_type="general-purpose", prompt="Geminiで最新情報を調査し、要約を返して")

# OK: 直接回答（簡単な質問のみ）
直接回答でOK
```

---

## Quick Reference

### いつ Gemini を使うか

- **内容の正確性確認**（「最新情報は？」「用語は正確？」）
- **プレゼンテーション設計相談**（「どう伝えるのが効果的？」「認知負荷は適切？」）
- **レイアウト判断**（「どのレイアウト？」「配色は？」）
- **文書分析**（「このPDFから要約スライドを」）
- **コンテンツ調査**（「調べて」「最新の動向は？」）

→ 詳細: `.claude/rules/gemini-delegation.md`

### いつスキルを使うか

| スキル | 使用タイミング | 成果物 |
|--------|---------------|--------|
| `/create-presentation` | 新規プレゼン作成 | 完全なプレゼンスライド |
| `/add-slide` | セクション追加 | 新規スライドセクション |
| `/create-document-summary` | 文書要約準備 | 文書要約スライド |
| `/slide-style-rector` | スタイル統一 | 整形されたスライド |
| `/layout-fix` | レイアウト崩れ修正 | 修正されたスライド |
| `/slidev-diagram` | 図解追加 | 図解画像 + スライド更新 |
| `/prepare-pdf` | 発表前 | PDF出力 |
| `/plan` | 複雑なプレゼンの計画 | 実装計画 |
| `/design-tracker` | 自動（設計決定時） | DESIGN.md更新 |
| `/checkpointing` | ワークフロー保存 | チェックポイントファイル |

→ 詳細: `.claude/skills/README.md`

---

## Workflow

### 新規プレゼンテーション作成

```
1. lesson_plan/ にプレゼンテーション計画を作成
2. /create-presentation でスライド一括生成
3. /slide-style-rector でスタイル整形
4. /slidev-diagram で図解追加（必要に応じて）
5. /layout-fix でレイアウト確認
6. /prepare-pdf でPDF出力
```

### 専門性の確認が必要な場合

```
1. 「最新情報を確認して」と質問
2. agent-router が Gemini 使用を提案
3. サブエージェント経由で Gemini 調査
4. 結果を .claude/docs/research/{topic}.md に保存
5. 要約を受け取り、スライドに反映
6. design-tracker が自動的に検証結果を記録
```

### 文書要約スライド作成

```
1. 文書情報を準備（DOI、PDF、URLなど）
2. /create-document-summary {文書情報} 実行
3. Gemini が文書を分析（必要に応じて）
4. 文書要約スライド自動生成
5. /prepare-pdf でPDF出力
```

---

## Tech Stack

### Slidev

- **Framework**: Slidev (Vue 3 based)
- **Themes**: seriph (primary), apple-basic
- **Icons**: @iconify-json/mdi
- **Package Manager**: npm
- **Export**: PDF (via Playwright)

### Design System

- **Minimum Text**: 28pt
- **Layout Patterns**: 40 patterns (`.claude/format/layout-patterns.md`)
- **Style Guide**: `.claude/docs/style-guide.md`
- **Color Palette**: Primary #1e3a8a (deep blue)

### Commands

```bash
npm run dev           # 開発サーバー起動
npm run build         # プロダクションビルド
npm run export        # PDF出力
```

→ 詳細: `.claude/rules/dev-environment-slidev.md`

---

## Skills Overview

### Slidev特化スキル (8)

1. **add-slide** - 新規スライドセクション追加
2. **create-presentation** - プレゼンテーション全体の自動生成
3. **create-document-summary** - 文書要約スライド生成
4. **slide-style-rector** - スタイル自動整形
5. **layout-fix** - レイアウト崩れ自動修正
6. **slidev-diagram** - 図解生成とスライド挿入
7. **prepare-pdf** - PDF出力用最適化
8. **archive-lecture** - プレゼンテーションアーカイブ

### Orchestra統合スキル (3)

8. **plan** - 実装前の計画作成
9. **design-tracker** - 設計決定の自動記録（プロアクティブ）
10. **checkpointing** - ワークフローの保存とパターン発見

→ 詳細: `.claude/skills/README.md`

---

## Agents

### Slidevプレゼンテーションエージェント (5)

- **presentation-content-expert** - プレゼンテーション内容の専門家
- **slidev-architect** - Slidev設計アーキテクト
- **presentation-designer** - プレゼンテーション設計の専門家
- **content-structurer** - コンテンツ構造化の専門家
- **interactive-presenter** - インタラクティブ実装の専門家

### Orchestra統合エージェント (1)

- **general-purpose** - Gemini CLI連携用サブエージェント

→ 使用方法: `Task(subagent_type="agent-name", prompt="...")`

---

## Documentation

| Location | Content |
|----------|---------|
| `.claude/rules/` | 開発ルール（Gemini使用、セキュリティ、言語） |
| `.claude/docs/DESIGN.md` | プレゼンテーション設計決定の記録 |
| `.claude/docs/research/` | Gemini調査結果 |
| `.claude/docs/style-guide.md` | ビジュアルデザイン原則 |
| `.claude/format/layout-patterns.md` | 40種類のレイアウトパターン |
| `.claude/format/template_sides.md` | スライドテンプレート |
| `.claude/logs/cli-tools.jsonl` | Gemini入出力ログ |
| `lesson_plan/` | プレゼンテーション計画（スライド生成の元） |

---

## Hooks (Automatic)

実行中に自動的にトリガーされるフック:

1. **agent-router** (UserPromptSubmit)
   - 専門用語・レイアウト質問を検知 → Gemini提案

2. **suggest-gemini-research** (PreToolUse: WebSearch|WebFetch)
   - Web検索前 → Gemini調査を提案

3. **log-cli-tools** (PostToolUse: Bash)
   - Gemini実行 → `.claude/logs/cli-tools.jsonl` に記録

→ 設定: `.claude/settings.json`

---

## Gemini CLI Configuration

### Role

Geminiは以下の専門分野でClaude Codeをサポート:

1. **専門性の検証** - 最新情報、業界標準
2. **プレゼンテーション設計コンサルテーション** - 認知負荷、視覚階層
3. **Slidevレイアウト最適化** - 40パターンから推奨
4. **PDF文書分析** - 要約用コンテンツ抽出
5. **マルチモーダル処理** - PDF、動画、音声

### Configuration

```
.gemini/
├── GEMINI.md          # Geminiの役割定義
├── settings.json      # モデル・コンテキスト設定
└── skills/
    └── context-loader/ # プロジェクトコンテキスト自動読み込み
```

→ モデル: `gemini-2.0-flash-exp`
→ 詳細: `.gemini/GEMINI.md`

---

## Project Structure

```
my-slidev/
├── .gemini/                    # Gemini CLI設定
├── .claude/                    # Claude Code設定
│   ├── agents/                 # 6エージェント
│   ├── hooks/                  # 3自動化フック
│   ├── rules/                  # 4開発ルール
│   ├── skills/                 # 11スキル
│   ├── commands/               # 詳細手順書
│   ├── docs/                   # 設計・調査ドキュメント
│   ├── logs/                   # ログ
│   ├── checkpoints/            # アーカイブ
│   └── settings.json           # フック設定
├── lesson_plan/                # 授業計画
├── format/                     # テンプレート・パターン
├── slides.md                   # メインスライド
└── pages/                      # 個別スライドページ
```

---

## Design Principles

### スライド作成の基本ルール

1. **1スライド1メッセージ** - 情報を詰め込まない
2. **28pt以上** - 本文の文字サイズ最低基準
3. **適切な余白** - mt-5, mb-5で可読性確保
4. **レイアウトパターン使用** - 40種から選択
5. **コロン・感嘆符禁止** - 簡潔で明確な文章
6. **内容の正確性** - 最新情報に準拠
7. **プレゼンテーション効果優先** - 聴衆の認知負荷を考慮

→ 詳細: `.claude/docs/style-guide.md`

---

## Language Protocol

- **思考・コード**: 英語
- **専門用語**: 適切な言語（分野による）
- **Slidev markdown**: 英語
- **ユーザー対話**: 日本語
- **スライドコンテンツ**: 日本語

---

## Security

### 機密情報保護

- **個人情報**: 一切含めない（PII禁止）
- **実例**: 匿名化・合成データのみ
- **画像**: ライセンス確認、個人特定不可

### ファイル管理

- **画像パス**: 相対パス使用（`./images/`）
- **環境変数**: `.env`はgit管理外
- **秘密情報**: ハードコード禁止

→ 詳細: `.claude/rules/security.md`

---

## Troubleshooting

### スキルが動作しない

```bash
# スキルリスト確認
ls .claude/skills/

# 各スキルのSKILL.mdを確認
cat .claude/skills/create-lecture/SKILL.md
```

### Gemini CLIエラー

```bash
# インストール確認
which gemini

# 認証確認
gemini auth login

# 設定確認
gemini config list
```

### レイアウト崩れ

```
/layout-fix slides.md
```

### PDF出力失敗

```bash
# Chromiumインストール
npx playwright install chromium

# メモリ不足の場合
NODE_OPTIONS=--max-old-space-size=4096 npm run export
```

---

## Quick Start

### 1. 新規プレゼンテーションを作成

```
1. lesson_plan/プレゼンテーション計画.md を作成
2. /create-presentation
3. npm run dev でプレビュー
4. /prepare-pdf でPDF出力
```

### 2. 既存スライドに追加

```
1. /add-slide {追加したいトピック}
2. /slide-style-rector slides.md
3. npm run dev でプレビュー
```

### 3. 文書要約スライド作成

```
1. /create-document-summary {文書情報}
2. /prepare-pdf pages/summary-{title}.md
```

### 4. 専門性の確認

```
質問: 「{トピック}について最新情報を確認して」
→ agent-router が Gemini を提案
→ サブエージェント経由で調査
→ 結果を .claude/docs/research/ に保存
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
