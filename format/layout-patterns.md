# Slidev レイアウトパターン集

このファイルは、Slidevスライド作成時に参照する40種類のレイアウトパターンを網羅しています。
**新しいスライドを作る際は、このファイルから適切なパターンを選んで使用してください。**

---

## A. タイトル・セクション系（5種）

### A-1. タイトルスライド

**用途**: プレゼンテーション開始、講義タイトル
**特徴**: 中央配置、大きなタイトル、サブタイトル、装飾アイコン

```markdown
---
theme: seriph
background: white
title: 第1回 放射線治療学概論
class: text-center
---

# 第1回 放射線治療学概論

## 放射線治療の臨床的流れ

***

<div class="mt-8"></div>

<div class="text-lg opacity-80">
診療放射線技師として知っておくべき<br>
放射線治療の全体像を理解しよう
</div>

<div class="absolute bottom-10 right-10">
<mdi-map class="text-blue-500 text-6xl opacity-30" />
</div>
```

---

### A-2. セクション開始スライド

**用途**: 章の切り替わり、新しいトピックの導入
**特徴**: グラデーション背景、白文字、インパクトのある見出し

```markdown
---
layout: section
background: linear-gradient(to right, #1e40af, #3b82f6)
class: text-center
---

# 第2章

## 放射線治療の計画プロセス
```

**バリエーション: 画像背景**

```markdown
---
layout: image-right
image: ./images/section-background.jpg
backgroundSize: cover
---

# 第3章

治療装置とその役割
```

---

### A-3. セクション終了・まとめスライド

**用途**: 章の終わり、まとめ
**特徴**: チェックリスト、達成事項の列挙

```markdown
---
---

# 本セクションのまとめ

***

<div class="mt-8"></div>

<div class="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">

## <mdi-check-circle class="inline text-green-600" /> 学んだこと

<div class="mt-6 text-lg space-y-3">

- ✓ 放射線治療の全体的な流れを理解した
- ✓ 各ステップの目的と役割を把握した
- ✓ 多職種連携の重要性を認識した

</div>
</div>
```

---

### A-4. 目次スライド

**用途**: 講義の構成を示す
**特徴**: 番号付きリスト、2カラムレイアウト

```markdown
---
---

# Agenda

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-8">

<div>

### <mdi-numeric-1-circle class="inline text-blue-500" /> 導入（10分）
- 本日の目標
- 全体像の確認

### <mdi-numeric-2-circle class="inline text-blue-500" /> 治療計画（20分）
- CTシミュレーション
- 輪郭描画

</div>

<div>

### <mdi-numeric-3-circle class="inline text-blue-500" /> 治療実施（15分）
- 位置決め
- 照射

### <mdi-numeric-4-circle class="inline text-blue-500" /> まとめ（5分）
- 復習
- 質疑応答

</div>

</div>
```

---

### A-5. クロージングスライド

**用途**: プレゼンテーション終了
**特徴**: 感謝メッセージ、連絡先、QRコード

```markdown
---
layout: end
class: text-center
---

# ご清聴ありがとうございました

***

<div class="mt-12"></div>

<div class="text-xl opacity-80">
質問・お問い合わせ
</div>

<div class="mt-6 text-lg">
📧 contact@example.com<br>
🌐 https://example.com
</div>
```

---

## B. カラムレイアウト系（8種）

### B-1. 2カラム比較（Before/After）

**用途**: 対比、比較
**特徴**: 左右2分割、微妙な色の差で対比を表現

```markdown
---
---

# Before / After の比較

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-8">

<div class="bg-gray-50 rounded-xl shadow-lg p-6 border-l-4 border-gray-400">

### Before

<div class="mt-4 text-lg space-y-3">

- 手動での計算
- 時間がかかる
- ミスのリスク

</div>

</div>

<div class="bg-blue-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">

### After

<div class="mt-4 text-lg space-y-3">

- 自動計算システム
- 効率的
- 精度向上

</div>

</div>

</div>
```

---

### B-2. 2カラム対比（左右非対称）

**用途**: テキスト+画像、説明+図解
**特徴**: 片方がテキスト、もう片方が画像やリスト

```markdown
---
layout: two-cols
---

# リニアックの構造

<div class="mt-6 text-lg space-y-4">

リニアック（直線加速器）は、放射線治療に使用される主要な装置です。

**主な構成要素**:
- 電子銃
- 加速管
- ターゲット
- ガントリー

</div>

::right::

<div class="flex items-center h-full">
<img src="/images/linac-structure.png" class="rounded-lg shadow-lg">
</div>
```

---

### B-3. 3カラムレイアウト（等幅）

**用途**: 3つの並列要素、ステップ、カテゴリ
**特徴**: 均等3分割、統一デザイン

```markdown
---
---

# 治療の3つの段階

***

<div class="mt-8"></div>

<div class="grid grid-cols-3 gap-6">

<div class="bg-blue-50 p-6 rounded-lg text-center">

### <mdi-numeric-1-circle class="inline text-blue-600 text-3xl" />

## 計画

<div class="mt-4 text-lg">
CTスキャン<br>
輪郭描画<br>
線量計算
</div>

</div>

<div class="bg-green-50 p-6 rounded-lg text-center">

### <mdi-numeric-2-circle class="inline text-green-600 text-3xl" />

## 確認

<div class="mt-4 text-lg">
品質管理<br>
検証<br>
承認
</div>

</div>

<div class="bg-gray-50 p-6 rounded-lg text-center">

### <mdi-numeric-3-circle class="inline text-gray-600 text-3xl" />

## 実施

<div class="mt-4 text-lg">
位置決め<br>
照射<br>
記録
</div>

</div>

</div>
```

---

### B-4. 3カラム（アクセントカラー）

**用途**: 1つを強調する3要素
**特徴**: 中央にアクセントカラー

```markdown
---
---

# 成熟度レベル

***

<div class="mt-8"></div>

<div class="grid grid-cols-3 gap-6">

<div class="bg-gray-100 p-6 rounded-lg text-center">

### Level 1

<div class="text-4xl font-bold text-gray-600 my-4">初級</div>
<div class="text-lg">基礎知識の習得</div>

</div>

<div class="p-6 rounded-lg text-center shadow-lg" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">

### <span class="text-white">Level 2</span>

<div class="text-4xl font-bold text-white my-4">中級</div>
<div class="text-lg text-white">臨床応用</div>

</div>

<div class="bg-gray-100 p-6 rounded-lg text-center">

### Level 3

<div class="text-4xl font-bold text-gray-600 my-4">上級</div>
<div class="text-lg">専門性の確立</div>

</div>

</div>
```

---

### B-5. 4カラムレイアウト

**用途**: 4つの並列要素
**特徴**: 4分割、アイコン付き

```markdown
---
---

# 4つの重要要素

***

<div class="mt-8"></div>

<div class="grid grid-cols-4 gap-4">

<div class="bg-blue-50 p-4 rounded-lg text-center">
<mdi-account-group class="text-4xl text-blue-600 mb-2" />
<div class="font-semibold">チーム</div>
</div>

<div class="bg-green-50 p-4 rounded-lg text-center">
<mdi-cog class="text-4xl text-green-600 mb-2" />
<div class="font-semibold">プロセス</div>
</div>

<div class="bg-yellow-50 p-4 rounded-lg text-center">
<mdi-tools class="text-4xl text-yellow-600 mb-2" />
<div class="font-semibold">ツール</div>
</div>

<div class="bg-gray-50 p-4 rounded-lg text-center">
<mdi-chart-line class="text-4xl text-gray-600 mb-2" />
<div class="font-semibold">評価</div>
</div>

</div>
```

---

### B-6. 5カラム（成熟度レベル）

**用途**: プロセスの5段階、成熟度モデル
**特徴**: 5分割、段階的な強調

```markdown
---
---

# 放射線治療計画の5段階

***

<div class="mt-6"></div>

<div class="grid grid-cols-5 gap-3 text-center text-sm">

<div class="bg-gray-100 p-3 rounded">
<div class="font-bold mb-2">Stage 1</div>
<div>画像取得</div>
</div>

<div class="bg-blue-100 p-3 rounded">
<div class="font-bold mb-2">Stage 2</div>
<div>輪郭描画</div>
</div>

<div class="bg-blue-200 p-3 rounded">
<div class="font-bold mb-2">Stage 3</div>
<div>線量計算</div>
</div>

<div class="bg-blue-300 p-3 rounded">
<div class="font-bold mb-2">Stage 4</div>
<div>プラン評価</div>
</div>

<div class="bg-blue-500 text-white p-3 rounded">
<div class="font-bold mb-2">Stage 5</div>
<div>承認</div>
</div>

</div>
```

---

### B-7. 2×2グリッド

**用途**: 4象限、マトリクス
**特徴**: 均等4分割、ラベル付き

```markdown
---
---

# 治療技術の分類

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-6">

<div class="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">

### <mdi-alpha-a-circle class="inline text-blue-600" /> 外部照射

<div class="mt-3 text-lg">
体外から放射線を照射
</div>

</div>

<div class="bg-green-50 p-6 rounded-lg border-2 border-green-200">

### <mdi-alpha-b-circle class="inline text-green-600" /> 内部照射

<div class="mt-3 text-lg">
体内に線源を配置
</div>

</div>

<div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">

### <mdi-alpha-c-circle class="inline text-yellow-600" /> 粒子線治療

<div class="mt-3 text-lg">
陽子線・重粒子線
</div>

</div>

<div class="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">

### <mdi-alpha-d-circle class="inline text-gray-600" /> 定位照射

<div class="mt-3 text-lg">
高精度ピンポイント照射
</div>

</div>

</div>
```

---

### B-8. 2×3グリッド

**用途**: 6要素の並列表示
**特徴**: 2行3列、アイコン付き

```markdown
---
---

# 放射線治療の6つの役割

***

<div class="mt-6"></div>

<div class="grid grid-cols-3 grid-rows-2 gap-4">

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
<mdi-account-tie class="text-2xl text-blue-600 mb-2" />
<div class="font-semibold">放射線腫瘍医</div>
</div>

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
<mdi-account-hard-hat class="text-2xl text-green-600 mb-2" />
<div class="font-semibold">診療放射線技師</div>
</div>

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
<mdi-calculator class="text-2xl text-yellow-600 mb-2" />
<div class="font-semibold">医学物理士</div>
</div>

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
<mdi-shield-check class="text-2xl text-red-600 mb-2" />
<div class="font-semibold">品質管理</div>
</div>

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
<mdi-heart-pulse class="text-2xl text-purple-600 mb-2" />
<div class="font-semibold">看護師</div>
</div>

<div class="bg-white p-4 rounded-lg shadow border-l-4 border-cyan-500">
<mdi-file-document class="text-2xl text-cyan-600 mb-2" />
<div class="font-semibold">事務スタッフ</div>
</div>

</div>
```

---

## C. リスト系（4種）

### C-1. ステップリスト

**用途**: プロセスの順序、手順
**特徴**: 番号付き、矢印で繋ぐ

```markdown
---
---

# 治療計画の手順

***

<div class="mt-8"></div>

<div class="space-y-4">

<div class="flex items-center gap-4">
<div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
<div class="bg-blue-50 p-4 rounded-lg flex-grow border-l-4 border-blue-500">
<div class="font-semibold">CTシミュレーション</div>
<div class="text-sm mt-1 opacity-80">治療計画用CT画像の取得</div>
</div>
</div>

<div class="flex justify-center">
<mdi-arrow-down class="text-3xl text-gray-400" />
</div>

<div class="flex items-center gap-4">
<div class="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
<div class="bg-green-50 p-4 rounded-lg flex-grow border-l-4 border-green-500">
<div class="font-semibold">輪郭描画</div>
<div class="text-sm mt-1 opacity-80">標的と正常組織の輪郭設定</div>
</div>
</div>

<div class="flex justify-center">
<mdi-arrow-down class="text-3xl text-gray-400" />
</div>

<div class="flex items-center gap-4">
<div class="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
<div class="bg-yellow-50 p-4 rounded-lg flex-grow border-l-4 border-yellow-600">
<div class="font-semibold">線量計算</div>
<div class="text-sm mt-1 opacity-80">治療計画の立案と線量分布の計算</div>
</div>
</div>

</div>
```

---

### C-2. タイムライン

**用途**: 時系列、スケジュール
**特徴**: 横軸または縦軸のタイムライン

```markdown
---
---

# 治療の流れ（タイムライン）

***

<div class="mt-8"></div>

<div class="relative pl-8 space-y-6">

<!-- 縦線 -->
<div class="absolute left-3 top-0 bottom-0 w-1 bg-blue-200"></div>

<!-- Week 1 -->
<div class="relative">
<div class="absolute -left-5 w-6 h-6 rounded-full bg-blue-500 border-4 border-white"></div>
<div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
<div class="font-bold text-blue-700">Week 1</div>
<div class="mt-2">初診・診断・治療方針決定</div>
</div>
</div>

<!-- Week 2 -->
<div class="relative">
<div class="absolute -left-5 w-6 h-6 rounded-full bg-green-500 border-4 border-white"></div>
<div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
<div class="font-bold text-green-700">Week 2</div>
<div class="mt-2">CTシミュレーション・治療計画</div>
</div>
</div>

<!-- Week 3-8 -->
<div class="relative">
<div class="absolute -left-5 w-6 h-6 rounded-full bg-yellow-600 border-4 border-white"></div>
<div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
<div class="font-bold text-yellow-700">Week 3-8</div>
<div class="mt-2">放射線治療実施（週5日×6週間）</div>
</div>
</div>

</div>
```

---

### C-3. アイコン付きリスト

**用途**: 特徴、要素の列挙
**特徴**: アイコン+テキスト

```markdown
---
---

# 放射線治療の特徴

***

<div class="mt-8"></div>

<div class="space-y-4 text-lg">

<div class="flex items-start gap-4">
<mdi-shield-check class="text-3xl text-blue-500 flex-shrink-0 mt-1" />
<div>
<div class="font-semibold">非侵襲的治療</div>
<div class="text-base opacity-80">体を切らずに治療可能</div>
</div>
</div>

<div class="flex items-start gap-4">
<mdi-target class="text-3xl text-green-500 flex-shrink-0 mt-1" />
<div>
<div class="font-semibold">局所制御</div>
<div class="text-base opacity-80">腫瘍に集中的に照射</div>
</div>
</div>

<div class="flex items-start gap-4">
<mdi-account-group class="text-3xl text-yellow-600 flex-shrink-0 mt-1" />
<div>
<div class="font-semibold">多職種連携</div>
<div class="text-base opacity-80">チーム医療が不可欠</div>
</div>
</div>

<div class="flex items-start gap-4">
<mdi-clock-check class="text-3xl text-gray-600 flex-shrink-0 mt-1" />
<div>
<div class="font-semibold">通院治療が可能</div>
<div class="text-base opacity-80">多くの場合、入院不要</div>
</div>
</div>

</div>
```

---

### C-4. チェックリスト

**用途**: 確認項目、達成事項
**特徴**: チェックマーク付き

```markdown
---
---

# 治療前チェックリスト

***

<div class="mt-8"></div>

<div class="bg-gray-50 p-8 rounded-lg">

<div class="space-y-4 text-lg">

<div class="flex items-center gap-3">
<mdi-checkbox-marked-circle class="text-3xl text-green-500" />
<div>患者確認（氏名・ID）</div>
</div>

<div class="flex items-center gap-3">
<mdi-checkbox-marked-circle class="text-3xl text-green-500" />
<div>治療計画の確認</div>
</div>

<div class="flex items-center gap-3">
<mdi-checkbox-marked-circle class="text-3xl text-green-500" />
<div>位置決めマークの確認</div>
</div>

<div class="flex items-center gap-3">
<mdi-checkbox-blank-circle-outline class="text-3xl text-gray-400" />
<div>装置の動作確認</div>
</div>

<div class="flex items-center gap-3">
<mdi-checkbox-blank-circle-outline class="text-3xl text-gray-400" />
<div>画像照合の実施</div>
</div>

</div>

</div>
```

---

## D. パネルデザイン系（5種）

### D-1. 基本パネル

**用途**: 標準的な情報ボックス
**特徴**: 淡い背景、角丸

```markdown
---
---

# 基本パネルの使用例

***

<div class="mt-8"></div>

<div class="bg-gray-50 p-8 rounded-lg">

## 放射線治療とは

<div class="mt-4 text-lg">
放射線治療は、高エネルギーの放射線を用いて、がん細胞を破壊する治療法です。
体を傷つけずに、ピンポイントで腫瘍を攻撃できる特徴があります。
</div>

</div>
```

---

### D-2. 強調パネル（ブルー）

**用途**: 重要な情報、キーポイント
**特徴**: 青系背景、左ボーダー

```markdown
---
---

# 重要ポイント

***

<div class="mt-8"></div>

<div class="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-500">

## <mdi-alert-circle class="inline text-blue-600" /> 注意事項

<div class="mt-4 text-lg text-gray-700">
治療中は患者の動きを最小限にする必要があります。
位置のずれは治療効果に直接影響するため、細心の注意を払います。
</div>

</div>
```

---

### D-3. 成功パネル（グリーン）

**用途**: 達成、成功、ポジティブな情報
**特徴**: 緑系背景、左ボーダー

```markdown
---
---

# 治療成績

***

<div class="mt-8"></div>

<div class="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">

## <mdi-check-circle class="inline text-green-600" /> 高い治療成績

<div class="mt-4 text-lg text-gray-700">
早期前立腺がんにおいて、放射線治療は手術と同等の治療成績が報告されています。
5年生存率は90%以上を達成しています。
</div>

</div>
```

---

### D-4. 警告パネル（イエロー）

**用途**: 注意喚起、警告
**特徴**: 黄色系背景、左ボーダー

```markdown
---
---

# 注意が必要な症例

***

<div class="mt-8"></div>

<div class="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-600">

## <mdi-alert class="inline text-yellow-700" /> 特別な配慮が必要

<div class="mt-4 text-lg text-gray-700">
ペースメーカーを装着している患者では、放射線が機器に影響を与える可能性があります。
事前に循環器科との連携が必須です。
</div>

</div>
```

---

### D-5. シャドウパネル

**用途**: 浮き上がらせたい情報
**特徴**: 白背景、影付き

```markdown
---
---

# 浮き上がるパネル

***

<div class="mt-8"></div>

<div class="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">

## 最新の研究結果

<div class="mt-4 text-lg text-gray-700">
2024年の大規模臨床試験により、IMRT（強度変調放射線治療）は
従来の3D-CRTと比較して、副作用を30%低減することが示されました。
</div>

</div>
```

---

## E. 画像配置系（4種）

### E-1. 全画面背景画像

**用途**: インパクトのある導入、セクション開始
**特徴**: 画像全体表示、テキストオーバーレイ

```markdown
---
layout: image
image: ./images/medical-equipment.jpg
backgroundSize: cover
---

<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
<div class="bg-black bg-opacity-50 p-8 rounded-lg">
<h1 class="text-5xl font-bold text-white">最新の治療装置</h1>
<p class="text-2xl text-white mt-4">リニアック 2024モデル</p>
</div>
</div>
```

---

### E-2. 右側画像配置

**用途**: テキスト+画像の組み合わせ
**特徴**: 左にテキスト、右に画像

```markdown
---
layout: image-right
image: ./images/ct-simulator.jpg
backgroundSize: contain
---

# CTシミュレーター

<div class="mt-6 text-lg space-y-4">

治療計画専用のCT装置です。

**特徴**:
- 治療体位での撮影が可能
- レーザー位置決め機能
- 固定具との組み合わせ

</div>
```

---

### E-3. 左側画像配置

**用途**: 画像+テキストの組み合わせ
**特徴**: 左に画像、右にテキスト

```markdown
---
layout: image-left
image: ./images/treatment-room.jpg
backgroundSize: contain
---

# 治療室の構造

<div class="mt-6 text-lg space-y-4">

放射線治療室は特別な設計がされています。

**安全対策**:
- 厚いコンクリート壁
- インターロックシステム
- 監視カメラ

</div>
```

---

### E-4. 画像グリッド

**用途**: 複数画像の並列表示
**特徴**: グリッド配置、キャプション付き

```markdown
---
---

# 治療装置の種類

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-6">

<div>
<img src="/images/linac-1.jpg" class="rounded-lg shadow-lg w-full">
<div class="text-center mt-2 text-sm opacity-80">リニアック（Varian社）</div>
</div>

<div>
<img src="/images/linac-2.jpg" class="rounded-lg shadow-lg w-full">
<div class="text-center mt-2 text-sm opacity-80">リニアック（Elekta社）</div>
</div>

<div>
<img src="/images/cyberknife.jpg" class="rounded-lg shadow-lg w-full">
<div class="text-center mt-2 text-sm opacity-80">サイバーナイフ</div>
</div>

<div>
<img src="/images/proton.jpg" class="rounded-lg shadow-lg w-full">
<div class="text-center mt-2 text-sm opacity-80">陽子線治療装置</div>
</div>

</div>
```

---

## F. 強調・特殊系（3種）

### F-1. 統計・数値強調

**用途**: データ、統計情報の強調
**特徴**: 大きな数値、説明テキスト

```markdown
---
---

# 治療実績

***

<div class="mt-8"></div>

<div class="grid grid-cols-3 gap-6">

<div class="bg-gray-100 rounded-lg shadow p-6 text-center">
<div class="text-5xl font-bold text-gray-600">1,200</div>
<div class="text-xl mt-3">年間治療患者数</div>
<div class="text-base text-gray-500 mt-2">2023年実績</div>
</div>

<div class="rounded-lg shadow p-6 text-center" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
<div class="text-5xl font-bold text-white">95%</div>
<div class="text-xl mt-3 text-white">治療完遂率</div>
<div class="text-base text-blue-100 mt-2">計画通り完了</div>
</div>

<div class="bg-gray-100 rounded-lg shadow p-6 text-center">
<div class="text-5xl font-bold text-gray-600">30日</div>
<div class="text-xl mt-3">平均治療期間</div>
<div class="text-base text-gray-500 mt-2">標準分割照射</div>
</div>

</div>
```

---

### F-2. 中央強調配置

**用途**: 単一メッセージの強調
**特徴**: 画面中央、大きなテキスト

```markdown
---
layout: center
class: text-center
---

# <mdi-lightbulb class="inline text-yellow-500" />

# Key Takeaway

<div class="text-3xl font-bold text-blue-600 mt-8">
放射線治療は<br>
チーム医療の典型例
</div>

<div class="text-xl mt-6 opacity-80">
多職種の専門家が連携して<br>
患者さんに最適な治療を提供する
</div>
```

---

### F-3. Q&Aスライド

**用途**: よくある質問、FAQ
**特徴**: Q&A形式

```markdown
---
---

# よくある質問

***

<div class="mt-6"></div>

<div class="space-y-6">

<div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
<div class="flex items-start gap-3">
<div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">Q</div>
<div class="font-semibold text-lg">放射線治療は痛いですか？</div>
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
<div class="flex items-start gap-3">
<div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">A</div>
<div class="text-lg">照射中の痛みはありません。ただし、皮膚炎などの副作用が現れることがあります。</div>
</div>
</div>

</div>
```

---

## G. 応用パターン（11種）

### G-1. QRコード+URL表示

**用途**: 資料へのリンク、追加情報
**特徴**: QRコード、URL、説明

```markdown
---
---

# 参考資料

***

<div class="mt-8"></div>

<div class="flex items-center justify-center gap-12">

<div>
<img src="/images/qr-code-resources.png" class="w-48 h-48 rounded-lg shadow-lg">
</div>

<div class="text-lg">
<div class="font-bold text-2xl mb-4">講義資料はこちら</div>
<div class="text-blue-600 mb-2">https://example.com/resources</div>
<div class="text-gray-600">スマートフォンでQRコードを<br>読み取ってアクセス</div>
</div>

</div>
```

---

### G-2. 問いかけスライド

**用途**: 考えさせる、ディスカッション導入
**特徴**: 大きな疑問文、中央配置

```markdown
---
layout: center
class: text-center
---

<div class="text-6xl mb-8">
🤔
</div>

# なぜ放射線ががん細胞を<br>破壊できるのか？

<div class="text-xl mt-8 opacity-60">
次のスライドで解説します
</div>
```

---

### G-3. まとめスライド（3ポイント）

**用途**: セクションまとめ、重要ポイントの整理
**特徴**: 3つの要点、番号付き

```markdown
---
---

# 今日のまとめ

***

<div class="mt-8"></div>

<div class="space-y-6">

<div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 flex items-start gap-4">
<div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
<div class="text-lg">
<div class="font-semibold mb-2">治療計画の重要性</div>
<div>正確な計画が安全で効果的な治療を実現する</div>
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 flex items-start gap-4">
<div class="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
<div class="text-lg">
<div class="font-semibold mb-2">多職種連携</div>
<div>チーム全体で患者さんをサポート</div>
</div>
</div>

<div class="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-500 flex items-start gap-4">
<div class="bg-gray-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
<div class="text-lg">
<div class="font-semibold mb-2">品質管理の徹底</div>
<div>日々の確認作業が安全性を担保</div>
</div>
</div>

</div>
```

---

### G-4. 対比スライド（表形式）

**用途**: 2つの要素の比較
**特徴**: 表形式、視覚的対比

```markdown
---
---

# 外部照射 vs 内部照射

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">

<div class="bg-blue-50 p-6 rounded-lg">

### 外部照射

<div class="mt-4 space-y-3 text-base">

| 項目 | 詳細 |
|------|------|
| **方法** | 体外から照射 |
| **期間** | 数週間 |
| **通院** | 可能 |
| **適応** | 多くのがん種 |

</div>

</div>

<div class="bg-green-50 p-6 rounded-lg">

### 内部照射

<div class="mt-4 space-y-3 text-base">

| 項目 | 詳細 |
|------|------|
| **方法** | 体内に線源配置 |
| **期間** | 数日 |
| **通院** | 入院必要 |
| **適応** | 限定的 |

</div>

</div>

</div>
```

---

### G-5. フローチャート

**用途**: プロセスの流れ、意思決定
**特徴**: 矢印でつながった要素

```markdown
---
---

# 治療決定までのフロー

***

<div class="mt-6"></div>

<div class="flex flex-col items-center space-y-4">

<div class="bg-blue-100 px-8 py-4 rounded-lg border-2 border-blue-500">
初診・診断
</div>

<mdi-arrow-down class="text-3xl text-gray-400" />

<div class="bg-green-100 px-8 py-4 rounded-lg border-2 border-green-500">
カンファレンス
</div>

<mdi-arrow-down class="text-3xl text-gray-400" />

<div class="grid grid-cols-3 gap-4">
<div class="bg-yellow-100 px-6 py-3 rounded-lg border-2 border-yellow-500 text-center">手術</div>
<div class="bg-yellow-100 px-6 py-3 rounded-lg border-2 border-yellow-500 text-center">化学療法</div>
<div class="bg-yellow-100 px-6 py-3 rounded-lg border-2 border-yellow-500 text-center">放射線治療</div>
</div>

</div>
```

---

### G-6. 用語解説パネル

**用途**: 専門用語の説明
**特徴**: 用語+定義+補足

```markdown
---
---

# 重要用語

***

<div class="mt-6"></div>

<div class="space-y-4">

<div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
<div class="flex items-baseline gap-3">
<div class="text-xl font-bold text-blue-700">IMRT</div>
<div class="text-sm text-gray-500">Intensity Modulated Radiation Therapy</div>
</div>
<div class="mt-3 text-lg">
<strong>強度変調放射線治療</strong>: 照射野内の線量分布を細かく調整できる高度な治療法
</div>
</div>

<div class="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
<div class="flex items-baseline gap-3">
<div class="text-xl font-bold text-green-700">IGRT</div>
<div class="text-sm text-gray-500">Image Guided Radiation Therapy</div>
</div>
<div class="mt-3 text-lg">
<strong>画像誘導放射線治療</strong>: 治療直前に画像で位置確認を行う技術
</div>
</div>

</div>
```

---

### G-7. 引用スライド

**用途**: 研究論文、ガイドラインの引用
**特徴**: 引用符、出典明記

```markdown
---
---

# エビデンス

***

<div class="mt-8"></div>

<div class="bg-gray-50 p-8 rounded-lg border-l-4 border-gray-400">

<div class="text-4xl text-gray-400 mb-4">"</div>

<div class="text-xl italic text-gray-700 leading-relaxed">
IMRTは従来の3D-CRTと比較して、
正常組織への線量を平均30%低減し、
有害事象のリスクを有意に減少させる
</div>

<div class="text-4xl text-gray-400 text-right">"</div>

<div class="mt-6 text-base text-gray-600">
— Radiation Oncology Journal, 2024
</div>

</div>
```

---

### G-8. ビフォーアフター画像比較

**用途**: 画像の比較
**特徴**: 2枚の画像を並列配置

```markdown
---
---

# 線量分布の比較

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">

<div>
<div class="text-center font-semibold text-lg mb-3">3D-CRT</div>
<img src="/images/dose-3dcrt.png" class="rounded-lg shadow-lg w-full">
<div class="text-sm text-center mt-2 text-gray-600">従来法</div>
</div>

<div>
<div class="text-center font-semibold text-lg mb-3">IMRT</div>
<img src="/images/dose-imrt.png" class="rounded-lg shadow-lg w-full">
<div class="text-sm text-center mt-2 text-blue-600">最新技術</div>
</div>

</div>
```

---

### G-9. プロコンリスト（メリット・デメリット）

**用途**: 利点と欠点の整理
**特徴**: 2カラム、アイコン付き

```markdown
---
---

# IMRTの評価

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-8">

<div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">

### <mdi-thumb-up class="inline text-green-600" /> メリット

<div class="mt-4 space-y-2 text-lg">
<div>✓ 正常組織の保護</div>
<div>✓ 副作用の軽減</div>
<div>✓ 線量分布の最適化</div>
<div>✓ 治療効果の向上</div>
</div>

</div>

<div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">

### <mdi-thumb-down class="inline text-red-600" /> デメリット

<div class="mt-4 space-y-2 text-lg">
<div>✗ 治療時間が長い</div>
<div>✗ 計画が複雑</div>
<div>✗ 品質管理に手間</div>
<div>✗ コストが高い</div>
</div>

</div>

</div>
```

---

### G-10. アジェンダ詳細

**用途**: 詳細な講義構成
**特徴**: 時間配分、内容詳細

```markdown
---
---

# 本日の講義構成

***

<div class="mt-6"></div>

<div class="space-y-3">

<div class="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
<div class="bg-blue-500 text-white px-3 py-1 rounded font-bold flex-shrink-0">10分</div>
<div>
<div class="font-semibold">導入</div>
<div class="text-sm opacity-80">本日の学習目標、全体像の確認</div>
</div>
</div>

<div class="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
<div class="bg-green-500 text-white px-3 py-1 rounded font-bold flex-shrink-0">30分</div>
<div>
<div class="font-semibold">治療計画プロセス</div>
<div class="text-sm opacity-80">CTシミュレーション、輪郭描画、線量計算</div>
</div>
</div>

<div class="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
<div class="bg-yellow-600 text-white px-3 py-1 rounded font-bold flex-shrink-0">15分</div>
<div>
<div class="font-semibold">治療実施</div>
<div class="text-sm opacity-80">位置決め、画像照合、照射</div>
</div>
</div>

<div class="flex items-start gap-4 bg-gray-100 p-4 rounded-lg">
<div class="bg-gray-500 text-white px-3 py-1 rounded font-bold flex-shrink-0">5分</div>
<div>
<div class="font-semibold">まとめと質疑応答</div>
<div class="text-sm opacity-80">重要ポイントの復習、質問受付</div>
</div>
</div>

</div>
```

---

### G-11. タブ切り替え風デザイン

**用途**: 複数の情報を切り替えて表示
**特徴**: タブ風ヘッダー、コンテンツエリア

```markdown
---
---

# 治療装置の種類

***

<div class="mt-6"></div>

<!-- タブヘッダー -->
<div class="flex gap-2 mb-4">
<div class="bg-blue-500 text-white px-6 py-2 rounded-t-lg font-semibold">リニアック</div>
<div class="bg-gray-200 px-6 py-2 rounded-t-lg opacity-60">サイバーナイフ</div>
<div class="bg-gray-200 px-6 py-2 rounded-t-lg opacity-60">陽子線</div>
</div>

<!-- コンテンツエリア -->
<div class="bg-blue-50 p-8 rounded-b-lg rounded-tr-lg border-2 border-blue-500">

### リニアック（直線加速器）

<div class="mt-4 text-lg space-y-3">

- **用途**: 最も一般的な放射線治療装置
- **エネルギー**: 4-18 MV X線
- **特徴**: 多様な照射技術に対応
- **コスト**: 比較的導入しやすい

</div>

</div>
```

---

## 使用上の注意

### パターン選択のガイドライン

1. **内容に合ったパターンを選ぶ**
   - 比較 → B-1（2カラム比較）
   - プロセス → C-1（ステップリスト）
   - 強調 → D-2（強調パネル）

2. **1スライド1パターンを基本とする**
   - 複数パターンの混在は避ける
   - シンプルさを保つ

3. **カラーは統一する**
   - 1スライドで使う主要カラーは1-2色
   - アクセントカラーは控えめに

4. **余白を十分に確保**
   - `gap-6` 以上を推奨
   - `mt-8` で上部余白を確保

### カスタマイズ時の注意点

- パターンの基本構造は維持する
- カラーはスタイルガイドに従う
- フォントサイズは18px以上を基本とする
- アイコンは意味のあるものを選ぶ

---

## パターン索引

### カテゴリ別索引

| カテゴリ | パターン数 | ページ |
|---------|-----------|--------|
| A. タイトル・セクション系 | 5 | A-1〜A-5 |
| B. カラムレイアウト系 | 8 | B-1〜B-8 |
| C. リスト系 | 4 | C-1〜C-4 |
| D. パネルデザイン系 | 5 | D-1〜D-5 |
| E. 画像配置系 | 4 | E-1〜E-4 |
| F. 強調・特殊系 | 3 | F-1〜F-3 |
| G. 応用パターン | 11 | G-1〜G-11 |

### 用途別索引

| 用途 | 推奨パターン |
|------|-------------|
| プレゼン開始 | A-1 |
| 章の区切り | A-2 |
| まとめ | A-3, G-3 |
| 比較・対比 | B-1, B-2, G-4 |
| プロセス説明 | C-1, C-2, G-5 |
| 重要事項 | D-2, F-2 |
| データ表示 | F-1 |
| Q&A | F-3 |
| 用語解説 | G-6 |
| 引用 | G-7 |

---

このレイアウトパターン集を活用することで、一貫性のある美しいスライドを効率的に作成できます。
