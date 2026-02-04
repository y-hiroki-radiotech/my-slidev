---
theme: seriph
background: white
title: 第2回 放射線生物学の基礎
subtitle: なぜ放射線はがん細胞を殺せるのか？
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
hideInToc: true
lineNumbers: true
colorSchema: light
---

<div class="absolute top-8 left-1/2 transform -translate-x-1/2 text-sm opacity-60">
放射線治療技術学概論 第2回講義
</div>

# 第2回 放射線生物学の基礎

## なぜ放射線はがん細胞を殺せるのか？

***

<div class="mt-8"></div>

<div class="text-lg opacity-80">
放射線治療の生物学的メカニズムを理解し<br>
分割照射の科学的根拠を学ぼう
</div>

<div class="absolute bottom-10 right-10">
<mdi-dna class="text-blue-500 text-6xl opacity-30" />
</div>

---
hideInToc: true
src: ./pages/who_am_i.md
---

---
hideInToc: true
src: ./pages/resources.md
---

# 前回の復習

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-8">
<div class="bg-blue-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-hospital-box class="inline mr-2" />
放射線治療の全体像
</h3>
<div class="space-y-3 text-lg">
<div>• 7つのステップで構成</div>
<div>• 多職種連携の重要性</div>
<div>• ミリ単位の精密治療</div>
<div>• 品質保証の徹底</div>
</div>
</div>

<div class="bg-orange-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-orange-700">
<mdi-help-circle class="inline mr-2" />
未回答の疑問
</h3>
<div class="text-lg space-y-3">
<div class="bg-white p-4 rounded text-orange-600 font-semibold">
「なぜ毎日少しずつ照射するのか？」
</div>
<div class="text-base">
この疑問の答えが<br>
今日のテーマです
</div>
</div>
</div>
</div>

---

# 今日の核心的問い

***

<div class="mt-8"></div>

<div class="text-center">
<div class="text-3xl font-bold mb-8 text-red-600">
「なぜ放射線はがん細胞を殺せるのか？」
</div>

<div class="text-2xl mb-8 text-blue-600">
そして
</div>

<div class="text-3xl font-bold text-green-600">
「なぜ正常細胞は守られるのか？」
</div>
</div>

<div class="mt-12 text-center">
<div class="text-lg bg-yellow-50 p-6 rounded-lg inline-block">
<mdi-lightbulb class="inline mr-2 text-yellow-600" />
これらの問いに答えることが、今日の目標です
</div>
</div>

---

# 本日の学習目標

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-blue-50 p-5 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-blue-700">
<mdi-molecule class="inline mr-2" />
1. DNA損傷メカニズム
</h3>
<div class="text-base space-y-2">
<div>• 直接作用と間接作用の違い</div>
<div>• DNA損傷が細胞死につながる理由</div>
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-green-700">
<mdi-chart-bell-curve class="inline mr-2" />
2. 放射線感受性
</h3>
<div class="text-base space-y-2">
<div>• 細胞周期と感受性の関係</div>
<div>• がん細胞と正常細胞の違い</div>
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-purple-700">
<mdi-refresh class="inline mr-2" />
3. 分割照射の4つのR
</h3>
<div class="text-base space-y-2">
<div>• Repair（修復）</div>
<div>• Redistribution（再分布）</div>
<div>• Repopulation（再増殖）</div>
<div>• Reoxygenation（再酸素化）</div>
</div>
</div>

<div class="bg-orange-50 p-5 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-orange-700">
<mdi-hospital class="inline mr-2" />
4. 臨床への応用
</h3>
<div class="text-base space-y-2">
<div>• 正常組織の保護戦略</div>
<div>• 治療プロトコルの設計根拠</div>
</div>
</div>
</div>

---

# 授業の流れ (90分)

***

<div class="mt-8"></div>

<div class="space-y-4 text-lg">
<div class="bg-blue-50 p-4 rounded-lg flex items-center">
<div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
<div class="flex-1">
<strong>DNA損傷のメカニズム</strong>
<span class="ml-4 text-blue-600">20分</span>
</div>
</div>

<div class="bg-green-50 p-4 rounded-lg flex items-center">
<div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
<div class="flex-1">
<strong>放射線感受性</strong>
<span class="ml-4 text-green-600">15分</span>
</div>
</div>

<div class="bg-purple-50 p-4 rounded-lg flex items-center">
<div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
<div class="flex-1">
<strong>分割照射の4つのR</strong>
<span class="ml-4 text-purple-600">25分</span>
</div>
</div>

<div class="bg-orange-50 p-4 rounded-lg flex items-center">
<div class="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
<div class="flex-1">
<strong>臨床への応用</strong>
<span class="ml-4 text-orange-600">10分</span>
</div>
</div>

<div class="bg-gray-50 p-4 rounded-lg flex items-center">
<div class="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
<div class="flex-1">
<strong>まとめと次回予告</strong>
<span class="ml-4 text-gray-600">10分</span>
</div>
</div>
</div>

---
layout: section
---

# Part 1
## DNA損傷のメカニズム
### 放射線による細胞死の起点

---

# 放射線の生物学的効果の起点

***

<div class="mt-6"></div>

<div class="text-center mb-8">
<div class="text-2xl font-semibold mb-6">
放射線はどのように細胞を殺すのか？
</div>

<div class="flex justify-center items-center space-x-6 text-xl">
<div class="bg-blue-100 p-4 rounded-lg">
<mdi-radioactive class="text-4xl text-blue-600 mb-2" />
<div>放射線</div>
</div>
<mdi-arrow-right class="text-3xl text-gray-400" />
<div class="bg-red-100 p-4 rounded-lg">
<mdi-dna class="text-4xl text-red-600 mb-2" />
<div>DNA損傷</div>
</div>
<mdi-arrow-right class="text-3xl text-gray-400" />
<div class="bg-gray-100 p-4 rounded-lg">
<mdi-skull class="text-4xl text-gray-600 mb-2" />
<div>細胞死</div>
</div>
</div>
</div>

<div class="mt-8 bg-yellow-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-yellow-700">
<mdi-help-circle class="inline mr-2" />
なぜDNAが標的なのか？
</h3>
<div class="text-lg space-y-2">
<div>• DNA = 細胞の設計図</div>
<div>• DNA損傷 → 細胞は正常に機能・分裂できない</div>
<div>• 特に分裂が速い細胞（がん細胞）は影響を受けやすい</div>
</div>
</div>

---

# 直接作用 (Direct Effect)

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-blue-600">
<mdi-flash class="inline mr-2" />
メカニズム
</h3>

<div class="space-y-4">
<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold mb-2">定義</div>
<div class="text-base">
放射線がDNA分子を<br>
直接電離・励起する
</div>
</div>

<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold mb-2">プロセス</div>
<div class="text-base">
X線/γ線の光子が<br>
DNA分子に直接衝突<br>
↓<br>
DNA鎖の切断
</div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-red-600">
<mdi-chart-pie class="inline mr-2" />
特徴
</h3>

<div class="space-y-4">
<div class="bg-red-50 p-4 rounded-lg">
<div class="font-semibold mb-2">寄与率</div>
<div class="text-2xl font-bold text-red-600">
約30%
</div>
<div class="text-base mt-2">
（X線・γ線の場合）
</div>
</div>

<div class="bg-orange-50 p-4 rounded-lg">
<div class="font-semibold mb-2">臨床的注意点</div>
<div class="text-base">
高LET放射線<br>
（重粒子線、陽子線）<br>
では直接作用の割合が高い
</div>
</div>
</div>
</div>
</div>

<div class="absolute bottom-4 left-4">
<mdi-radioactive class="text-6xl text-blue-200" />
</div>

---

# 間接作用 (Indirect Effect)

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-green-600">
<mdi-water class="inline mr-2" />
メカニズム
</h3>

<div class="bg-green-50 p-5 rounded-lg">
<div class="font-semibold mb-3">化学反応の流れ</div>
<div class="text-base space-y-3">
<div class="bg-white p-3 rounded">
<strong>1. 水の電離</strong><br>
H₂O → H₂O⁺ + e⁻
</div>
<div class="bg-white p-3 rounded">
<strong>2. ラジカル生成</strong><br>
H₂O⁺ → OH• + H⁺<br>
<span class="text-red-600">（ヒドロキシルラジカル）</span>
</div>
<div class="bg-white p-3 rounded">
<strong>3. DNA損傷</strong><br>
OH• + DNA → DNA損傷
</div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-purple-600">
<mdi-chart-box class="inline mr-2" />
重要性
</h3>

<div class="space-y-4">
<div class="bg-purple-50 p-4 rounded-lg">
<div class="font-semibold mb-2">寄与率</div>
<div class="text-3xl font-bold text-purple-600">
約70%
</div>
<div class="text-base mt-2">
X線・γ線治療の主要メカニズム
</div>
</div>

<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold mb-2">なぜ主要なのか？</div>
<div class="text-base">
• 人体の<strong>70%は水</strong><br>
• 水分子が電離されやすい<br>
• 活性酸素種（ROS）が大量生成
</div>
</div>
</div>
</div>
</div>

<div class="mt-6 text-center bg-yellow-50 p-4 rounded-lg">
<mdi-lightbulb class="inline mr-2 text-yellow-600" />
<strong>Key Point:</strong> 間接作用が放射線治療の主要メカニズム
</div>

---

# DNA損傷の種類

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-blue-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-blue-700">
<mdi-link-variant class="inline mr-2" />
一本鎖切断 (SSB)
</h3>
<div class="text-base space-y-2">
<div>• Single Strand Break</div>
<div>• DNA二重らせんの片方が切断</div>
<div>• <strong class="text-green-600">修復可能</strong></div>
<div>• 影響は比較的軽微</div>
</div>
</div>

<div class="bg-red-50 p-5 rounded-lg border-2 border-red-300">
<h3 class="text-lg font-semibold mb-3 text-red-700">
<mdi-link-variant-off class="inline mr-2" />
二本鎖切断 (DSB)
</h3>
<div class="text-base space-y-2">
<div>• Double Strand Break</div>
<div>• DNA二重らせんの両方が切断</div>
<div>• <strong class="text-red-600">修復困難</strong></div>
<div>• <strong class="text-red-600">致死的損傷</strong></div>
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-green-700">
<mdi-alpha-b-circle class="inline mr-2" />
塩基損傷
</h3>
<div class="text-base space-y-2">
<div>• DNA塩基の化学的変化</div>
<div>• 点変異の原因</div>
<div>• 遺伝情報のエラー</div>
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-purple-700">
<mdi-link class="inline mr-2" />
DNA-DNA架橋
</h3>
<div class="text-base space-y-2">
<div>• DNA鎖同士が結合</div>
<div>• DNA複製の阻害</div>
<div>• 細胞分裂の停止</div>
</div>
</div>
</div>

<div class="mt-6 text-center bg-red-50 p-4 rounded-lg border-2 border-red-300">
<mdi-alert class="inline mr-2 text-red-600" />
<strong class="text-red-600">最も重要:</strong> 二本鎖切断（DSB）が最も致死的な損傷
</div>

---

# DNA損傷から細胞死へ

***

<div class="mt-6"></div>

<div class="mb-8">
<h3 class="text-xl font-semibold mb-4 text-center text-blue-600">
細胞死に至るプロセス
</h3>

<div class="flex justify-center items-center space-x-4 text-lg">
<div class="bg-red-100 p-3 rounded">DNA損傷</div>
<mdi-arrow-right class="text-2xl" />
<div class="bg-orange-100 p-3 rounded">修復試行</div>
<mdi-arrow-right class="text-2xl" />
<div class="bg-yellow-100 p-3 rounded">修復失敗</div>
<mdi-arrow-right class="text-2xl" />
<div class="bg-blue-100 p-3 rounded">細胞周期停止</div>
<mdi-arrow-right class="text-2xl" />
<div class="bg-gray-100 p-3 rounded">細胞死</div>
</div>
</div>

<div class="grid grid-cols-3 gap-6">
<div class="bg-purple-50 p-5 rounded-lg">
<h4 class="font-semibold mb-3 text-purple-700">
<mdi-death-star class="inline mr-2" />
アポトーシス
</h4>
<div class="text-base">
プログラム細胞死<br>
秩序だった細胞の自己分解
</div>
</div>

<div class="bg-orange-50 p-5 rounded-lg">
<h4 class="font-semibold mb-3 text-orange-700">
<mdi-fire class="inline mr-2" />
壊死 (Necrosis)
</h4>
<div class="text-base">
細胞膜の破壊<br>
炎症反応を伴う
</div>
</div>

<div class="bg-red-50 p-5 rounded-lg border-2 border-red-300">
<h4 class="font-semibold mb-3 text-red-700">
<mdi-cellphone-off class="inline mr-2" />
分裂死
</h4>
<div class="text-base">
Mitotic catastrophe<br>
<strong class="text-red-600">放射線治療で最も重要</strong>
</div>
</div>
</div>

<div class="mt-6 bg-green-50 p-5 rounded-lg">
<h4 class="font-semibold mb-2 text-green-700">
<mdi-hospital class="inline mr-2" />
臨床的意義
</h4>
<div class="text-lg">
がん細胞は<strong>分裂が速い</strong> → <strong class="text-red-600">分裂死</strong>しやすい
</div>
</div>

---
layout: section
---

# Part 2
## 放射線感受性
### なぜ細胞によって放射線の効きやすさが違うのか？

---

# 放射線感受性とは

***

<div class="mt-8"></div>

<div class="text-center mb-8">
<div class="text-2xl font-semibold mb-4 text-blue-600">
放射線によって細胞が死にやすさ
</div>
</div>

<div class="grid grid-cols-2 gap-8">
<div class="bg-red-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-red-700">
<mdi-arrow-up-bold class="inline mr-2" />
高感受性細胞
</h3>
<div class="text-lg space-y-3">
<div class="bg-white p-3 rounded">
<strong>特徴:</strong> 少ない線量で死ぬ
</div>
<div class="text-base">
• 治療に有利<br>
• 低線量で効果あり<br>
• 副作用も出やすい（正常組織の場合）
</div>
</div>
</div>

<div class="bg-blue-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-arrow-down-bold class="inline mr-2" />
低感受性細胞
</h3>
<div class="text-lg space-y-3">
<div class="bg-white p-3 rounded">
<strong>特徴:</strong> 多くの線量が必要
</div>
<div class="text-base">
• 治療に不利<br>
• 高線量が必要<br>
• 正常組織は守られやすい
</div>
</div>
</div>
</div>

<div class="mt-8 text-center bg-yellow-50 p-4 rounded-lg">
<mdi-lightbulb class="inline mr-2 text-yellow-600" />
<strong>重要:</strong> この感受性の違いを利用するのが放射線治療の基本戦略
</div>

---

# Bergonié-Tribondeau の法則 (1906)

***

<div class="mt-6"></div>

<div class="bg-blue-50 p-6 rounded-lg mb-6">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-book-open-variant class="inline mr-2" />
放射線感受性が高い細胞の3つの特徴
</h3>

<div class="grid grid-cols-3 gap-4 text-lg">
<div class="bg-white p-4 rounded text-center">
<div class="text-3xl mb-2">📈</div>
<div class="font-semibold">1. 分裂が活発</div>
</div>
<div class="bg-white p-4 rounded text-center">
<div class="text-3xl mb-2">🔬</div>
<div class="font-semibold">2. 分化度が低い</div>
</div>
<div class="bg-white p-4 rounded text-center">
<div class="text-3xl mb-2">🔄</div>
<div class="font-semibold">3. 将来の分裂回数が多い</div>
</div>
</div>
</div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-red-50 p-5 rounded-lg">
<h4 class="font-semibold mb-3 text-red-700">
<mdi-arrow-up class="inline mr-2" />
高感受性細胞の例
</h4>
<div class="text-base space-y-2">
<div>• 造血細胞（骨髄）</div>
<div>• 生殖細胞（精巣・卵巣）</div>
<div>• 腸管上皮細胞</div>
<div>• リンパ球</div>
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<h4 class="font-semibold mb-3 text-green-700">
<mdi-arrow-down class="inline mr-2" />
低感受性細胞の例
</h4>
<div class="text-base space-y-2">
<div>• 神経細胞</div>
<div>• 筋肉細胞</div>
<div>• 骨細胞</div>
<div>• 軟骨細胞</div>
</div>
</div>
</div>

<div class="mt-4 text-center text-sm text-gray-600">
<mdi-history class="inline mr-1" />
100年以上前の法則が今も臨床で有効
</div>

---

# 細胞周期と放射線感受性

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-blue-600">
<mdi-refresh-circle class="inline mr-2" />
細胞周期の各期
</h3>

<div class="space-y-3">
<div class="bg-red-50 p-4 rounded-lg border-2 border-red-300">
<div class="font-semibold text-red-700">M期（分裂期）</div>
<div class="text-base mt-2">
<strong class="text-red-600">最も感受性が高い</strong><br>
染色体が凝縮、DNA修復困難
</div>
</div>

<div class="bg-orange-50 p-4 rounded-lg">
<div class="font-semibold text-orange-700">G2/M境界</div>
<div class="text-base mt-2">
感受性が高い<br>
分裂準備期
</div>
</div>

<div class="bg-green-50 p-4 rounded-lg">
<div class="font-semibold text-green-700">S期（DNA合成期）</div>
<div class="text-base mt-2">
<strong class="text-green-600">最も抵抗性が高い</strong><br>
修復機構が活発
</div>
</div>

<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold text-blue-700">G1期（準備期）</div>
<div class="text-base mt-2">
中程度の感受性
</div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-purple-600">
<mdi-chart-line class="inline mr-2" />
感受性の変化
</h3>

<div class="bg-purple-50 p-6 rounded-lg mb-4">
<div class="text-center text-lg font-semibold mb-3">
感受性の順序
</div>
<div class="text-2xl text-center font-bold text-purple-700">
M期 > G2/M > G1 > S期
</div>
</div>

<div class="bg-yellow-50 p-5 rounded-lg">
<div class="font-semibold mb-2 text-yellow-700">
<mdi-lightbulb class="inline mr-2" />
臨床的意義
</div>
<div class="text-base">
• M期の細胞が最も放射線に弱い<br>
• がん細胞は分裂が速い → M期が多い<br>
• この特性を利用した治療戦略
</div>
</div>
</div>
</div>

---

# がん細胞 vs 正常細胞

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div class="bg-red-50 p-6 rounded-lg border-2 border-red-300">
<h3 class="text-xl font-semibold mb-4 text-red-700">
<mdi-cancer class="inline mr-2" />
がん細胞の特徴
</h3>

<div class="space-y-3 text-base">
<div class="bg-white p-3 rounded">
<strong>分裂速度</strong><br>
<mdi-arrow-up class="inline text-red-600" /> 速い → 感受性が高い
</div>

<div class="bg-white p-3 rounded">
<strong>DNA修復能力</strong><br>
<mdi-arrow-down class="inline text-red-600" /> 低下している場合が多い
</div>

<div class="bg-white p-3 rounded">
<strong>酸素環境</strong><br>
<mdi-alert class="inline text-orange-600" /> 低酸素領域が存在
</div>

<div class="bg-red-100 p-3 rounded">
<strong>結果</strong><br>
放射線に<strong class="text-red-600">弱い</strong>
</div>
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg border-2 border-green-300">
<h3 class="text-xl font-semibold mb-4 text-green-700">
<mdi-human class="inline mr-2" />
正常細胞の特徴
</h3>

<div class="space-y-3 text-base">
<div class="bg-white p-3 rounded">
<strong>分裂速度</strong><br>
<mdi-arrow-down class="inline text-green-600" /> 遅い（または分裂しない）
</div>

<div class="bg-white p-3 rounded">
<strong>DNA修復能力</strong><br>
<mdi-check class="inline text-green-600" /> 正常
</div>

<div class="bg-white p-3 rounded">
<strong>酸素環境</strong><br>
<mdi-check-circle class="inline text-green-600" /> 酸素供給が良好
</div>

<div class="bg-green-100 p-3 rounded">
<strong>結果</strong><br>
放射線に<strong class="text-green-600">強い</strong>
</div>
</div>
</div>
</div>

<div class="mt-6 bg-blue-50 p-5 rounded-lg">
<h4 class="font-semibold mb-2 text-blue-700">
<mdi-hospital class="inline mr-2" />
臨床例
</h4>
<div class="text-lg">
悪性リンパ腫は急速に増殖 → 放射線感受性が非常に高い → 低線量（30-40 Gy）でも効果あり
</div>
</div>

---
layout: section
---

# Part 3
## 分割照射の4つのR
### なぜ毎日少しずつ照射するのか？

---

# 分割照射とは

***

<div class="mt-8"></div>

<div class="bg-blue-50 p-6 rounded-lg mb-8">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-calendar-month class="inline mr-2" />
定義
</h3>
<div class="text-lg">
総線量を複数回に分けて照射する方法
</div>
</div>

<div class="grid grid-cols-2 gap-8 mb-8">
<div class="bg-green-50 p-6 rounded-lg">
<h4 class="font-semibold mb-3 text-green-700">標準的なスケジュール</h4>
<div class="text-3xl font-bold text-green-600 mb-2">2 Gy × 30回</div>
<div class="text-xl">= 60 Gy</div>
<div class="text-base mt-3">期間: 6週間（週5回）</div>
</div>

<div class="bg-red-50 p-6 rounded-lg">
<h4 class="font-semibold mb-3 text-red-700">なぜ一度に照射しないのか？</h4>
<div class="text-lg">
一度に60 Gyを照射すると<br>
<strong class="text-red-600">正常組織が重篤な障害を受ける</strong>
</div>
</div>
</div>

<div class="text-center">
<div class="text-2xl font-bold text-purple-600 mb-4">
この疑問の答えが
</div>
<div class="text-3xl font-bold text-blue-600">
4つのR
</div>
</div>

---

# 分割照射の4つのR

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-blue-50 p-6 rounded-lg">
<div class="text-4xl mb-3 text-center">🔧</div>
<h3 class="text-xl font-semibold mb-3 text-blue-700 text-center">
Repair（修復）
</h3>
<div class="text-base text-center">
正常組織のDNA修復
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg">
<div class="text-4xl mb-3 text-center">🔄</div>
<h3 class="text-xl font-semibold mb-3 text-green-700 text-center">
Redistribution（再分布）
</h3>
<div class="text-base text-center">
細胞周期の再分布
</div>
</div>

<div class="bg-purple-50 p-6 rounded-lg">
<div class="text-4xl mb-3 text-center">📈</div>
<h3 class="text-xl font-semibold mb-3 text-purple-700 text-center">
Repopulation（再増殖）
</h3>
<div class="text-base text-center">
正常組織の再生
</div>
</div>

<div class="bg-orange-50 p-6 rounded-lg">
<div class="text-4xl mb-3 text-center">💨</div>
<h3 class="text-xl font-semibold mb-3 text-orange-700 text-center">
Reoxygenation（再酸素化）
</h3>
<div class="text-base text-center">
腫瘍の酸素化改善
</div>
</div>
</div>

<div class="mt-8 text-center bg-yellow-50 p-5 rounded-lg">
<mdi-lightbulb class="inline mr-2 text-yellow-600" />
<strong class="text-xl">これら4つのRが相乗的に作用し、治療効果を最大化する</strong>
</div>

---

# R1 - Repair（修復）

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-blue-600">
<mdi-wrench class="inline mr-2" />
メカニズム
</h3>

<div class="space-y-4">
<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold mb-2">正常組織</div>
<div class="text-base">
<mdi-check-circle class="inline text-green-600" /> 修復能力が高い<br>
照射後<strong>6-24時間</strong>でDNA損傷を修復
</div>
</div>

<div class="bg-red-50 p-4 rounded-lg">
<div class="font-semibold mb-2">がん細胞</div>
<div class="text-base">
<mdi-close-circle class="inline text-red-600" /> 修復能力が低い<br>
修復エラーが多い → ダメージが蓄積
</div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-green-600">
<mdi-chart-timeline-variant class="inline mr-2" />
分割照射の利点
</h3>

<div class="bg-green-50 p-5 rounded-lg mb-4">
<div class="font-semibold mb-3">正常組織への恩恵</div>
<div class="text-base space-y-2">
<div>• 照射後に修復時間を与える</div>
<div>• 次回照射までに回復</div>
<div>• 累積的な障害を軽減</div>
</div>
</div>

<div class="bg-orange-50 p-5 rounded-lg">
<div class="font-semibold mb-3">臨床例</div>
<div class="text-base">
<strong>晩期反応組織</strong>（脊髄、肺）<br>
→ 修復が遅い<br>
→ 1回線量を下げる必要
</div>
</div>
</div>
</div>

<div class="mt-6 text-center bg-red-50 p-4 rounded-lg border-2 border-red-300">
<mdi-star class="inline mr-2 text-red-600" />
<strong class="text-red-600">これが分割照射の最も重要な理由</strong>
</div>

---

# R2 - Redistribution（再分布）

***

<div class="mt-6"></div>

<div class="mb-6">
<h3 class="text-xl font-semibold mb-4 text-center text-purple-600">
細胞周期の再分布による感受性の変化
</h3>
</div>

<div class="space-y-4">
<div class="bg-blue-50 p-5 rounded-lg">
<div class="flex items-center mb-3">
<div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
<div class="font-semibold text-lg">照射直後</div>
</div>
<div class="text-base ml-16">
M期の細胞が死ぬ → S期の細胞（抵抗性）が生き残る
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<div class="flex items-center mb-3">
<div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
<div class="font-semibold text-lg">照射後6-12時間</div>
</div>
<div class="text-base ml-16">
S期の細胞がG2/M期に移行 → より感受性の高い時期へ
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<div class="flex items-center mb-3">
<div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
<div class="font-semibold text-lg">次回照射時</div>
</div>
<div class="text-base ml-16">
より感受性の高い時期に照射できる → 効果的に殺せる
</div>
</div>
</div>

<div class="mt-6 bg-yellow-50 p-5 rounded-lg">
<h4 class="font-semibold mb-2 text-yellow-700">
<mdi-lightbulb class="inline mr-2" />
臨床的意義
</h4>
<div class="text-lg">
<strong>1日1回照射</strong>が効果的な理由 → 細胞周期の再分布に最適な間隔
</div>
</div>

---

# R3 - Repopulation（再増殖）

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-green-600">
<mdi-sprout class="inline mr-2" />
正常組織の再生
</h3>

<div class="space-y-4">
<div class="bg-green-50 p-4 rounded-lg">
<div class="font-semibold mb-2">メカニズム</div>
<div class="text-base">
照射で損傷を受けた正常組織が<br>
治療期間中に再生する
</div>
</div>

<div class="bg-blue-50 p-4 rounded-lg">
<div class="font-semibold mb-2">再生が速い組織</div>
<div class="text-base space-y-1">
<div>• 皮膚</div>
<div>• 粘膜</div>
<div>• 骨髄</div>
</div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-orange-600">
<mdi-calendar-alert class="inline mr-2" />
治療期間の重要性
</h3>

<div class="space-y-4">
<div class="bg-orange-50 p-4 rounded-lg">
<div class="font-semibold mb-2">重要なポイント</div>
<div class="text-base">
がん細胞も再増殖するが、<br>
<strong class="text-green-600">正常組織の方が速い</strong>
</div>
</div>

<div class="bg-red-50 p-4 rounded-lg border-2 border-red-300">
<div class="font-semibold mb-2 text-red-700">
<mdi-alert class="inline mr-1" />
治療中断のリスク
</div>
<div class="text-base">
• 治療が長すぎる → がん細胞も再増殖<br>
• 標準: <strong>6週間（30回）</strong><br>
• 中断は<strong class="text-red-600">局所制御率を下げる</strong>
</div>
</div>
</div>
</div>
</div>

<div class="mt-6 bg-blue-50 p-5 rounded-lg">
<h4 class="font-semibold mb-2 text-blue-700">
<mdi-hospital class="inline mr-2" />
臨床例
</h4>
<div class="text-lg">
口腔粘膜炎は2-3週間で治癒開始 → 治療継続が可能
</div>
</div>

---

# R4 - Reoxygenation（再酸素化）

***

<div class="mt-6"></div>

<div class="mb-6 bg-blue-50 p-5 rounded-lg">
<h3 class="text-xl font-semibold mb-3 text-blue-700">
<mdi-air-filter class="inline mr-2" />
酸素効果 (Oxygen Effect)
</h3>
<div class="text-lg space-y-2">
<div>• 酸素がある → 放射線感受性が<strong class="text-red-600">2-3倍高い</strong></div>
<div>• 低酸素 → 放射線抵抗性</div>
<div>• 理由: 酸素がDNA損傷を固定化（Oxygen Fixation）</div>
</div>
</div>

<div class="grid grid-cols-2 gap-8">
<div>
<h3 class="text-xl font-semibold mb-4 text-orange-600">
<mdi-help-circle class="inline mr-2" />
腫瘍内の低酸素領域
</h3>

<div class="bg-orange-50 p-5 rounded-lg">
<div class="font-semibold mb-3">問題点</div>
<div class="text-base space-y-2">
<div>• 腫瘍は血管新生が不十分</div>
<div>• 低酸素領域が存在</div>
<div>• 低酸素細胞は<strong class="text-red-600">放射線抵抗性</strong></div>
</div>
</div>
</div>

<div>
<h3 class="text-xl font-semibold mb-4 text-green-600">
<mdi-refresh class="inline mr-2" />
再酸素化のメカニズム
</h3>

<div class="space-y-3 text-base">
<div class="bg-green-50 p-3 rounded">
<strong>1.</strong> 照射で酸素化された腫瘍細胞が死ぬ
</div>
<div class="bg-green-50 p-3 rounded">
<strong>2.</strong> 腫瘍縮小 → 血流改善
</div>
<div class="bg-green-50 p-3 rounded">
<strong>3.</strong> 低酸素領域が減少 → 次回照射時により効果的
</div>
</div>
</div>
</div>

<div class="mt-6 bg-purple-50 p-5 rounded-lg">
<h4 class="font-semibold mb-2 text-purple-700">
<mdi-hospital class="inline mr-2" />
臨床例
</h4>
<div class="text-lg">
頭頸部がん（低酸素領域が多い）→ 分割照射が特に有効
</div>
</div>

---

# 4つのRのまとめ

***

<div class="mt-6"></div>

<div class="mb-8">
<h3 class="text-2xl font-semibold mb-6 text-center text-blue-600">
4つのRは相乗的に作用する
</h3>

<div class="grid grid-cols-4 gap-4 text-center">
<div class="bg-blue-50 p-4 rounded-lg">
<div class="text-3xl mb-2">🔧</div>
<div class="font-semibold">Repair</div>
</div>
<div class="bg-green-50 p-4 rounded-lg">
<div class="text-3xl mb-2">🔄</div>
<div class="font-semibold">Redistribution</div>
</div>
<div class="bg-purple-50 p-4 rounded-lg">
<div class="text-3xl mb-2">📈</div>
<div class="font-semibold">Repopulation</div>
</div>
<div class="bg-orange-50 p-4 rounded-lg">
<div class="text-3xl mb-2">💨</div>
<div class="font-semibold">Reoxygenation</div>
</div>
</div>
</div>

<div class="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
<h3 class="text-xl font-semibold mb-4 text-yellow-700 text-center">
<mdi-scale-balance class="inline mr-2" />
治療比の向上 (Therapeutic Ratio)
</h3>

<div class="grid grid-cols-2 gap-6 text-lg">
<div class="bg-white p-4 rounded text-center">
<div class="text-green-600 font-bold text-2xl mb-2">↑</div>
<div class="font-semibold">腫瘍制御</div>
</div>
<div class="bg-white p-4 rounded text-center">
<div class="text-red-600 font-bold text-2xl mb-2">↓</div>
<div class="font-semibold">正常組織障害</div>
</div>
</div>
</div>

<div class="mt-8 text-center text-xl font-bold text-blue-600">
分割照射は生物学的に合理的な戦略
</div>

---
layout: section
---

# Part 4
## 臨床への応用
### 生物学的知識を治療に活かす

---

# 正常組織の保護戦略

***

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-blue-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-blue-700">
<mdi-numeric-1-circle class="inline mr-2" />
分割照射（4つのR）
</h3>
<div class="text-base">
• 正常組織に修復時間を与える<br>
• 標準: 2 Gy/回、週5回
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-green-700">
<mdi-numeric-2-circle class="inline mr-2" />
照射野の最適化
</h3>
<div class="text-base">
• IMRT（強度変調放射線治療）<br>
• VMAT（回転照射）<br>
• 陽子線・重粒子線
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-purple-700">
<mdi-numeric-3-circle class="inline mr-2" />
臓器の耐容線量
</h3>
<div class="text-base">
• 脊髄: <strong>45-50 Gy</strong><br>
• 肺: 平均線量 <strong>20 Gy以下</strong><br>
• 心臓: 平均線量 <strong>26 Gy以下</strong>
</div>
</div>

<div class="bg-orange-50 p-5 rounded-lg">
<h3 class="text-lg font-semibold mb-3 text-orange-700">
<mdi-numeric-4-circle class="inline mr-2" />
時間的保護
</h3>
<div class="text-base">
• 1回線量の調整<br>
• 治療休止（必要な場合）<br>
• 照射間隔の最適化
</div>
</div>
</div>

<div class="mt-6 bg-red-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-red-700">
<mdi-hospital class="inline mr-2" />
臨床例
</h3>
<div class="text-lg space-y-2">
<div>• 肺がん治療時の肺線量制約 → 放射線肺臓炎の予防</div>
<div>• 脊髄近傍の腫瘍 → 線量制限で脊髄障害を回避</div>
</div>
</div>

---

# 治療プロトコルの設計根拠

***

<div class="mt-6"></div>

<div class="mb-6 bg-blue-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-calendar-check class="inline mr-2" />
標準的分割照射
</h3>
<div class="text-2xl font-bold mb-3">2 Gy/回、週5回、6週間</div>

<div class="grid grid-cols-4 gap-3 text-base">
<div class="bg-white p-3 rounded">
<strong>Repair</strong><br>
24時間で修復
</div>
<div class="bg-white p-3 rounded">
<strong>Redistribution</strong><br>
6-12時間で再分布
</div>
<div class="bg-white p-3 rounded">
<strong>Repopulation</strong><br>
週末休みで再生
</div>
<div class="bg-white p-3 rounded">
<strong>Reoxygenation</strong><br>
照射毎に改善
</div>
</div>
</div>

<div class="grid grid-cols-2 gap-6">
<div class="bg-green-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-green-700">
寡分割照射 (Hypofractionation)
</h3>
<div class="text-base space-y-2">
<div><strong>特徴:</strong> 大きい線量、少ない回数</div>
<div><strong>例:</strong> 前立腺がん、乳がん術後</div>
<div><strong>根拠:</strong> α/β比が低い腫瘍に有効</div>
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-purple-700">
過分割照射 (Hyperfractionation)
</h3>
<div class="text-base space-y-2">
<div><strong>特徴:</strong> 小さい線量、多い回数</div>
<div><strong>例:</strong> 頭頸部がん</div>
<div><strong>根拠:</strong> 加速再増殖を防ぐ</div>
</div>
</div>
</div>

<div class="mt-6 text-center bg-yellow-50 p-4 rounded-lg">
<mdi-lightbulb class="inline mr-2 text-yellow-600" />
<strong>すべてのプロトコルに生物学的根拠がある</strong>
</div>

---
layout: section
---

# まとめ
## 核心的問いへの回答

---

# 核心的問いへの回答

***

<div class="mt-6"></div>

<div class="space-y-8">
<div class="bg-red-50 p-6 rounded-lg border-2 border-red-300">
<h3 class="text-2xl font-semibold mb-4 text-red-700 text-center">
「なぜ放射線はがん細胞を殺せるのか？」
</h3>

<div class="text-lg space-y-3">
<div class="bg-white p-4 rounded">
<strong>1.</strong> 放射線がDNAを損傷（直接作用30% + 間接作用70%）
</div>
<div class="bg-white p-4 rounded">
<strong>2.</strong> がん細胞は分裂が速く、修復能力が低い → 感受性が高い
</div>
<div class="bg-white p-4 rounded">
<strong>3.</strong> DNA損傷 → 修復失敗 → 分裂死により細胞死
</div>
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg border-2 border-green-300">
<h3 class="text-2xl font-semibold mb-4 text-green-700 text-center">
「なぜ正常細胞は守られるのか？」
</h3>

<div class="text-lg space-y-3">
<div class="bg-white p-4 rounded">
<strong>1.</strong> 4つのR（Repair, Redistribution, Repopulation, Reoxygenation）
</div>
<div class="bg-white p-4 rounded">
<strong>2.</strong> 分割照射により正常組織に修復・再生の時間を与える
</div>
<div class="bg-white p-4 rounded">
<strong>3.</strong> がん細胞との生物学的差を最大化 → 治療比の向上
</div>
</div>
</div>
</div>

---

# 学習目標の確認

***

<div class="mt-8"></div>

<div class="grid grid-cols-2 gap-6 text-lg">
<div class="bg-blue-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-blue-700">
<mdi-check-circle class="inline mr-2 text-green-600" />
DNA損傷メカニズム
</h3>
<div class="text-base">
✓ 直接作用と間接作用を説明できる<br>
✓ DNA損傷が細胞死につながる理由を理解
</div>
</div>

<div class="bg-green-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-green-700">
<mdi-check-circle class="inline mr-2 text-green-600" />
放射線感受性
</h3>
<div class="text-base">
✓ 細胞周期と感受性の関係を理解<br>
✓ がん細胞と正常細胞の違いを説明できる
</div>
</div>

<div class="bg-purple-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-purple-700">
<mdi-check-circle class="inline mr-2 text-green-600" />
分割照射の4つのR
</h3>
<div class="text-base">
✓ 4つのRを説明できる<br>
✓ 分割照射の生物学的根拠を理解
</div>
</div>

<div class="bg-orange-50 p-5 rounded-lg">
<h3 class="font-semibold mb-3 text-orange-700">
<mdi-check-circle class="inline mr-2 text-green-600" />
臨床への応用
</h3>
<div class="text-base">
✓ 正常組織保護戦略を理解<br>
✓ 治療プロトコルの設計根拠を説明できる
</div>
</div>
</div>

<div class="mt-8 text-center text-2xl font-bold text-blue-600">
お疲れさまでした！
</div>

---

# 次回予告

***

<div class="mt-8"></div>

<div class="text-center mb-8">
<h2 class="text-3xl font-bold mb-6 text-blue-600">
<mdi-cube-outline class="inline mr-3" />
第3回：放射線治療の体積
</h2>

<div class="text-xl mb-6">
標的体積の定義と線量処方
</div>
</div>

<div class="grid grid-cols-2 gap-8">
<div class="bg-blue-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-blue-700">
<mdi-target class="inline mr-2" />
学習内容
</h3>
<div class="text-base space-y-2">
<div>• GTV、CTV、PTVの定義</div>
<div>• なぜマージンが必要か</div>
<div>• リスク臓器の設定</div>
<div>• 線量処方の考え方</div>
</div>
</div>

<div class="bg-green-50 p-6 rounded-lg">
<h3 class="text-xl font-semibold mb-4 text-green-700">
<mdi-book-open class="inline mr-2" />
準備
</h3>
<div class="text-base space-y-2">
<div>• 解剖学の復習（特に胸部・骨盤）</div>
<div>• CT画像の見方を確認</div>
<div>• 今日の4つのRを復習</div>
</div>
</div>
</div>

<div class="mt-8 text-center text-lg text-gray-600">
次回もお楽しみに！
</div>

---

# 質疑応答

***

<div class="mt-12"></div>

<div class="text-center">
<div class="text-4xl mb-8">
<mdi-comment-question class="text-blue-500" />
</div>

<div class="text-2xl font-semibold mb-8">
ご質問はありますか？
</div>

<div class="text-lg text-gray-600">
どんな質問でも歓迎します
</div>
</div>

<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
<div class="text-sm text-gray-500">
放射線治療技術学概論 第2回講義
</div>
</div>
