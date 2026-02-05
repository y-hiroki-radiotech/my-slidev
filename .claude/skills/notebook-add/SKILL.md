---
name: notebook-add
description: NotebookLMのノートブックをライブラリに簡単に追加するスキル。URLを指定するだけで自動的に内容を分析し、適切なメタデータとともに登録。「NotebookLMにノートブックを追加」「このNotebookLMを登録して」などのフレーズで呼び出す。スマート追加機能により、ノートブックの内容、トピック、説明を自動生成。
---

# NotebookLM Notebook Add

## Overview

NotebookLMのノートブックをライブラリに追加する専用スキル。URLを指定するだけで自動的に内容を分析し、適切なメタデータを生成して登録します。

## Workflow

### Step 1: URLの取得

ユーザーからNotebookLMのノートブックURLを取得。

形式: `https://notebooklm.google.com/notebook/NOTEBOOK-ID`

### Step 2: スマート追加の実行

**2-1. 内容の自動分析**

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py ask_question.py \
  --question "What is the content of this notebook? What topics are covered? Provide a complete overview briefly and concisely including suggested name, description, and topics" \
  --notebook-url "USER_PROVIDED_URL"
```

**2-2. 分析結果をもとに登録**

分析結果から抽出：
- **name**: ノートブックの簡潔な名前
- **description**: 内容の説明（1-2文）
- **topics**: カンマ区切りのトピック（3-5個）

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py add \
  --url "USER_PROVIDED_URL" \
  --name "分析から抽出した名前" \
  --description "分析から抽出した説明" \
  --topics "トピック1,トピック2,トピック3"
```

### Step 3: 結果確認

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py list
```

## Usage Examples

**例1:**
```
ユーザー: このNotebookLMをライブラリに追加して
https://notebooklm.google.com/notebook/abc-123
```

**例2:**
```
ユーザー: NotebookLMのノートブックを登録したい
URL: https://notebooklm.google.com/notebook/xyz-789
```

## Troubleshooting

- **認証エラー**: `cd /Users/user/.claude/skills/notebooklm && python scripts/run.py auth_manager.py setup`
- **URL形式エラー**: 正しい形式は `https://notebooklm.google.com/notebook/ID`
- **既に登録済み**: `notebook_manager.py list` で確認
