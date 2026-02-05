---
name: notebook-ask
description: NotebookLMに質問するための簡潔なスキル。登録済みノートブックまたはURLを指定して質問を実行。自動的にフォローアップ質問を判断し、完全な回答が得られるまで繰り返す。「NotebookLMに聞いて」「ノートブックに質問」などのフレーズで呼び出す。アクティブなノートブック、特定のノートブックID、またはURLを直接指定可能。
---

# NotebookLM Ask Question

## Overview

NotebookLMに質問し、必要に応じて自動的にフォローアップ質問を実行して完全な回答を得るスキル。

## Workflow

### Step 1: 質問の実行

3つの方法から選択：

**方法A: アクティブなノートブックに質問**
```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py ask_question.py \
  --question "ユーザーの質問"
```

**方法B: ノートブックIDを指定**
```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py ask_question.py \
  --question "ユーザーの質問" \
  --notebook-id notebook-id
```

**方法C: URLを直接指定**
```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py ask_question.py \
  --question "ユーザーの質問" \
  --notebook-url "https://notebooklm.google.com/notebook/ID"
```

### Step 2: フォローアップ判断

NotebookLMの回答末尾の「**Is that ALL you need to know?**」を確認。

**フォローアップが必要な場合:**
1. 回答とユーザーの元の質問を比較
2. 不足している情報を特定
3. コンテキストを含めた追加質問を実行
4. 完全な回答が得られるまで繰り返す

### Step 3: 回答の統合

すべてのフォローアップ質問の回答を統合し、ユーザーに提示。

## Key Points

### 質問の具体性

**悪い例:**
```bash
--question "それはなぜですか？"  # コンテキスト不明
```

**良い例:**
```bash
--question "線質変換係数kQ,Q0が必要な理由は何ですか？電離箱の感度変化との関係を含めて説明してください"
```

### コンテキストの提供

各質問は独立しているため、十分なコンテキストを含める。

## Usage Examples

**例1: アクティブなノートブックに質問**
```
ユーザー: 水吸収線量について教えて

Claude:
1. アクティブなノートブックに質問実行
2. 回答を確認
3. 不足があればフォローアップ
4. 統合した回答を提示
```

**例2: 特定のノートブックに質問**
```
ユーザー: 「放射線治療技術」ノートブックに、TPR20,10の意味を聞いて

Claude:
1. ノートブックIDを取得（list検索）
2. 質問実行
3. フォローアップ判断
4. 回答提示
```

**例3: URLを直接指定**
```
ユーザー: このNotebookLMに質問：光子線の基準測定条件は？
https://notebooklm.google.com/notebook/abc-123
```

## Troubleshooting

- **アクティブなノートブックがない**: ノートブックIDまたはURLを指定
- **ノートブックが見つからない**: `notebook_manager.py list` で確認
- **認証エラー**: `auth_manager.py setup` で再認証
