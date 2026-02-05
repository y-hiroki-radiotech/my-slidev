# Claude Code Copilot Instructions

このリポジトリは、Claude CodeをGitHub Actionsとカスタムスキルで統合し、開発ワークフローを自動化するプラットフォームです。

## 🏗️ アーキテクチャ概要

### 主要コンポーネント

1. **GitHub Actions ワークフロー** (`.github/workflows/`)
   - `claude-code-review.yml`: PR作成時に自動コードレビュー実行
   - `claude.yml`: IssueやPRコメントで `@claude` メンション時に対話形式で対応

2. **Claude Code カスタムスキル** (`.claude/skills/`)
   - 各スキルは`SKILL.md`で仕様を定義
   - `.skill`ファイルはバイナリ形式（スキルのパッケージ化）
   - ユーザーが `/skill-name` で明示的に呼び出すか、自然言語で自動認識される

### データフロー

```
User Request → GitHub Actions/CLI
    ↓
Claude Code (oauth token認証)
    ↓
Skill実行（.SKILL.md の仕様に従う）
    ↓
Output生成/ファイル更新
```

## 📋 主要スキル

| スキル | 用途 | 呼び出し方 |
|--------|------|---------|
| **commit-push** | Conventional Commits形式でコミット・プッシュ | `/commit-push` または コミットメッセージ提案 |
| **student-review** | Markdownを初学者視点でレビュー | `/student-review <file>` |
| **notebook-ask** | NotebookLMに質問（フォローアップ自動化） | `NotebookLMに聞いて` |
| **notebook-manage** | NotebookLMノートブック管理（一覧・検索・削除） | `ノートブック一覧を表示` |
| **notebook-add** | NotebookLMをライブラリに自動追加 | `このNotebookLMをライブラリに追加` |

## 🛠️ 開発ワークフロー

### コード変更時

1. `git add` でステージ
2. `/commit-push` スキルを実行
3. Conventional Commits形式（`type(scope): 説明`）の候補から選択
4. 自動的にコミット・プッシュ

### 教材作成時

1. Markdownファイルを作成
2. `/student-review <file>` で初学者視点のレビュー実行
3. `-review.md` ファイルが自動生成
4. 「なぜわかりにくいか」「実務での活用」を含む改善提案を参考に修正

### NotebookLM統合時

1. `notebook-manage list` でノートブック一覧確認
2. `notebook-add` で新しいノートブークを登録（スマート分析で自動メタデータ生成）
3. `notebook-ask` で質問実行（自動フォローアップで完全な回答獲得）

## 🔑 重要な規約

### Conventional Commits フォーマット

```
type(scope): 説明

type: feat | fix | docs | style | refactor | test | chore
scope: 変更対象の機能/モジュール（任意）
説明: 日本語、50文字以内推奨
```

### Student Review レポート構造

- **疑問点ごと**に以下を記載：
  - 箇所：該当する文章を引用
  - なぜ疑問が生じるか
  - 改善提案
  - 現場での活用
- **初学者視点**：前提知識、用語定義、説明の飛躍に注目
- **現場での活用**：具体的な業務場面とメリット

### Skill定義の形式

```yaml
---
name: skill-name
description: 簡潔な説明
---

# Skill Title

## Overview
## Workflow
## Key Points / Guidelines
## Usage Examples
```

## 🔌 外部依存

- **GitHub Actions**: `anthropics/claude-code-action@v1` でClaudeを実行
- **NotebookLM API**: Python スクリプト（`.claude/skills/notebooklm/`）で呼び出し
- **認証**: `CLAUDE_CODE_OAUTH_TOKEN` を環境変数/Secretsに設定

## 📁 ファイル参照

- **ワークフロー定義**: [.github/workflows/](../../.github/workflows/)
- **スキル仕様**: [.claude/skills/*/SKILL.md](.claude/skills/*/SKILL.md)
- **PR テンプレート**: [.github/pull_request_template.md](.github/pull_request_template.md)
- **API ガイド**: [docs/notebooklm-usage-guide.md](../docs/notebooklm-usage-guide.md)

## 💡 AIエージェント向けのポイント

1. **スキル呼び出し時**：`SKILL.md` の「Workflow」と「Key Points」に従う
2. **エラーハンドリング**：各スキルの Troubleshooting セクションを参照
3. **日本語ファースト**：コミットメッセージ、スキル出力は日本語で統一
4. **ノートブック API**：認証前に `auth_manager.py setup` で初期設定
5. **Conventional Commits**：提案候補は必ず3つ、ユーザー選択を優先
