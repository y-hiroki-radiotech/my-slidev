# Slidev スライドスタイルガイド

## デザイン哲学

### 基本原則
- **明瞭性**: 情報を明確に伝え、視覚的にクリーン
- **統一性**: パターンの繰り返しで理解しやすく
- **可読性**: フォントサイズと余白を適切に確保
- **アクセシビリティ**: 色のコントラストを十分に

### 設計方針
- 過度な装飾を避け、内容に集中できるデザイン
- 医学教育に適した落ち着いたトーン
- 視覚的階層を明確に
- 専門性と親しみやすさのバランス

---

## カラーパレット

### プライマリカラー

#### ブルー系（メインカラー）
```css
/* メインブルー */
blue-50:  #eff6ff  /* 背景（非常に淡い） */
blue-100: #dbeafe  /* パネル背景（淡い） */
blue-200: #bfdbfe  /* ボーダー、アクセント */
blue-500: #3b82f6  /* アイコン、強調 */
blue-600: #2563eb  /* タイトル、重要テキスト */
blue-700: #1d4ed8  /* 見出し、強調見出し */
blue-800: #1e40af  /* ダークモード対応 */
```

#### グリーン系（サブカラー）
```css
/* サポートグリーン */
green-50:  #f0fdf4  /* 背景（成功・達成） */
green-100: #dcfce7  /* パネル背景 */
green-600: #16a34a  /* アイコン、強調 */
green-700: #15803d  /* 見出し */
```

### セカンダリカラー

#### グレー系（ベースカラー）
```css
/* グレートーン */
gray-50:  #f9fafb  /* 軽いパネル背景 */
gray-100: #f3f4f6  /* パネル背景 */
gray-200: #e5e7eb  /* ボーダー */
gray-300: #d1d5db  /* 区切り線 */
gray-600: #4b5563  /* サブテキスト */
gray-700: #374151  /* 本文テキスト */
gray-800: #1f2937  /* 見出しテキスト */
gray-900: #111827  /* 最重要テキスト */
```

#### アクセントカラー
```css
/* 警告・注意 */
yellow-50:  #fefce8  /* 背景 */
yellow-100: #fef9c3  /* パネル背景 */
yellow-600: #ca8a04  /* アイコン、強調 */

/* エラー・重要 */
red-50:  #fef2f2  /* 背景 */
red-100: #fee2e2  /* パネル背景 */
red-600: #dc2626  /* アイコン、強調 */

/* 情報 */
cyan-50:  #ecfeff  /* 背景 */
cyan-100: #cffafe  /* パネル背景 */
cyan-600: #0891b2  /* アイコン、強調 */
```

### 配色ルール

1. **1スライドあたり主要カラーは1-2色まで**
   - 基本: ブルー系 + グレー系
   - バリエーション: グリーン系を追加可能
   - アクセント: 必要に応じて1色のみ

2. **背景色の組み合わせ**
   - `bg-white` + `text-gray-700`: デフォルト
   - `bg-blue-50` + `text-blue-700`: ブルーパネル
   - `bg-green-50` + `text-green-700`: グリーンパネル
   - `bg-gray-50` + `text-gray-700`: ニュートラルパネル

3. **避けるべき組み合わせ**
   - ❌ 複数のビビッドカラーの併用
   - ❌ コントラスト不足（gray-300 on white など）
   - ❌ 過度なグラデーション

---

## タイポグラフィ

### フォントサイズ体系

| クラス | サイズ | 用途 | 例 |
|--------|--------|------|-----|
| `text-5xl` | 48px | スライドメインタイトル | セクション開始 |
| `text-4xl` | 36px | 大見出し | 章タイトル |
| `text-3xl` | 30px | 見出し | スライドタイトル |
| `text-2xl` | 24px | サブ見出し | パネルタイトル |
| `text-xl` | 20px | 強調テキスト | 重要ポイント |
| `text-lg` | 18px | 本文（標準） | リスト項目、説明 |
| `text-base` | 16px | 補足テキスト | 注釈、キャプション |
| `text-sm` | 14px | 小テキスト | ページ番号、出典 |

### フォントウェイト

| クラス | 太さ | 用途 |
|--------|------|------|
| `font-bold` | 700 | タイトル、見出し |
| `font-semibold` | 600 | サブ見出し、強調 |
| `font-medium` | 500 | やや強調 |
| `font-normal` | 400 | 本文 |

### 行間・余白

```css
/* 行間 */
leading-tight:   1.25  /* タイトル用 */
leading-snug:    1.375 /* 見出し用 */
leading-normal:  1.5   /* 本文用 */
leading-relaxed: 1.625 /* ゆったりした本文 */

/* 段落間 */
space-y-2: 0.5rem  /* リスト項目 */
space-y-3: 0.75rem /* 通常の段落 */
space-y-4: 1rem    /* セクション間 */
space-y-6: 1.5rem  /* 大きなセクション間 */
```

### タイポグラフィルール

1. **28pt以上を基本とする**
   - 本文は `text-lg` (18px) 以上
   - 重要テキストは `text-xl` (20px) 以上

2. **階層を明確に**
   ```html
   <!-- 良い例 -->
   <h1 class="text-3xl font-bold text-blue-700">タイトル</h1>
   <h2 class="text-2xl font-semibold text-gray-800">サブタイトル</h2>
   <p class="text-lg text-gray-700">本文テキスト</p>
   ```

3. **1スライドに3段階まで**
   - タイトル → 見出し → 本文の3層構造を基本とする

---

## レイアウト原則

### グリッドシステム

#### 2カラムレイアウト
```html
<div class="grid grid-cols-2 gap-8">
  <div>左カラム</div>
  <div>右カラム</div>
</div>
```

#### 3カラムレイアウト
```html
<div class="grid grid-cols-3 gap-6">
  <div>カラム1</div>
  <div>カラム2</div>
  <div>カラム3</div>
</div>
```

#### 不均等グリッド
```html
<!-- 1:2の比率 -->
<div class="grid grid-cols-3 gap-6">
  <div class="col-span-1">狭い方</div>
  <div class="col-span-2">広い方</div>
</div>
```

### 余白の原則

#### マージン（外側の余白）
```css
mt-4:  1rem    /* 小さな余白 */
mt-6:  1.5rem  /* 標準余白 */
mt-8:  2rem    /* 大きな余白 */
mt-12: 3rem    /* セクション間 */
```

#### パディング（内側の余白）
```css
p-4: 1rem    /* パネル内の小余白 */
p-6: 1.5rem  /* パネル内の標準余白 */
p-8: 2rem    /* パネル内の大余白 */
```

#### ギャップ（グリッド間隔）
```css
gap-4: 1rem    /* 密なレイアウト */
gap-6: 1.5rem  /* 標準レイアウト */
gap-8: 2rem    /* ゆったりレイアウト */
```

### レイアウトルール

1. **1スライド1メッセージ**
   - 伝えたいことを1つに絞る
   - 情報を詰め込みすぎない

2. **余白を十分に**
   - 要素間に `gap-6` 以上
   - スライド上部に `mt-8` 程度の余白

3. **視線の流れ**
   - 左上から右下への自然な流れ
   - 重要情報は左上に配置

---

## パネルデザイン

### 基本パネル
```html
<div class="bg-gray-50 p-6 rounded-lg">
  <h3 class="text-xl font-semibold mb-4">タイトル</h3>
  <p class="text-lg">内容</p>
</div>
```

### 強調パネル（ブルー）
```html
<div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
  <h3 class="text-xl font-semibold mb-4 text-blue-700">重要ポイント</h3>
  <p class="text-lg text-gray-700">内容</p>
</div>
```

### 成功・達成パネル（グリーン）
```html
<div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
  <h3 class="text-xl font-semibold mb-4 text-green-700">達成目標</h3>
  <p class="text-lg text-gray-700">内容</p>
</div>
```

### シャドウパネル
```html
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h3 class="text-xl font-semibold mb-4 text-gray-800">タイトル</h3>
  <p class="text-lg text-gray-700">内容</p>
</div>
```

### パネルデザインルール

1. **角丸を使用**: `rounded-lg` または `rounded-xl`
2. **左ボーダーで強調**: `border-l-4 border-{color}`
3. **影は控えめに**: `shadow` または `shadow-lg`
4. **内側余白は十分に**: `p-6` 以上

---

## アイコン使用ガイドライン

### Material Design Icons

#### よく使うアイコン

| 用途 | アイコン | クラス |
|------|----------|--------|
| 地図・全体像 | 🗺️ | `<mdi-map />` |
| 目標・コンパス | 🧭 | `<mdi-compass />` |
| 時間・スケジュール | 🕐 | `<mdi-clock-outline />` |
| チェック・完了 | ✓ | `<mdi-check />` |
| 情報 | ℹ️ | `<mdi-information />` |
| 警告 | ⚠️ | `<mdi-alert />` |
| 電球・アイデア | 💡 | `<mdi-lightbulb />` |
| 本・学習 | 📚 | `<mdi-book-open />` |
| 医療 | 🏥 | `<mdi-hospital-box />` |
| 道路・プロセス | 🛣️ | `<mdi-road />` |

### アイコンサイズ

```html
<!-- 小 -->
<mdi-icon class="text-xl" />

<!-- 中（推奨） -->
<mdi-icon class="text-2xl" />

<!-- 大 -->
<mdi-icon class="text-4xl" />

<!-- 装飾用 -->
<mdi-icon class="text-6xl opacity-30" />
```

### アイコンカラー

```html
<!-- プライマリ -->
<mdi-icon class="text-blue-500" />

<!-- 成功 -->
<mdi-icon class="text-green-500" />

<!-- 警告 -->
<mdi-icon class="text-yellow-600" />

<!-- エラー -->
<mdi-icon class="text-red-500" />

<!-- ニュートラル -->
<mdi-icon class="text-gray-600" />
```

### アイコン使用ルール

1. **インラインアイコン**: `inline mr-2` または `inline mr-3`
2. **装飾アイコン**: `opacity-30` で背景的に使用
3. **一貫性**: 同じ意味には同じアイコンを使用

---

## スライド区切り

### 標準区切り
```markdown
---
```

### セクション区切り（フロントマター付き）
```markdown
---
layout: section
background: linear-gradient(to right, #1e40af, #3b82f6)
---
```

### ページインポート
```markdown
---
src: ./pages/example.md
---
```

---

## 禁止事項・避けるべきパターン

### ❌ 避けるべきこと

1. **過度な装飾**
   - 装飾的な絵文字の乱用
   - 複数のグラデーション
   - 過剰なアニメーション

2. **読みにくいデザイン**
   - コントラスト不足
   - フォントサイズが小さすぎる（16px未満）
   - 1スライドに情報を詰め込みすぎ

3. **一貫性の欠如**
   - スライドごとに異なるカラースキーム
   - 統一性のないレイアウト
   - フォントサイズの無秩序な使用

### ✅ 推奨パターン

1. **シンプルで明快**
   - 1スライド1メッセージ
   - 十分な余白
   - 明確な視覚的階層

2. **一貫したスタイル**
   - カラーパレットを守る
   - レイアウトパターンを再利用
   - タイポグラフィルールに従う

3. **アクセシブル**
   - 十分なコントラスト
   - 読みやすいフォントサイズ
   - 色だけに頼らない情報伝達

---

## チェックリスト

スライド作成時に確認すること：

- [ ] カラーは1-2色に抑えられているか
- [ ] フォントサイズは18px以上か
- [ ] 余白は十分か（gap-6以上）
- [ ] 1スライド1メッセージか
- [ ] タイトルと本文の階層は明確か
- [ ] アイコンは適切に使われているか
- [ ] パネルデザインは統一されているか
- [ ] コントラストは十分か
- [ ] レイアウトパターンに従っているか

---

## 参考資料

- Slidev公式ドキュメント: https://sli.dev/
- Tailwind CSSドキュメント: https://tailwindcss.com/
- Material Design Icons: https://materialdesignicons.com/
