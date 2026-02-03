# Slidev Presentation Project Structure

This project is a template for creating slide presentations using Slidev.

## Project Structure

```
1-Introduction-to-Radiation-Oncology/
├── slides.md                    # Main slide file
├── package.json                 # Project configuration and scripts
├── package-lock.json           # Package lock file
├── README.md                    # Project overview and execution instructions
├── how_to_use.md               # Detailed Slidev usage guide
├── slidev_write.md             # Slidev basic functions reference
├── issue.md                    # Issues and improvement points
├── .npmrc                      # NPM configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignore rules
├── pages/                       # Individual slide pages
│   ├── who_am_i.md             # Self-introduction page
│   ├── flowchart.md            # Flowchart page
│   └── imported-slides.md      # Import slides
├── components/                  # Vue components
│   └── Counter.vue             # Counter component
├── layouts/                     # Custom layouts
│   └── global-bottom.vue       # Global bottom layout
├── .claude/                     # Claude Code configurations
│   ├── agents/                 # AI agents (専門家システム)
│   │   ├── README.md           # Agent documentation
│   │   ├── adaptive-content-structure.md
│   │   ├── adaptive-lecture-designer.md
│   │   ├── interactive-medical-presenter.md
│   │   ├── medical-slidev-architect.md
│   │   └── radiation-therapy-educator.md
│   ├── skills/                 # Skills (スラッシュコマンド)
│   │   ├── add-slide/
│   │   │   └── SKILL.md        # /add-slide skill
│   │   ├── create-lecture/
│   │   │   └── SKILL.md        # /create-lecture skill
│   │   ├── create-abstract/
│   │   │   └── SKILL.md        # /create-abstract skill
│   │   ├── prepare-pdf/
│   │   │   └── SKILL.md        # /prepare-pdf skill
│   │   ├── slide-style-rector/
│   │   │   └── SKILL.md        # /slide-style-rector skill
│   │   ├── layout-fix/
│   │   │   └── SKILL.md        # /layout-fix skill
│   │   ├── slidev-diagram/
│   │   │   └── SKILL.md        # /slidev-diagram skill
│   │   └── README.md           # Skills documentation
│   └── commands/               # Commands (詳細な実行手順書・参照用)
│       ├── README.md           # Command documentation
│       ├── add-slide.md        # add-slide詳細手順
│       ├── create-lecture.md   # create-lecture詳細手順
│       ├── create-abstract.md  # create-abstract詳細手順
│       └── prepare-pdf.md      # prepare-pdf詳細手順
├── lesson_plan/                 # Lesson plan documents
│   ├── 第1回授業の全体像.md       # Overall structure of the first lesson
│   └── 本論部分の詳細.md         # Detailed content for main sections
├── previous_slides/             # Past slides storage
│   ├── ai-coding-assistants-comparison.md
│   ├── demo_slides.md
│   ├── dify-chapter6-slides.md
│   ├── dify-slides.md
│   └── ja_demo_slides.md
├── format/                      # Slide format templates
│   ├── abstract_reading_slide.md  # Template for abstract reading slides
│   ├── template_sides.md       # General slide template
│   └── layout-patterns.md      # Layout pattern collection (40 patterns)
├── docs/                        # Documentation
│   └── style-guide.md          # Style guide (design principles, colors, typography)
├── scripts/                     # Automation scripts
│   ├── start-server.sh         # Start development server
│   ├── check-layout.sh         # Check layout issues
│   ├── cleanup.sh              # Cleanup temporary files
│   └── export-pdf.sh           # Export slides to PDF
├── snippets/                    # Code snippets
│   └── external.ts             # External TypeScript file
├── .vscode/                     # VS Code settings
│   └── settings.json           # Editor configuration
├── netlify.toml                # Netlify deployment settings
└── vercel.json                 # Vercel deployment settings
```

## Main Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run export     # Export slides to PDF
```

## Tech Stack

- **Slidev**: Presentation creation framework
- **Vue 3**: Component development
- **Themes**: seriph, apple-basic, default
- **Icons**: Material Design Icons (@iconify-json/mdi)
- **Code Formatting**: Prettier + prettier-plugin-slidev

## Usage

1. `slides.md` is the main presentation file
2. Import and use files from `pages/` folder
3. Create custom Vue components in `components/`
4. Place images and other static files in `public/`
5. Check `how_to_use.md` for detailed usage instructions

## Deployment

- Netlify: Configured with `netlify.toml`
- Vercel: Configured with `vercel.json`

## スライド生成時の注意点
- スライドの内容は `slides.md` に記述します。
- 各スライドは `---` で区切ります。
- スライドのタイトルは `#` で始めます。
- スライドの内容はMarkdown形式で記述できます。
- コードブロックは ``` で囲み、言語を指定できます。
- スライドのレイアウトは `layouts/` フォルダにVueコンポーネントとして定義できます。
- スライドのスタイルは `styles/` フォルダにCSSファイルとして定義するか、個別のVueコンポーネント内でスタイリングします。
- スライドのテーマは設定で指定するか、カスタムテーマを作成できます。
- フロントマターで全体設定を管理する
- ライブプレビューでリアルタイムに確認する
- スライド1ページに一つの内容を徹底する
- 本文の文字の大きさは28pt以上を基本とする
- 画像ファイルはpublic/に保存し、レイアウト機能やCSSクラスで適切に配置する
- 最終的にはslidev exportでPDFを生成する。 PDF用のスライドは背景を白に変更し、それに伴って文字の色も調整すること。
- Iconsは適切なものを適宜選んで使用してください

# 使いそうな機能
- README.mdに私が使いそうな機能をまとめてあるので、参考にしてください。
- [README.md](README.md)

# スライドを変更する前に行うこと
- git commitをして、現在の状態を保存する
- 戻す必要があれば、いつでも戻せるようにしておくこと

# 検索方法
- `gemini-search`を使って、特定のキーワードやフレーズを検索できます。
- 検索結果は必要に応じて要約してください。

# 改善してほしい点をまとめたものは、issue.mdに記載しています。
- [issue.md](issue.md)
これを参考にして、slides.mdを改善してください。

# 抄読会用のスライド作成は、`slidev-template/format/abstract_reading_slide.md`に作成例を置いてあるので、参考にしてください。
- [抄読会用スライド作成例](format/abstract_reading_slide.md)

# スライドのテンプレートは `template_sides.md` にあります。
- 各スライドのタイトルと内容の間を空けるために、`***` を使用してください。

# 各スライドのタイトルと内容の間は以下のように記述してください。
```markdown
# スライドタイトル

***

<div class="mt-5"></div>
```

# 自己紹介が必要な時のみ、`who_am_i.md` を使用してください。
- 自己紹介の内容は、`who_am_i.md` に記載されています。

# slidevの基本的な機能は以下を参考にしてください。
- [slidevの基本機能](slidev_write.md)

# スライド作成時の参考資料
- スライドを作成する際は、`lesson_plan/`フォルダ内の.mdファイルを参照してください。
- `lesson_plan/第1回授業の全体像.md`: 第1回授業の全体構成と流れ
- `lesson_plan/本論部分の詳細.md`: 各セクションの詳細な内容とポイント
- これらの資料に基づいてスライドの構成と内容を決定してください。

<!-- .claude/CLAUDE.md に追加 -->

## Slidev図解スキル

### 画像生成ルール
- 図解・イラスト・概念図はAI画像生成を使用
- フローチャート・シーケンス図はMermaidも選択肢
- 生成画像は必ず `images/` に保存
- ファイル名はケバブケース（英語）

### 承認フロー（必須）
1. 画像生成後、必ずプレビュー表示
2. ユーザー承認を待つ
3. 修正指示があれば対応して再表示
4. 承認後にスライド挿入を実行

### Slidev操作ルール
- ページ指定は1始まりの番号
- `---` 区切りでページを特定
- レイアウト変更時は選択肢を提示
- 既存コンテンツは可能な限り維持
- 更新前に必ずプレビューで確認

### 対応レイアウト
- center: 画像中央配置
- two-cols: 左右分割
- default: 上下配置
- image: 全画面画像
- image-right/image-left: 画像+テキスト
```

---

## 使用例
```
ユーザー: /slidev-diagram リニアックの構造を図解して。ページ7に挿入、slides.md

Claude:
📊 生成した図解

[リニアック構造のイラスト画像を表示]

📁 保存先: images/linac-structure-diagram.png
📄 挿入先: slides.md ページ7

✅ 確認してください
1. 図解の内容はよろしいですか？
2. レイアウトを選択してください：
   A. 画像中央配置
   B. 画像+テキスト（左右分割）
   C. 画像+テキスト（上下配置）

ユーザー: もう少し詳細に描いて。レイアウトはBで

Claude:
📊 修正した図解

[より詳細なリニアック構造画像を表示]

📁 保存先: images/linac-structure-diagram.png（更新済み）

📝 スライド更新プレビュー
ファイル: slides.md
ページ: 7
レイアウト: two-cols（左右分割）
```markdown
---
layout: two-cols
---

# リニアックの構造

[既存のテキストまたは説明を配置]

::right::

![リニアック構造図](./images/linac-structure-diagram.png)
```

✅ このレイアウトでスライドを更新してよろしいですか？

ユーザー: OK

Claude:
✅ 完了しました

- 画像保存: images/linac-structure-diagram.png
- スライド更新: slides.md ページ7

プレビューで確認してください: `slidev slides.md`

---

## スライド作成の文体ルール

スライド作成時は以下の文体ルールを遵守してください。

### 避けるべき表現
- **コロン（：）**: 使用しない。代わりに改行や箇条書きで構造化
- **感嘆符（！）**: 使用を避ける。冷静で客観的なトーンを維持
- **疑問符（？）**: 使用を控える。必要な場合のみ使用
- **装飾的な絵文字**: 使用しない。アイコンは適切なものを選択
- **過度な色使い**: 控えめに。プライマリカラー（#1e3a8a）をアクセントに

### 推奨される表現
- 簡潔で明確な文章
- 箇条書きでの構造化
- 適切な余白とレイアウト
- 統一されたスタイル

---

## スキル連携フロー

### 基本的なワークフロー

```
1. 新規スライド作成
   ↓
2. /slide-style-rector でスタイル整形
   ↓
3. /slidev-diagram で図解生成（必要に応じて）
   ↓
4. /layout-fix でレイアウト確認
   ↓
5. /prepare-pdf でPDF出力
```

### 各スキルの役割

#### create-lecture
- 授業計画から講義全体のスライドを一括生成
- lesson_plan/フォルダの資料を参照
- 大規模なスライド作成に使用

#### add-slide
- 既存のスライドに新しいセクションを追加
- 部分的な追加や修正に使用

#### slide-style-rector（新）
- スタイルガイド（docs/style-guide.md）に基づいて整形
- レイアウトパターン（format/layout-patterns.md）から最適なものを選択
- 文体ルールを適用

#### slidev-diagram
- AI画像生成で図解・イラスト・概念図を作成
- images/フォルダに保存
- スライドに自動挿入

#### layout-fix（新）
- レイアウト崩れを自動検出
- リスト項目過多、テキストオーバーフローなどを修正
- 開発サーバーと連携して検証

#### prepare-pdf
- PDF出力用に最適化
- 背景色を白に変更
- 文字色を調整

---

## 統合ワークフロー

### フェーズ1 - 企画
1. ユーザーから概要を聞く
2. 構成案を提示
3. 承認を得る

### フェーズ2 - 作成
1. create-lectureまたはadd-slideでスライド生成
2. format/layout-patterns.mdから最適なレイアウトを選択
3. docs/style-guide.mdのルールに従ってスタイル適用

### フェーズ3 - 強化
1. slidev-diagramで図解を生成
2. 画像をスライドに配置
3. レイアウトを調整

### フェーズ4 - 検証
1. layout-fixでレイアウト確認
2. 問題があれば修正
3. 開発サーバーでプレビュー

### フェーズ5 - 完成
1. ユーザーレビュー
2. 修正対応
3. prepare-pdfでPDF出力

---

## スクリプトの使用方法

### 開発サーバー起動
```bash
bash scripts/start-server.sh
```

### レイアウトチェック
```bash
bash scripts/check-layout.sh
```

### クリーンアップ
```bash
bash scripts/cleanup.sh
```

### PDF出力
```bash
bash scripts/export-pdf.sh slides.md
```

---

## 参照ドキュメント

### スタイルとレイアウト
- `docs/style-guide.md`: デザイン原則、カラーパレット、タイポグラフィ
- `format/layout-patterns.md`: 40種類のレイアウトパターン集

### スキルとコマンド
- `.claude/skills/`: スキル定義（スラッシュコマンド）
- `.claude/commands/`: 詳細な実行手順書

### テンプレート
- `format/template_sides.md`: 基本的なスライドテンプレート
- `format/abstract_reading_slide.md`: 抄読会用テンプレート

### 授業計画
- `lesson_plan/第1回授業の全体像.md`: 全体構成
- `lesson_plan/本論部分の詳細.md`: 詳細内容

---

## ベストプラクティス

### スライド作成前
1. git commitで現在の状態を保存
2. 参照資料（lesson_plan/）を確認
3. スタイルガイドとレイアウトパターンを確認

### スライド作成中
1. 1スライド1メッセージを徹底
2. 本文は28pt以上を維持
3. 適切な余白（mt-5, mb-5）を確保
4. レイアウトパターンから選択

### スライド完成後
1. layout-fixで検証
2. 開発サーバーでプレビュー
3. PDF出力前に最終確認

---

## トラブルシューティング

### レイアウト崩れ
- /layout-fix を使用して自動検出
- format/layout-patterns.mdから適切なパターンを選択
- 必要に応じてスライドを分割

### スタイル不統一
- /slide-style-rector を使用して自動整形
- docs/style-guide.mdのルールを確認
- 文体ルールを遵守

### 画像配置の問題
- /slidev-diagram で再生成
- レイアウトを変更（two-cols, image-right等）
- 画像サイズを調整

### PDF出力の問題
- /prepare-pdf を使用
- 背景色と文字色を確認
- レイアウトを再確認
