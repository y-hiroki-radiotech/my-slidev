---
name: choose-template
description: スライド作成前にビジュアルテンプレートを選択し、Playwrightでプレビューを生成して提案する
tools: [Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_close]
---

# テンプレート選択スキル

**引数:** なし（対話型）

スライド作成前にビジュアルテンプレートを選択するスキル。5つのプリセットからPlaywright MCPで実際のSlidevプレビューを生成し、ユーザーに視覚的に提案する。

## 実行フロー

### Phase 1: プレビュー生成

1. **テンプレート定義の読み込み**
   - `.claude/skills/choose-template/templates/presets.md` を読み込む
   - 5つのテンプレートプリセットを解析する

2. **スクラッチパッド準備**
   - スクラッチパッドディレクトリ（システム指定のパス）に `previews/` ディレクトリを作成
   - 各テンプレートのサンプルスライド（3枚: タイトル、セクション区切り、コンテンツ）を一時ファイルとして書き出す

3. **テンプレートごとにプレビュー生成ループ**

   各テンプレート（1〜5）について以下を繰り返す:

   a. **サンプルスライドファイルを書き出す**
      - スクラッチパッドに `template-preview.md` として書き出す
      - presets.md 内の該当テンプレートの3枚のスライドmarkdownを使用
      - 最初のスライドにはフロントマター（theme, colorSchema等）を含める

   b. **Slidev dev server を起動**
      ```bash
      cd /Users/user/Desktop/my-slidev && npx slidev {scratchpad}/template-preview.md --port 3031 --open false &
      ```
      - ポート3031を使用（メインの3030と競合しない）
      - サーバー起動を3〜5秒待つ

   c. **Playwright MCP でスクリーンショット撮影**
      - `browser_navigate` で `http://localhost:3031/1` にアクセス
      - 2秒待機後、`browser_take_screenshot` でタイトルスライドを撮影
        - ファイル名: `{scratchpad}/previews/template-{N}-title.png`
      - `http://localhost:3031/2` → セクション区切りスライド撮影
        - ファイル名: `{scratchpad}/previews/template-{N}-section.png`
      - `http://localhost:3031/3` → コンテンツスライド撮影
        - ファイル名: `{scratchpad}/previews/template-{N}-content.png`

   d. **サーバー停止**
      ```bash
      lsof -ti :3031 | xargs kill 2>/dev/null
      ```

   e. 次のテンプレートへ

4. **クリーンアップ**
   - 一時ファイル `template-preview.md` を削除
   - ポート3031のプロセスが残っていないことを確認

### Phase 2: ユーザーに提案

1. **プレビュー画像の表示**

   各テンプレートについて:
   - Read ツールでスクリーンショット画像を読み込み（Claude Code は画像読み込み可能）
   - 3枚すべて（タイトル、セクション区切り、コンテンツ）を表示
   - テンプレートの特徴をテキストで簡潔に説明

   表示順序:
   ```
   === Template 1: Classic White ===
   [タイトル画像] [セクション画像] [コンテンツ画像]
   特徴: クリーンで汎用的。ブルーアクセント。

   === Template 2: Dark Professional ===
   [タイトル画像] [セクション画像] [コンテンツ画像]
   特徴: ダーク背景。テック向け。

   ... (Template 3〜5)
   ```

2. **AskUserQuestion で選択を求める**

   ```
   AskUserQuestion:
     question: "どのテンプレートを使用しますか？"
     header: "テンプレート"
     multiSelect: false
     options:
       - label: "Classic White"
         description: "白ベースのクリーンなデザイン。汎用的。"
       - label: "Dark Professional"
         description: "ダーク背景。テック・製品発表向け。"
       - label: "Gradient Cover"
         description: "鮮やかなグラデーション。クリエイティブ向け。"
       - label: "Apple Minimal"
         description: "ミニマルで洗練。apple-basicテーマ使用。"
       - label: "Academic Navy"
         description: "フォーマルなネイビー。学術・教育向け。"
   ```

### Phase 3: テンプレート設定の適用

1. **選択されたテンプレートの設定を保存**

   `.claude/docs/selected-template.md` に以下の形式で保存:

   ```markdown
   # Selected Template: {テンプレート名}

   Selected: YYYY-MM-DD

   ## Global Frontmatter
   ```yaml
   theme: {theme}
   colorSchema: {colorSchema}
   background: {background}
   transition: slide-left
   ```

   ## Title Slide Template
   ```markdown
   {Title slide markdown from presets.md}
   ```

   ## Section Slide Template
   ```markdown
   {Section divider markdown from presets.md}
   ```

   ## Content Slide Base Styles
   - Accent color: {primary}
   - Text wrapper: <div class="text-xl">
   - Spacing: mt-5, mb-5
   - Highlight box: {highlight box style}

   ## Color Palette
   - Primary: {primary}
   - Accent: {accent}
   - Background: {background}
   - Text: {text}
   ```

2. **DESIGN.md にテンプレート選択を記録**
   - `.claude/docs/DESIGN.md` に日付と選択理由を追記
   - 形式: `## Template Selection - YYYY-MM-DD`

3. **完了メッセージ**
   - 選択されたテンプレート名を表示
   - `selected-template.md` のパスを表示
   - 「/create-presentation で使用されます」と案内

## テンプレートプリセット一覧

| # | テンプレート | テーマ | 配色 | 向いている用途 |
|---|-------------|--------|------|---------------|
| 1 | Classic White | seriph | light | 汎用、ビジネス、学術 |
| 2 | Dark Professional | seriph | dark | テック、製品発表 |
| 3 | Gradient Cover | seriph | light | クリエイティブ、スタートアップ |
| 4 | Apple Minimal | apple-basic | light | 製品、エグゼクティブ |
| 5 | Academic Navy | seriph | light | 学術、教育、研究 |

## エラーハンドリング

- **ポート3031が使用中**: `lsof -ti :3031 | xargs kill` で停止してから再試行
- **Slidevサーバー起動失敗**: npm install を実行後に再試行
- **スクリーンショット撮影失敗**: サーバー起動待機時間を延長（5秒→10秒）
- **apple-basic テーマ未インストール**: `npm install @slidev/theme-apple-basic` を実行

## 注意事項

- メインの開発サーバー（ポート3030）には影響しない
- スクラッチパッドの一時ファイルはセッション固有で自動的にクリーンアップされる
- プレビュー生成は5テンプレート×3枚 = 15枚のスクリーンショットを生成する
- 所要時間は約2〜3分程度
