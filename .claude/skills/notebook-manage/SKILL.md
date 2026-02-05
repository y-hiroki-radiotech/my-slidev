---
name: notebook-manage
description: NotebookLMノートブックライブラリの管理スキル。ノートブックの一覧表示、検索、アクティブ化、削除などの管理操作をまとめて提供。「ノートブック一覧を表示」「NotebookLMを検索」「ノートブックを削除」などのフレーズで呼び出す。登録済みノートブックの確認、トピックによる検索、よく使うノートブックのアクティブ化、不要なノートブックの削除に対応。
---

# NotebookLM Notebook Management

## Overview

NotebookLMノートブックライブラリの管理操作（一覧、検索、アクティブ化、削除）を提供するスキル。

## Operations

### 1. ノートブック一覧表示

登録済みの全ノートブックを表示：

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py list
```

**出力内容:**
- ノートブックID
- 名前
- 説明
- トピック
- アクティブ状態

### 2. ノートブック検索

トピックやキーワードで検索：

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py search --query "検索ワード"
```

**検索対象:**
- ノートブック名
- 説明
- トピック

### 3. アクティブ化

よく使うノートブックを設定：

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py activate --id notebook-id
```

**効果:**
- 質問時にノートブックIDやURLの指定が不要になる

### 4. 削除

不要なノートブックを削除：

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py remove --id notebook-id
```

### 5. 統計情報

ライブラリの統計を表示：

```bash
cd /Users/user/.claude/skills/notebooklm && python scripts/run.py notebook_manager.py stats
```

## Usage Examples

**例1: 一覧表示**
```
ユーザー: NotebookLMのノートブック一覧を見せて

Claude: notebook_manager.py list を実行
```

**例2: 検索**
```
ユーザー: 「放射線」に関するノートブックを探して

Claude: notebook_manager.py search --query "放射線"
```

**例3: アクティブ化**
```
ユーザー: 「放射線治療技術」をアクティブにして

Claude:
1. list で該当ノートブックのIDを確認
2. activate --id <id> で設定
```

**例4: 削除**
```
ユーザー: 「古い資料」ノートブックを削除

Claude:
1. list で該当ノートブックのIDを確認
2. 削除確認
3. remove --id <id> で削除
```

## Workflow Tips

### ノートブック選択の流れ

1. `list` で全体を確認
2. `search` で絞り込み
3. `activate` でよく使うものを設定
4. 不要なものは `remove` で削除

### アクティブ化のメリット

- 毎回IDやURLを指定する手間が不要
- `notebook-ask` スキルでの質問が簡単に

## Troubleshooting

- **ライブラリが空**: `notebook-add` スキルでノートブックを追加
- **IDが不明**: `list` コマンドでID を確認
- **削除の取り消し**: 削除は永続的、再度追加が必要
