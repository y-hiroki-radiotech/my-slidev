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
│   └── commands/               # Slash commands (実行可能なコマンド)
│       ├── README.md           # Command documentation
│       ├── add-slide.md        # /add-slide command
│       ├── create-lecture.md   # /create-lecture command
│       ├── create-abstract.md  # /create-abstract command
│       └── prepare-pdf.md      # /prepare-pdf command
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
│   └── template_sides.md       # General slide template
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

