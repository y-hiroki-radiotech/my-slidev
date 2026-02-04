# Slidev Medical Education Framework

**AI駆動の医学教育プレゼンテーション自動生成システム**

Claude Code が Gemini CLI（医学的正確性検証・教育設計）と協調し、高品質な放射線治療学スライドを自動生成する。

---

## Why This Exists

| Agent | Strength | Use For |
|-------|----------|---------|
| **Claude Code** | オーケストレーション、Slidev実装 | スライド生成、レイアウト実装、PDF出力 |
| **Gemini CLI** | 1Mトークン、医学知識、Google Search | 最新ガイドライン確認、教育設計コンサルテーション、論文分析 |

**IMPORTANT**: 医学的正確性と教育効果を両立するため、2エージェントの協調が必須。

---

## Context Management (CRITICAL)

Claude Code のコンテキストは **200k トークン** だが、ツール定義等で **実質 70-100k** に縮小する。

**YOU MUST** サブエージェント経由で Gemini を呼び出す（医学調査・論文分析時）。

| タスク | 方法 | 理由 |
|--------|------|------|
| 簡単な質問 | 直接回答OK | オーバーヘッド不要 |
| 医学的検証 | **サブエージェント経由** | メインコンテキスト保護、完全な調査結果を保存 |
| 論文分析 | サブエージェント → ファイル保存 | 詳細は `.claude/docs/research/` に永続化 |

```
# MUST: サブエージェント経由（医学調査・論文分析）
Task(subagent_type="general-purpose", prompt="Geminiで最新ガイドラインを調査し、要約を返して")

# OK: 直接回答（簡単な質問のみ）
直接回答でOK
```

---

## Quick Reference

### いつ Gemini を使うか

- **医学的正確性確認**（「最新のガイドラインは？」「用語は正確？」）
- **教育設計相談**（「どう教えるのが効果的？」「認知負荷は適切？」）
- **レイアウト判断**（「どのレイアウト？」「配色は？」）
- **論文分析**（「このPDFから抄読会スライドを」）
- **コンテンツ調査**（「調べて」「最新の治療法は？」）

→ 詳細: `.claude/rules/gemini-delegation.md`

### いつスキルを使うか

| スキル | 使用タイミング | 成果物 |
|--------|---------------|--------|
| `/create-lecture` | 新規講義作成 | 完全な講義スライド |
| `/add-slide` | セクション追加 | 新規スライドセクション |
| `/create-abstract` | 抄読会準備 | 論文スライド |
| `/slide-style-rector` | スタイル統一 | 整形されたスライド |
| `/layout-fix` | レイアウト崩れ修正 | 修正されたスライド |
| `/slidev-diagram` | 図解追加 | 図解画像 + スライド更新 |
| `/prepare-pdf` | 発表前 | PDF出力 |
| `/plan` | 複雑な講義の計画 | 実装計画 |
| `/design-tracker` | 自動（設計決定時） | DESIGN.md更新 |
| `/checkpointing` | ワークフロー保存 | チェックポイントファイル |

→ 詳細: `.claude/skills/README.md`

---

## Workflow

### 新規講義作成

```
1. lesson_plan/ に授業計画を作成
2. /create-lecture でスライド一括生成
3. /slide-style-rector でスタイル整形
4. /slidev-diagram で図解追加（必要に応じて）
5. /layout-fix でレイアウト確認
6. /prepare-pdf でPDF出力
```

### 医学的正確性確認が必要な場合

```
1. 「最新のガイドラインを確認して」と質問
2. agent-router が Gemini 使用を提案
3. サブエージェント経由で Gemini 調査
4. 結果を .claude/docs/research/medical-{topic}.md に保存
5. 要約を受け取り、スライドに反映
6. design-tracker が自動的に検証結果を記録
```

### 抄読会スライド作成

```
1. 論文情報を準備（DOI、PDF、URLなど）
2. /create-abstract {論文情報} 実行
3. Gemini が論文を分析（必要に応じて）
4. 抄読会スライド自動生成
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
2. **create-lecture** - 講義全体の自動生成
3. **create-abstract** - 抄読会スライド生成
4. **slide-style-rector** - スタイル自動整形
5. **layout-fix** - レイアウト崩れ自動修正
6. **slidev-diagram** - 図解生成とスライド挿入
7. **prepare-pdf** - PDF出力用最適化
8. **archive-lecture** - 講義アーカイブ

### Orchestra統合スキル (3)

8. **plan** - 実装前の計画作成
9. **design-tracker** - 設計決定の自動記録（プロアクティブ）
10. **checkpointing** - ワークフローの保存とパターン発見

→ 詳細: `.claude/skills/README.md`

---

## Agents

### Slidev医学教育エージェント (5)

- **radiation-therapy-educator** - 放射線治療教育の専門家
- **medical-slidev-architect** - Slidev設計アーキテクト
- **adaptive-lecture-designer** - 講義設計の専門家
- **adaptive-content-structurer** - コンテンツ構造化の専門家
- **interactive-medical-presenter** - インタラクティブ実装の専門家

### Orchestra統合エージェント (1)

- **general-purpose** - Gemini CLI連携用サブエージェント

→ 使用方法: `Task(subagent_type="agent-name", prompt="...")`

---

## Documentation

| Location | Content |
|----------|---------|
| `.claude/rules/` | 開発ルール（Gemini使用、セキュリティ、言語） |
| `.claude/docs/DESIGN.md` | プレゼンテーション設計決定の記録 |
| `.claude/docs/research/` | Gemini医学調査結果 |
| `.claude/docs/style-guide.md` | ビジュアルデザイン原則 |
| `.claude/format/layout-patterns.md` | 40種類のレイアウトパターン |
| `.claude/format/template_sides.md` | スライドテンプレート |
| `.claude/logs/cli-tools.jsonl` | Gemini入出力ログ |
| `lesson_plan/` | 授業計画（スライド生成の元） |

---

## Hooks (Automatic)

実行中に自動的にトリガーされるフック:

1. **agent-router** (UserPromptSubmit)
   - 医学用語・レイアウト質問を検知 → Gemini提案

2. **suggest-gemini-research** (PreToolUse: WebSearch|WebFetch)
   - Web検索前 → Gemini調査を提案

3. **log-cli-tools** (PostToolUse: Bash)
   - Gemini実行 → `.claude/logs/cli-tools.jsonl` に記録

→ 設定: `.claude/settings.json`

---

## Gemini CLI Configuration

### Role

Geminiは以下の専門分野でClaude Codeをサポート:

1. **医学的正確性検証** - 最新ガイドライン、治療標準
2. **教育設計コンサルテーション** - 認知負荷、視覚階層
3. **Slidevレイアウト最適化** - 40パターンから推奨
4. **PDF医学論文分析** - 抄読会用コンテンツ抽出
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
│   ├── skills/                 # 10スキル
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
6. **医学的正確性** - 最新ガイドラインに準拠
7. **教育効果優先** - 学習者の認知負荷を考慮

→ 詳細: `.claude/docs/style-guide.md`

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

## Language Protocol

- **思考・コード**: 英語
- **医学用語**: 英語（国際標準）
- **Slidev markdown**: 英語
- **ユーザー対話**: 日本語
- **スライドコンテンツ**: 日本語

---

## Security

### 医療情報保護

- **患者情報**: 一切含めない（PII禁止）
- **症例**: 匿名化・合成データのみ
- **画像**: ライセンス確認、患者特定不可

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

### 1. 新規講義を作成

```
1. lesson_plan/第2回授業の全体像.md を作成
2. /create-lecture 第2回
3. npm run dev でプレビュー
4. /prepare-pdf でPDF出力
```

### 2. 既存スライドに追加

```
1. /add-slide 放射線の生物学的効果
2. /slide-style-rector slides.md
3. npm run dev でプレビュー
```

### 3. 抄読会スライド作成

```
1. /create-abstract 10.1016/j.ijrobp.2024.xxxxx
2. /prepare-pdf pages/abstract-Smith-2024.md
```

### 4. 医学的正確性確認

```
質問: 「前立腺癌の標準分割照射について最新ガイドラインを確認して」
→ agent-router が Gemini を提案
→ サブエージェント経由で調査
→ 結果を .claude/docs/research/ に保存
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
