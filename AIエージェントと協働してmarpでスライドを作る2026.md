---
title: "AIエージェントと協働してmarpでスライドを作る2026"
source: "https://qiita.com/hirokidaichi/items/243bd176b84900f4cc0d"
author:
  - "[[hirokidaichi]]"
published: 2026-01-30
created: 2026-02-03
description: "はじめに 2025年から2026年にかけて、Claude Codeのスキルシステムを使ってプレゼンテーション作成のワークフローを構築してきました。この記事では、その過程で作り上げたスキル群と、実際の使い方を紹介します。 最初は「AIにスライドを作らせたい」という単純な動..."
tags:
  - "clippings"
---
![](https://relay-dsp.ad-m.asia/dmp/sync/bizmatrix?pid=c3ed207b574cf11376&d=x18o8hduaj&uid=1101925)

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/e724a714-9d73-423b-afa8-013eaea18421.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Fe724a714-9d73-423b-afa8-013eaea18421.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d70d46c3bdf07504d5b6e3468ae2272a)

## はじめに

2025年から2026年にかけて、Claude Codeのスキルシステムを使ってプレゼンテーション作成のワークフローを構築してきました。この記事では、その過程で作り上げたスキル群と、実際の使い方を紹介します。

最初は「AIにスライドを作らせたい」という単純な動機でした。しかし実際にやってみると、単にスライドを生成するだけでは自分が登壇で使いたいレベルの品質にするのが難しいことがわかりました。そこで、スタイルガイドの整備、レイアウトパターンの体系化、視覚的な品質検証の自動化と、段階的に仕組みを整えていきました。

この記事は、同じようにAIを活用してプレゼン作成を効率化したい方に向けて、私の試行錯誤と、その結果できあがった仕組みを共有するものです。

また、この背景となる考え方やテーマについての新著も昨年11月に上梓しました。

[AIエージェント 人類と協働する機械](https://www.amazon.co.jp/dp/4865944583)

非常に面白く読みやすい本ですので、ぜひお手に取って読んでみてください。

こちらの書籍もAIエージェントフル活用で書かれたAIエージェントに関する書籍です。

## 1\. Tailwind CSSで自由なレイアウトを手に入れる

### Marp標準機能の限界

Marpは素晴らしいツールですが、標準のMarkdown記法だけでは複雑なレイアウトを実現するのが難しいという課題がありました。2カラム、3カラムのグリッドレイアウトや、パネルの装飾、要素の細かい位置調整などをCSSで一から書くのは手間がかかります。

### Tailwind CSSの導入

そこで、Tailwind CSSをMarpスライドに導入することにしました。ローカルにファイルを配置して読み込んでいます。

```html
<script src="theme/js/tailwindcss-3.0.16.js"></script>
<script src="theme/js/tailwind.config.js"></script>
```

`tailwind.config.js` では `preflight: false` を設定しています。Tailwindのリセットスタイルを無効化しないと、Marpのデフォルトスタイルが上書きされてしまうためです。

Tailwindを導入したことで、グリッドレイアウトやパネルデザインが自由に組めるようになりました。

---

## 2\. スタイルガイドを作る

### なぜスタイルガイドが必要だったか

Claude Codeに「スライドを作って」と頼むと、それなりのものはできます。しかし、毎回デザインがバラバラになります。色使い、フォントサイズ、余白の取り方が統一されず、複数のスライドを並べたときに違和感が出ます。

そこでまず、自分のスライドを分析して「どういうデザインにしたいのか」を言語化することにしました。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/55c653fd-0f58-4e7c-a887-1154c59f497d.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F55c653fd-0f58-4e7c-a887-1154c59f497d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=06995e0b39ed1ca30041e3c0d9106c9b)

### 実際のスライドからパターンを抽出する

過去に作った講演スライドを見返して、共通するパターンを抽出しました。

```text
Claude Codeへのプロンプト例：

過去のスライドファイルを読んで、共通するデザインパターンを
分析してください。以下の観点でまとめてほしい：
- 使われている色（背景色、テキスト色、アクセント色）
- フォントサイズの使い分け
- レイアウトパターン（何カラム構成が多いか）
- パネルデザイン（角丸、影、ボーダーの使い方）
```

この分析結果を `docs/style-guide.md` としてまとめました。

### スタイルガイドの構成

```markdown
# レクタースライドスタイルガイド

## デザイン哲学
- 美麗でシンプル：情報過多を避け、視覚的にクリーン
- 色数制限：グレースケール基調に限定的なアクセントカラー
- 可読性重視：フォントサイズと余白を適切に
- 一貫性：パターンの繰り返しで理解しやすく
```

### カラーパレットの定義

グレースケールを基調とし、アクセントカラーは濃紺とティールに限定しました。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/f7d631d6-223c-4591-bcf9-32fe47748f08.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Ff7d631d6-223c-4591-bcf9-32fe47748f08.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a97a39468f9905af9fa507f5550e9ef6)

```css
/* プライマリグラデーション */
background: linear-gradient(to right, #1B4565, #3E9BA4);

/* グレースケール */
gray-50:  パネル背景（淡い）
gray-100: パネル背景（やや濃い）
gray-600: サブテキスト
gray-700: 見出しテキスト
gray-800: メインテキスト
```

**1スライドあたりアクセントカラーは1-2色まで** というルールを決めました。これを守るだけで、スライド全体の統一感が格段に上がります。

### タイポグラフィの体系化

Tailwind CSSのemベースのクラスを使い、フォントサイズを体系化しました。

| クラス | 用途 |
| --- | --- |
| `text-em-3xl` | 数値強調、インパクトのあるキーワード |
| `text-em-2xl` | パネル見出し、セクションタイトル |
| `text-em-xl` | サブ見出し |
| `text-em-lg` | 本文、リスト項目 |
| `text-em-base` | 補足説明 |

---

## 3\. 40のレイアウトパターンを整備する

### 「毎回ゼロから作る」問題

スタイルガイドができても、毎回「このスライドはどういうレイアウトにしようか」と考えるのは非効率でした。また、Claude Codeに任せると、似たようなコンテンツでも毎回微妙に違うHTMLが生成されます。

そこで、 **よく使うレイアウトパターンを網羅したサンプルファイル** を作ることにしました。

### slides/example.md の作成

```text
プロンプト例：

過去のスライドを分析して、よく使われるレイアウトパターンを
カテゴリ別に整理してください。各パターンには以下を含めてほしい：
- パターン名と用途の説明
- 実際に動作するコード例
- デザインのポイント
```

最終的に、7カテゴリ・40パターンを整理しました。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/7f422548-4d5b-4f7f-9216-71e4af4c1131.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F7f422548-4d5b-4f7f-9216-71e4af4c1131.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=44ea41c32e7aa0f3ddca750899e8787d)  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/7dc2c82b-26ba-47b8-86ef-34680228a76f.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F7dc2c82b-26ba-47b8-86ef-34680228a76f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0b1f56c42f5f31125eec90f2889af88d)  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/3d325bc9-be7a-40fd-b017-d8380c74fd12.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F3d325bc9-be7a-40fd-b017-d8380c74fd12.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a6356985b7d5154709fe851aa9499bef)  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/f12aa0d3-020d-4810-b971-faaaca259418.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Ff12aa0d3-020d-4810-b971-faaaca259418.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=7951965f513f83df4ec8f70a8503143e)

```text
A. タイトル・セクション系（5種）
   1. タイトルスライド
   2. セクション開始
   3. セクション終了・まとめ
   4. 目次スライド
   5. クロージングスライド

B. カラムレイアウト系（8種）
   6. 2カラム比較（Before/After）
   7. 2カラム対比
   8. 3カラムレイアウト（等幅）
   9. 3カラム（アクセントカラー）
   10. 4カラムレイアウト
   11. 5カラム（成熟度レベル）
   12. 2x2グリッド
   13. 2x3グリッド

C. 縦並びリスト系（4種）
   14-17. ステップ、タイムライン、アイコン付きリスト

D. パネルデザイン系（5種）
   18-22. 基本、強調、ガラス風、グラデーション

E. 背景・画像系（4種）
   23-26. 全画面、右側配置、引用

F. 強調・特殊系（3種）
   27-29. 統計、中央配置、Q&A

G. 応用パターン（10種）
   30-39. QRコード、問いかけ、まとめ、企業事例
```

### パターンの例：2カラム比較レイアウト

Before/Afterや対比構造でよく使うパターンです。

```html
<div class="grid grid-cols-2 gap-6 mt-6 text-base">
  <div class="bg-gray-50 rounded-xl shadow-lg p-6 border-l-4 border-gray-400">
    <h1 class="text-em-2xl font-bold mb-4 text-gray-800">期待</h1>
    <ul class="text-em-lg space-y-3 text-gray-700">
      <li>AIエージェントで10倍以上の生産性</li>
      <li>開発チームは少人数で十分</li>
      <li>すべてが自動化される</li>
    </ul>
  </div>

  <div class="bg-gray-100 rounded-xl shadow-lg p-6 border-l-4 border-gray-500">
    <h1 class="text-em-2xl font-bold mb-4 text-gray-800">現実</h1>
    <ul class="text-em-lg space-y-3 text-gray-700">
      <li>多くの企業では2-3倍程度</li>
      <li>人間の判断は依然として重要</li>
      <li>本質的複雑性は残る</li>
    </ul>
  </div>
</div>
```

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/5ba6f519-f47d-40fa-84de-e463565eb9c9.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F5ba6f519-f47d-40fa-84de-e463565eb9c9.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d37c353638fc8a7654b176ee75ca2667)

**デザインのポイント**

- 左パネル: `bg-gray-50`, `border-gray-400` （やや薄い）
- 右パネル: `bg-gray-100`, `border-gray-500` （やや濃い）
- 微妙な濃淡で視覚的な対比を表現

### パターンの例：グラデーション背景セクション

章の切り替わりに使うインパクトのあるパターンです。

```markdown
<!--
_backgroundImage: "linear-gradient(to right, #1B4565, #3E9BA4)"
_color: #fff
-->

# どうすれば
ソフトウェア開発の生産性は上がるのか
```

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/9da7e038-6137-4efe-aa5c-ac830150e773.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F9da7e038-6137-4efe-aa5c-ac830150e773.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e55e5cdb15e4773099a3601195d3354b)

### パターンの例：数値統計表示

データを印象的に見せるパターンです。

```html
<div class="grid grid-cols-3 gap-4 mt-4 text-base">
  <div class="bg-gray-100 rounded-lg shadow p-4 text-center">
    <p class="text-em-3xl font-bold text-gray-600">35万文字</p>
    <p class="text-em-lg mt-2">総文字数</p>
    <p class="text-em-base text-gray-500 mt-1">4部16章60節</p>
  </div>

  <div class="rounded-lg shadow p-4 text-center"
       style="background: linear-gradient(135deg, #1B4565 0%, #3E9BA4 100%);">
    <p class="text-em-3xl font-bold text-white">774件</p>
    <p class="text-em-lg mt-2 text-white">GitHub Issue</p>
  </div>

  <div class="bg-gray-100 rounded-lg shadow p-4 text-center">
    <p class="text-em-3xl font-bold text-gray-600">1ヶ月</p>
    <p class="text-em-lg mt-2">執筆期間</p>
  </div>
</div>
```

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/10cad60a-61cb-4dab-a274-fbee91765ed9.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F10cad60a-61cb-4dab-a274-fbee91765ed9.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=8c37eab1e5a41f9ec87d61f84bff5a14)

---

## 4\. スキルとして整備する

### スキルシステムとは

Claude Codeでは、`.agents/skills/` や`.claude/skills/` ディレクトリにSKILL.mdファイルを配置することで、特定のタスクに特化した知識とワークフローを定義できます。

### slide-style-rectorスキル

スタイルガイドと40パターンを活用するスキルを作りました。

```yaml
---
name: slide-style-rector
description: レクタースライドスタイルガイドに基づいてMarpスライドの
  レイアウトを美しく整形する。
---

# slide-style-rector

**まず \`slides/example.md\` を読み、40種類のレイアウトパターンから
最適なものを選んで適用する。**

独自レイアウトを作成せず、example.mdのパターンを使うことで
デザインの一貫性を維持する。

## 参照ファイル

| ファイル | 内容 |
|---------|------|
| \`slides/example.md\` | 40種類のレイアウトパターン |
| \`docs/style-guide.md\` | カラー、タイポグラフィの詳細 |
```

### 使い方

```text
/slide-style-rector をつかってスライド15-20のスタイルを整えて
```

Claude Codeは自動的に：

1. 対象スライドを読み込み
2. `slides/example.md` から適切なパターンを選択
3. スタイルガイドに沿ってデザインを統一

---

## 5\. 視覚的な品質検証を自動化する

### レイアウト崩れの問題

Tailwind CSSでスライドを作ると、コード上は正しく見えても、実際にレンダリングすると要素がはみ出したり、重なったりすることがあります。

これを目視で確認するのは面倒です。そこで、 **agent-browser** （Playwrightベースのブラウザ自動化ツール）を使って、スクリーンショットを撮影し、Claude Codeに視覚的に確認させる仕組みを作りました。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/1912be04-7aa2-4d51-ba03-a91d4cd9d043.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F1912be04-7aa2-4d51-ba03-a91d4cd9d043.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=88a20b417264219699f09f59dc4b6fd1)

### layout-fixスキル

```yaml
---
name: layout-fix
description: Marpスライドのレイアウト崩れを検出し自動修正する。
---

# layout-fix

レイアウト修正は以下のステップで行う：

1. サーバー起動（scripts/start-server.sh）
2. スクリーンショット撮影（scripts/take-screenshots.sh）
3. 画像を確認してレイアウト崩れを検出
4. 修正を適用
5. クリーンアップ（scripts/cleanup.sh）

前提: \`agent-browser\` と \`npx\` が利用可能であること。
```

### 検出されるパターンと修正方法

**オーバーフロー（下部が切れる）**

原因: gap/margin/paddingが大きすぎる

```html
<!-- 修正前 -->
<div class="grid grid-cols-1 gap-4 mt-6">
  <div class="p-5">...</div>
</div>

<!-- 修正後 -->
<div class="grid grid-cols-1 gap-2 mt-2">
  <div class="p-3">...</div>
</div>
```

**縦5項目以上が収まらない**

原因: 1カラムでは物理的に収まらない

```html
<!-- 修正前: 縦1列で5項目 -->
<div class="grid grid-cols-1 gap-3">
  <div>項目1</div>
  <div>項目2</div>
  <div>項目3</div>
  <div>項目4</div>
  <div>項目5</div>
</div>

<!-- 修正後: 2列グリッドに変更 -->
<div class="grid grid-cols-2 gap-3">
  <div>項目1</div>
  <div>項目2</div>
  <div>項目3</div>
  <div>項目4</div>
  <div class="col-span-2">項目5（全幅）</div>
</div>
```

### 使い方

```text
/layout-fix をつかってslides/my-presentation.mdのスライド15-25を
確認して、レイアウト崩れがあれば修正して
```

---

## 6\. 画像生成との連携

### ergonスキル

スライドに挿絵やアイコンが必要な場合、外部の画像素材を探すのは手間です。そこで、私がVideコーディングで開発した [ergon](https://github.com/hirokidaichi/ergon) （Google Imagen 4を使用したAI画像生成CLIツール）と連携させました。

### レクタースタイル準拠の画像生成

スライドとトーンマナを合わせるため、プロンプトに色指定を含めます。

```bash
# スライド挿絵（16:9）
ergon image gen "professional business team collaborating in modern office, \
  flat design style, color palette: navy blue #1B4565 and teal #3E9BA4, \
  clean white background, minimal shadows" \
  -t corporate -a 16:9 -o images/presentation/team.png

# アイコン（1:1）
ergon image gen "abstract icon representing data analytics, \
  flat minimal style, navy blue #1B4565 and teal #3E9BA4 accent colors, \
  white background" \
  -t flat -a 1:1 -o images/presentation/analytics.png

# コンセプト図（16:9）
ergon image gen "workflow diagram showing agile process, \
  flat corporate style, muted gray tones with teal #3E9BA4 highlights, \
  clean professional look" \
  -t flat -a 16:9 -o images/presentation/workflow.png
```

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/f08a8886-f79a-4bed-b51f-09ec1149cc0f.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Ff08a8886-f79a-4bed-b51f-09ec1149cc0f.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b5cf9bf8cd03892a71a8e777627002aa)

### slide-style-rectorからergonを呼び出す

スキル間の連携も定義しています。

```markdown
## 画像生成（ergon連携）

スライドに画像が必要な場合は、\`/ergon\` スキルを使用して
レクタースタイルに合った画像を生成する。

### 画像が必要なケース

- カラムレイアウトでイラストが必要
- パネルデザインでヘッダー画像が必要
- 背景画像が必要
- コンセプトを視覚化するアイコンが必要
```

### 使い方

```text
/ergon をつかって、AIエージェントと人間が協働している様子を
表すイラストを作成して、スライド12に挿入して
```

### 背景アニメーションGIFの生成と埋め込み

ergonは動画生成（Veo 3.1）にも対応しています。生成した動画をアニメーションGIFに変換することで、Marpスライドの背景に動きのある演出を加えることができます。  
[https://hirokidaichi.github.io/presentation/qiita.html#6](https://hirokidaichi.github.io/presentation/qiita.html#6)

[![qiita-message-bg.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Fff1a0d49-e4a4-4b70-b741-4a1e9fa8678b.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2ffd9b701bc4bd8ffcfbd3e0f76b2116)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Fff1a0d49-e4a4-4b70-b741-4a1e9fa8678b.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2ffd9b701bc4bd8ffcfbd3e0f76b2116)

Marpスライドへの埋め込みは、通常の背景画像と同じ記法で行えます。

```markdown
---
<!-- アニメーションGIFを背景に設定 -->
![bg](images/background.gif)

# タイトル
動きのある背景で印象的なスライドに
---
```

**ポイント**

- GIFのファイルサイズに注意（10MB以下を推奨）
- `fps=10` 程度に抑えてファイルサイズを軽量化
- ループ設定（ `-loop 0` ）で無限ループに

---

## 7\. SVG図解の作成

### svg-creatorスキル

スライドに図解やダイアグラムを入れたいとき、外部ツールで作成するのは手間がかかります。そこで、Claude Codeに直接SVGを生成させる **svg-creator** スキルを作りました。

### スキルの設計

SVG生成の品質を安定させるため、以下のルールを定義しています。

```markdown
# svg-creator

## 基本仕様
- サイズ比率: 縦2:横5（例: 400px × 1000px）
- 保存先: ./svg/
- ファイル名: 3-4の英単語

## カラーパレット
- グレートーン基調
- ダークブルー #1a2b50（タイトル、重要ラベル）
- ティール #008080（アクセント）
- ルビーピンク #c70067（対比、強調）
```

### 使い方

```text
/svg-creator で「スタイルガイドあり/なしの比較図」を作成して
```

Claude Codeは自動的に：

1. スライドのカラーパレットに合わせた色を選択
2. 適切なサイズ比率でSVGを生成
3. `./svg/` ディレクトリに保存

### 生成例

本記事の3つの画像がsvg-creator skillによるものです。  
[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/023f70a1-2480-4112-a43b-890a0ccbc031.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2F023f70a1-2480-4112-a43b-890a0ccbc031.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1829f0a1181bd27b496bcdb9e8e82557)

---

## 8\. 過去スライドの検索と再利用

### marp-lensスキル

プレゼンテーションを作り続けていると、「以前似たような話をしたスライドがあったはず」ということが増えます。しかし、数十ファイル・数百スライドの中から手動で探すのは現実的ではありません。

そこで、これまた自作した [marp-lens](https://github.com/hirokidaichi/marp-lens) （ベクトル埋め込みを使ったセマンティック検索CLIツール）を導入しました。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/b170a01f-d65b-4277-9868-966e4d83c713.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Fb170a01f-d65b-4277-9868-966e4d83c713.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1c031c893956b2def14f22024945e4cc)

### 基本的な使い方

```bash
# キーワードで関連スライドを検索
marp-lens search "生産性向上"

# 結果例
# - presentation-a.md #23: 生産性向上の3つの壁
# - presentation-b.md #15: 開発生産性を測定する方法
# - presentation-c.md #8: エンジニアリング組織の生産性

# 特定スライドの内容を取得
marp-lens get "presentation-a.md #23"

# インデックスを更新（スライド変更後）
marp-lens index
```

### 活用シーン

```text
プロンプト例：

新しいプレゼンで「チーム構成」について話したい。過去のスライドで
関連するものがあれば探して、再利用できそうな部分を教えて。
```

Claude Codeは自動的にmarp-lensで検索し、関連スライドを提案します。

---

## 9\. レビューワークフローの統合

### feedbackシステム

スライドのレビューをスムーズに行うため、Webベースのフィードバックシステムを作りました。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/f5e21abd-1472-46c8-910a-261be7cbd827.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Ff5e21abd-1472-46c8-910a-261be7cbd827.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=db838ddb833bcbc7887064907a861d3c)

**機能**

- スライドのプレビュー（iframe + ナビゲーション）
- スライド単位でのコメント管理
- クイックアクションボタン
- レイアウト選択モーダル

### クイックアクションボタン

よく使う操作をワンクリックでコメントに挿入できます。

| ボタン | 挿入されるプロンプト |
| --- | --- |
| スタイル整形 | `/slide-style-rector をつかってスタイルを整える` |
| レイアウト修正 | `/layout-fix をつかってレイアウト崩れを修正して` |
| 説明イラスト作成 | `/ergon をつかって説明イラストを作成して挿入して` |
| 背景画像作成 | `/ergon をつかって背景画像を作成して挿入して` |

### レイアウト選択モーダル

40パターンをビジュアルに表示し、クリックで選択できます。選択したパターンは自動的にコメントに挿入されます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/35671/b90f876d-a62b-482e-97ff-5530c1b3db42.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F35671%2Fb90f876d-a62b-482e-97ff-5530c1b3db42.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1c29089af2faa6cd00ea3990889f71d3)

```text
このスライドを「パターン6: 2カラム比較」のレイアウトに変更して
```

### ワークフロー例

```text
1. feedbackシステムでスライドをプレビュー
2. スライド18が窮屈に見える → コメント追加
3. 「レイアウト修正」ボタンをクリック
4. Claude Codeでコメントを確認
5. /layout-fix でスクリーンショット撮影→修正
6. feedbackシステムで修正結果を確認
```

これらの指示はJSON形式のプロンプトに集約され、Claude Codeへの指示に変わります。  
それによって、特定の画面やスライドについての指示を出しやすくなり、スライドを順番に見てコメントをつけていくだけで一気に修正できるという体験をすることができます。

---

## 10\. 動画生成への応用

### remotion-best-practicesスキル

Marpスライドの内容を動画化したいケースもあります。 **remotion** （Reactでビデオを作成するフレームワーク）のベストプラクティスをスキルとして整備しました。

27個のルールファイルで構成されています：

- 基本：3D（Three.js）、アニメーション、アセット管理
- メディア：画像、動画、オーディオ、GIF、Lottie
- 機能：キャプション、フレーム抽出、タイムライン
- スタイリング：Tailwind CSS、トランジション

### プレゼン→動画変換の例

これによって、プレゼンファイルから出囃子やティザーを自動的に生成できます。

![](https://www.youtube.com/watch?v=ZaCa7DoWE84)

```tsx
import { Sequence, useCurrentFrame } from 'remotion';

export const SlideVideo: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={150}>
        <TitleSlide title="AIエージェント時代の開発" />
      </Sequence>
      <Sequence from={150} durationInFrames={300}>
        <ComparisonSlide
          left={{ title: "期待", items: ["10倍の生産性", "..."] }}
          right={{ title: "現実", items: ["2-3倍程度", "..."] }}
        />
      </Sequence>
    </>
  );
};
```

---

## 11\. 文体ルールの自動適用

### CLAUDE.mdでの定義

プレゼンテーションの文体もルール化しています。これは `CLAUDE.md` に定義しており、Claude Codeがスライド作成時に自動的に従います。

```markdown
### スライドタイトルと文体

- **コロン（：）を使用しない**
  - ❌ 悪い例: \`原則❶：自律性の最大化\`
  - ✅ 良い例: \`原則❶ 自律性の最大化\`

### 理知的な文体の維持

- **感嘆符（！）や疑問符（？）を避ける**
  - ❌ 悪い例: \`AIで開発が10倍速に！\`
  - ✅ 良い例: \`AIで開発が10倍速に\`

- **装飾的な絵文字を避ける**
  - ❌ 悪い例: \`🧩 問題領域の複雑さ\`
  - ✅ 良い例: \`問題領域の複雑さ\`

- **色による強調は控えめに**
  - red-600、green-600などは避け、gray-600/gray-700を使用
```

---

## 12\. 統合ワークフロー

### 新規プレゼンテーション作成の流れ

```text
1. 概要を伝える
   「30分の講演スライドを作りたい。テーマはAIエージェント時代の
   ソフトウェア開発について」

2. Claude Codeがスライド構成を提案
   - marp-lensで過去の関連スライドを検索
   - 構成案を提示

3. スライド作成
   - slides/example.mdの40パターンから選択
   - スタイルガイドに沿ったデザイン

4. 画像生成
   - /ergon でレクタースタイル準拠の画像を生成
   - スライドに挿入

5. レイアウト検証
   - /layout-fix でスクリーンショット撮影
   - オーバーフロー/位置ずれを自動修正

6. レビュー
   - feedbackシステムでプレビュー
   - コメントを追加→修正のサイクル

7. 完成
```

### 実際のプロンプト例

**スライド構成の相談**

```text
30分のカンファレンス講演用スライドを作りたい。
テーマは「AIエージェント時代のソフトウェア開発」。

過去のスライドで関連するものがあれば探して、
構成案を提案してほしい。
```

**スタイル整形の依頼**

```text
/slide-style-rector をつかってslides/my-presentation.mdのスライド10-20の
スタイルを整えて。特にカラムレイアウトが統一されていないので、
example.mdのパターンに合わせてほしい。
```

**レイアウト修正の依頼**

```text
/layout-fix をつかってslides/my-presentation.mdのスライド15-25を
確認して。下部が切れているスライドがあれば修正して。
```

**画像生成の依頼**

```text
/ergon をつかって、スライド12用のイラストを作成して。
「AIエージェントと人間エンジニアが協働している様子」を
フラットなコーポレートスタイルで、レクターカラー
（#1B4565, #3E9BA4）を使って。
```

---

## まとめ

この記事では、Claude Codeのスキルシステムを活用したプレゼンテーション作成ワークフローを紹介しました。

**作り上げた仕組み**

| 成果物 | 役割 |
| --- | --- |
| `docs/style-guide.md` | カラー、タイポグラフィ、パネルデザインの定義 |
| `slides/example.md` | 40種類のレイアウトパターン |
| `slide-style-rector` | スタイルガイドに基づく自動整形 |
| `layout-fix` | agent-browserによる視覚的品質検証 |
| `ergon` 連携 | トーンマナ統一の画像生成 |
| `marp-lens` | 過去スライドのセマンティック検索 |
| `feedbackシステム` | レビューワークフローの統合 |

**ポイント**

1. **スタイルガイドを言語化する**: 「なんとなく良い感じ」ではなく、ルールとして定義する
2. **パターンを網羅する**: 毎回ゼロから作らず、実績あるパターンを再利用する
3. **視覚的な検証を自動化する**: コードの正しさと見た目の正しさは別
4. **スキル間を連携させる**: 単独のスキルより、組み合わせで真価を発揮

AIを活用したプレゼン作成は、「AIに丸投げ」ではなく、「人間が設計した仕組みの中でAIが動く」形が現時点では最も効果的だと感じています。

---

## 参考リンク

**自作ツール**

- [ergon](https://github.com/hirokidaichi/ergon) - AI画像生成CLIツール（Google Imagen 4）
- [marp-lens](https://github.com/hirokidaichi/marp-lens) - Marpスライド用セマンティック検索ツール

**外部ツール・ライブラリ**

- [Marp公式ドキュメント](https://marpit.marp.app/)
- [Marp CLI](https://github.com/marp-team/marp-cli)
- [Tailwind CSS](https://tailwindcss.com/)
- [Remotion](https://www.remotion.dev/)

[0](https://qiita.com/hirokidaichi/items/#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する

[338](https://qiita.com/hirokidaichi/items/243bd176b84900f4cc0d/likers)

いいねしたユーザー一覧へ移動

221