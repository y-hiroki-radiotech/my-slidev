# Claude Code統合機能

このプロジェクトでは、Claude Codeの3つの機能を活用してスライド作成を支援します。

## Skills / Commands / Agents の違い

### Skills（スキル）- `.claude/skills/`
**実行可能なスラッシュコマンド**

- スラッシュコマンドとして直接実行（例: `/add-slide`）
- 明確な入出力と成果物がある
- 完全自動実行（ユーザー介入なし）
- 即座に実行可能なタスク

**利用可能なスキル:**
- `/add-slide` - 新規スライドセクション追加
- `/create-lecture` - 講義全体の自動生成
- `/create-abstract` - 抄読会スライド生成
- `/prepare-pdf` - PDF出力用最適化

詳細は `.claude/skills/README.md` を参照してください。

### Commands（コマンド）- `.claude/commands/`
**詳細な実行手順書（参照用）**

- Skillsの詳細版・参照用ドキュメント
- 完全な実行フローの記述
- トラブルシューティング情報
- Claude Codeが内部的に参照

### Agents（エージェント）- `.claude/agents/`
**特定分野の専門家として振る舞う自律的システム**

- Taskツールやプロンプトで起動
- 専門知識と判断能力を持つ
- 複雑な問題解決プロセス
- 分析・設計・相談のサポート

**利用可能なエージェント:**
- `radiation-therapy-educator` - 放射線治療教育の専門家
- `medical-slidev-architect` - Slidev設計アーキテクト
- `adaptive-lecture-designer` - 講義設計の専門家
- `adaptive-content-structurer` - コンテンツ構造化の専門家
- `interactive-medical-presenter` - インタラクティブ実装の専門家

詳細は `.claude/agents/README.md` を参照してください。

---

# スラッシュコマンド（完全自動スライド作成）

Claude Codeのスラッシュコマンド機能を使って、スライド作成を完全自動化できます。

## 利用可能なコマンド

### 1. `/add-slide` - 新規スライドセクション追加

授業計画を参照しながら、新しいスライドセクションを自動生成します。

**使用例:**
```bash
/add-slide 放射線の種類と特性
/add-slide 治療計画の基礎
```

**機能:**
- 授業計画（`lesson_plan/`）との整合性を自動チェック
- 既存のスタイル・レイアウトパターンを自動踏襲
- フォーマット検証（タイトルと内容の間のスペース、文字サイズ28pt以上など）
- プレビュー確認の自動実行
- 進捗管理（`.slide-planning/`ディレクトリにタスクリスト等を保存）

**生成物:**
- 新しいスライドセクション（`slides.md`または`pages/`内）
- プランニングファイル（requirements.md, design.md, tasklist.md）

---

### 2. `/create-lecture` - 講義全体の自動生成

授業計画から講義全体のスライドを一括生成します。

**使用例:**
```bash
/create-lecture 第1回
/create-lecture 放射線治療学入門
```

**機能:**
- `lesson_plan/`の内容を完全に反映
- フロントマター、導入、本論、まとめまで完全自動化
- 自己紹介ページ（`pages/who_am_i.md`）の自動インポート
- 既存スライドの自動バックアップ（git commit）
- セクション別のスライド枚数管理
- 時間配分の考慮

**生成物:**
- 完全な講義スライド（`slides.md`）
- プランニングファイル（lecture-structure.md, content-outline.md, section-breakdown.md, tasklist.md）
- git commitによるバージョン管理

---

### 3. `/create-abstract` - 抄読会スライド生成

医学論文情報から抄読会用のスライドを自動生成します。

**使用例:**
```bash
# DOIから生成
/create-abstract 10.1016/j.ijrobp.2023.xxxxx

# タイトルから生成
/create-abstract Radiotherapy outcomes in lung cancer

# PDFファイルから生成
/create-abstract --pdf /path/to/paper.pdf

# URLから生成
/create-abstract --url https://pubmed.ncbi.nlm.nih.gov/12345678/
```

**機能:**
- 論文情報の自動取得（DOI、PubMed ID、タイトル、PDF、URL対応）
- 論文内容の構造化抽出（背景、方法、結果、考察、結論）
- `format/abstract_reading_slide.md`テンプレートへの厳密な準拠
- v-clicksによる段階的表示の自動設定
- レイアウト（two-cols、center）の自動適用

**生成物:**
- 抄読会用スライド（`pages/abstract-[FirstAuthor]-[Year].md`）
- プランニングファイル（paper-info.md, content-extraction.md, slide-outline.md, tasklist.md）

---

### 4. `/prepare-pdf` - PDF出力用最適化

スライドをPDF出力用に最適化し、自動的にPDFを生成します。

**使用例:**
```bash
# 現在のslides.mdを最適化してPDF出力
/prepare-pdf

# 特定のファイルを最適化してPDF出力
/prepare-pdf pages/abstract-Smith-2024.md

# 最適化をスキップしてPDF出力のみ
/prepare-pdf --export-only

# バックアップをスキップ（非推奨）
/prepare-pdf --skip-backup
```

**機能:**
- 背景色を白に自動変更
- 文字色を黒系統に自動調整（コントラスト比4.5:1以上を確保）
- アイコン色の最適化（700番台の色に統一）
- レイアウト要素（ボーダー、背景）の調整
- 自動バックアップ（git commit + バックアップファイル作成）
- `slidev export`の自動実行
- PDF品質の自動検証

**生成物:**
- 最適化されたスライドファイル
- PDFファイル（`slides-export.pdf`または`[ファイル名]-export.pdf`）
- プランニングファイル（optimization-checklist.md, changes-log.md, tasklist.md）
- バックアップファイル

**色変換例:**
- `text-white` → `text-black`
- `text-yellow-500` → `text-yellow-700`
- `bg-gray-800` → `bg-gray-100`
- `border-gray-700` → `border-gray-300`

---

## コマンドの共通仕様

### 完全自動実行
すべてのコマンドは、ユーザーの介入なしで開始から完了まで実行されるように設計されています。

### プランニングディレクトリ
各コマンドは専用のディレクトリを作成し、進捗を管理します:
- `.slide-planning/` - `/add-slide`
- `.lecture-planning/` - `/create-lecture`
- `.abstract-planning/` - `/create-abstract`
- `.pdf-planning/` - `/prepare-pdf`

### タスク管理
各コマンドは`tasklist.md`でタスクの進捗を管理し、すべてのタスクが完了するまで自律的に実行を継続します。

### バージョン管理
重要な変更の前後で自動的にgit commitを実行し、変更履歴を保持します。

### 品質保証
- プレビュー確認（`npm run dev`）
- フォーマット検証
- 既存パターンとの整合性チェック

---

# 実行方法
- `npm run dev`
- `npm run dev -- ファイル名`
- `npm run dev -- ファイル名 --remote`

# codeプロック内の遷移
```python {all|1|3-9}
<Code></Code>
```

# Mermaid図のリンク
[Mermaid](https://mermaid.js.org/intro/)

# UnoCSSのリンク
[UnoCSS Interactive](https://unocss.dev/interactive/)

# デフォルトテーマのレイアウト
[デフォルトテーマのレイアウト](https://zenn.dev/rinc5/articles/b7dc7a3b0bbd30)

# ページ下部にページ数を埋め込む
```bash
<div class="absolute bottom-5 right-5">
  <span class="font-size-2">
    {{ $page }}<!-- 1 -->
  </span>
</div>
```

# おすすめフォント
```bash
---
fonts:
  # 標準テキスト用
  sans: Noto Sans JP
  # UnoCSS で `font-serif` クラスを指定したとき用
  serif: Noto Serif JP
  # コードブロック用
  mono: Fira Code
---
```

# Export
- PDF
```bash
slidev export
```
- PPTX
```bash
slidev export --format pptx
```
PPTXファイル内のすべてのスライドは画像としてexportされるので注意。

- PNGs and Markdown
```bash
slidev export --format md
```
- 出力ファイル名をつけたい場合
```bash
slidev export --output <file-name>
```
- ダークモード
```bash
slidev export --dark
```

# Frontmatter
- title: Welcome to slidev

urlのタイトルとリンクを作成したときや、デフォルトでexportしたときのタイトルとして扱われる。

-
background: これは1枚目のFrontmatterに入れるべきものかな

# アニメーション
**Click**
  クリックはスライド内のアニメーションステップの単位。スライドには1回以上のクリックがあり、クリックごとに1つ以上のアニメーションがトリガーされる。

- `v-click`
<v-click>Hello world!</v-click>
クリック時に表示される。
<div v-click class="text-x1"> Hey! </div>

- `v-after`
`v-click`に連動して表示
<div v-click> Hello </div>
<div v-after> World </div>  <!-- or <v-after> World </v-after> -->

- クリック後に非表示にする
`.hide`クリック後に表示を消す
```bash
<div v-click> Visible after 1 click </div>
<div v-click.hide> Hidden after 2 clicks </div>
<div v-after.hide> Hidden after 2 clicks </div>
```

- `v-clicks`
まとめて適応させる
```bash
<v-clicks>

- 1
- 2
- 3
- 4
</v-clicks>
```
- ネストされたリストの場合
```bash
<v-clicks depth="2">
- Item 1
  - Item 1.1
  - Item 1.2
- Item 2
  - Item 2.1
  - Item 2.2
</v-clicks>
```

# スライドトランジション
Slidevは標準でスライドtransitionをサポートしています。transition frontmatterオプションを設定することで有効にできます。

```bash
---
transition: slide-left
---
```
- `fade` - Crossfade in/out
- `fade-out` - Fade out and then fade in
- `slide-left` - Slides to the left (slide to right when going backward)
- `slide-right` - Slides to the right (slide to left when going backward)
- `slide-up` - Slides to the top (slide to bottom when going backward)
- `slide-down` - Slides to the bottom (slide to top when going backward)
- `view-transition` - Via the view transitions API

# Theme
[テーマギャラリー](https://sli.dev/resources/theme-gallery)

# Layout
[レイアウトの設定](https://sli.dev/builtin/layouts)

# 横線
`***`

# hideInToc: true
Frontmatterに`hideInToc: true`を追加することで、目次に表示されなくなります。

# Material Icons
[Material Icons](https://icones.js.org/)

**`mdi:account-circle`** をSlidevで使うコンポーネント形式に変換するルールは以下の通りです。

1.  コロン（`:`）をハイフン（`-`）に変える。
2.  全体をコンポーネントのタグ（`<` と `/>`）で囲む。

---

### 具体的な変換手順

あなたの見つけたアイコン `mdi:account-circle` を例にすると、

1.  まず、コロン `:` をハイフン `-` に置き換えます。
    > `mdi:account-circle` → `mdi-account-circle`

2.  次に、その文字列をタグで囲みます。
    > `mdi-account-circle` → `<mdi-account-circle />`

これで完了です。
この `<mdi-account-circle />` をそのままSlidevのMarkdownファイルに貼り付ければ、画像と同じアイコンが表示されます。

### まとめ（ルール）

| 見つけた形式 | Slidevでの形式 |
| :--- | :--- |
| `[コレクション名]:[アイコン名]` | `<[コレクション名]-[アイコン名] />` |

**別の例:**
もし `carbon:settings` というアイコンを見つけたとします。
ルールに従うと、コロンをハイフンに変えてタグで囲むので `<carbon-settings />` となります。

このルールさえ覚えておけば、どのサイトで見つけたアイコンでも迷わず使えるようになります。


# 目次の表示
目次を表示するには、以下のように`<Toc />`コンポーネントを使用します。
```bash
<Toc maxDepth="2"/>
```
`maxDepth`は目次の深さを指定します。デフォルトは1です。
maxDepth属性の役割
maxDepth="2" 属性は、目次に表示する見出しレベルの最大深度を制御します。この設定により：

# 見出し1（レベル1）は目次に含まれます
## 見出し2（レベル2）は目次に含まれます
### 見出し3（レベル3以下）は目次に含まれません

---

# スラッシュコマンド使用時のベストプラクティス

## 推奨ワークフロー

### 新しい講義を作成する場合
1. `lesson_plan/`ディレクトリに授業計画を作成・更新
2. `/create-lecture [講義名]`で講義全体を生成
3. プレビューで確認（`npm run dev`）
4. 必要に応じて`/add-slide`で追加セクションを作成
5. `/prepare-pdf`でPDF出力

### 既存の講義に追加する場合
1. `lesson_plan/`で授業計画を確認
2. `/add-slide [セクション名]`で新しいセクションを追加
3. プレビューで確認
4. 必要に応じて`/prepare-pdf`でPDF更新

### 抄読会の準備をする場合
1. 論文情報（DOI、タイトル、PDF等）を用意
2. `/create-abstract [論文情報]`でスライド生成
3. プレビューで内容確認
4. `/prepare-pdf pages/abstract-xxx.md`でPDF出力

## 注意事項

### git commitについて
- スラッシュコマンドは自動的にgit commitを実行します
- 重要な変更の前には必ずバックアップが作成されます
- 手動でcommitする必要はありません

### バックアップとロールバック
- 各コマンドは実行前に自動バックアップを作成
- 問題が発生した場合は`git log`で履歴を確認し、`git revert`または`git reset`で戻せます
- バックアップファイル（`.backup-[日付]`）も保存されます

### プランニングディレクトリ
- `.slide-planning/`等のディレクトリには実行履歴が保存されます
- タスクリスト、変更ログ、設計文書などが含まれます
- トラブルシューティングや振り返りに活用できます

### PDF出力時の注意
- `/prepare-pdf`は元のファイルを変更します（バックアップあり）
- プレゼンテーション用（ダークテーマ）と印刷用（ライトテーマ）で別ファイルにすることを推奨
- 必要に応じて`--export-only`オプションで最適化をスキップ

---

# トラブルシューティング

## スラッシュコマンド関連

### コマンドが途中で停止した場合
1. `.xxx-planning/`ディレクトリの`tasklist.md`を確認
2. 未完了のタスクを確認
3. エラーメッセージがあればそれに従って修正
4. 必要に応じて手動で作業を完了

### 生成されたスライドが期待と異なる場合
1. `lesson_plan/`の内容を確認・更新
2. `.xxx-planning/`の設計ファイルを確認
3. git revertで元に戻す
4. 必要に応じてコマンドを再実行

### PDF出力が失敗する場合

**"Chromium not found"エラー**
```bash
npx playwright install chromium
```

**"Out of memory"エラー**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run export
```

**レイアウト崩れ**
- フロントマターの設定を確認
- カスタムCSSが適切か確認
- ブラウザのプレビューと比較

**文字化け**
- フォント設定を確認
- 日本語フォントが正しく読み込まれているか確認

### 論文情報が取得できない場合（`/create-abstract`）
- DOIやPubMed IDの形式が正しいか確認
- URLが正しくアクセスできるか確認
- PDFファイルのパスが正しいか確認
- 論文が公開されているか確認（ペイウォール等）
- 手動で論文情報を`.abstract-planning/paper-info.md`に入力し、コマンドを再実行

## Slidev一般

### 開発サーバーが起動しない
```bash
# 依存関係の再インストール
npm install

# キャッシュのクリア
rm -rf node_modules/.vite
npm run dev
```

### スライドが表示されない
- `slides.md`のフロントマターを確認
- マークダウンの構文エラーを確認
- ブラウザのコンソールでエラーを確認

### アイコンが表示されない
```bash
# @iconify-json/mdiがインストールされているか確認
npm list @iconify-json/mdi

# インストールされていない場合
npm install -D @iconify-json/mdi
```

---

# 参考情報

## プロジェクト構成
詳細なプロジェクト構成は`CLAUDE.md`を参照してください。

## スライド作成のルール
- 各スライドのタイトルと内容の間は`***`と`<div class="mt-5"></div>`で区切る
- 本文の文字サイズは28pt以上を基本とする
- 画像は`public/`ディレクトリに保存
- テンプレートは`format/template_sides.md`を参照

## 改善点
改善してほしい点は`issue.md`に記載されています。

