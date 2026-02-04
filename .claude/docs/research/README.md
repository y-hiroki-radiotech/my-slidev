# Research Documentation

このディレクトリには、Gemini CLIを使用した調査結果を保存します。

## 保存形式

各調査結果は個別のMarkdownファイルとして保存されます。

ファイル名例:
- `medical-{topic}.md` - 医学的正確性の確認結果
- `layout-{decision}.md` - レイアウト設計の調査結果
- `educational-{approach}.md` - 教育設計の調査結果
- `codebase-analysis.md` - コードベース分析結果

## 使用方法

サブエージェント(general-purpose)がGemini CLIを呼び出し、完全な出力をこのディレクトリに保存します。

メインのClaude Codeは要約のみを受け取り、詳細が必要な場合にこれらのファイルを参照します。
