---
name: pr-generator
description: PRテンプレートと変更差分を元にPRの下書きを自動生成し、確認後ghコマンドでPRを作成する。
---

# PR作成

PRテンプレートと変更差分を元に下書きを作成し、確認後PRを作成する。

## ワークフロー

### 1. PRテンプレートの読み込み

以下の順序でPRテンプレートを探索し、最初に見つかったものを読み込む。

1. `.github/pull_request_template.md`
2. `pull_request_template.md`
3. `docs/pull_request_template.md`

テンプレートが見つかった場合、その構造に従って下書きを生成。

### 2. コミット範囲の選択

AskUserQuestionツールを使用する。

- `header`: "範囲"
- `question`: "PRに含めるコミット範囲を選択してください"
- `options`:
  - `label`: "ブランチ全体（ベースブランチからの差分）"
  - `description`: "現在のブランチの全コミットを含める"
  - `label`: "最新コミット1件"
  - `description`: "直近1件のコミットを対象"
  - `label`: "カスタム"
  - `description`: "直近N件、コミットハッシュ、ブランチ名などを指定"

「ブランチ全体」を選択した場合、AskUserQuestionでベースブランチを確認する。

- `header`: "ベース"
- `question`: "どのブランチからの差分を取得しますか？"
- `options`:
  - `label`: "develop" / `description`: "developブランチからの差分"
  - `label`: "main" / `description`: "mainブランチからの差分"
  - `label`: "その他" / `description`: "別のブランチを指定"

### 3. 差分の取得

選択に応じてgit diffを実行する。

- **ブランチ全体**: `git diff <ベースブランチ>...HEAD` と `git log <ベースブランチ>..HEAD --oneline`
- **最新コミット1件**: `git diff HEAD~1..HEAD` と `git log -1 --oneline`
- **カスタム**: ユーザーに詳細を確認（例: 直近N件 → `HEAD~N..HEAD`、特定ハッシュ → `abc123..HEAD`）

### 4. 下書きの生成

テンプレートの各セクションに対応する内容を生成し、@tmp/pr フォルダに出力。
下書きファイル生成後、ユーザーにファイルの絶対パスを明示的に表示。

### 5. ユーザー確認

下書き内容を表示し、AskUserQuestionで確認する。

- `header`: "確認"
- `question`: "この内容でPRを作成しますか？"
- `options`:
  - `label`: "このまま作成" / `description`: "現在の内容でPRを作成"
  - `label`: "修正が必要" / `description`: "修正箇所を指示"

「修正が必要」の場合はユーザーの指示に従って修正し、再度確認。

### 6. ベースブランチの確認

AskUserQuestionツールを使用する。

- `header`: "ベース"
- `question`: "マージ先のブランチを選択してください"
- `options`:
  - `label`: "develop" / `description`: "developブランチにマージ"
  - `label`: "main" / `description`: "mainブランチにマージ"
  - `label`: "その他" / `description`: "別のブランチを指定"

### 7. PR作成

確認OKが出たら、ghコマンドでPRを作成。

```bash
gh pr create --draft --assignee @me --title "変更内容の要約" --body-file tmp/pr/XXXX.md --base <選択したブランチ>
```

作成後、PRのURLを表示。
