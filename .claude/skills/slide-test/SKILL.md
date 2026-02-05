---
name: slide-test
description: Playwright MCPを使用してSlidevスライドを自動テストし、レイアウト崩れやエラーを検出・修正する
tools: [Read, Write, Edit, Bash, Glob, Task, mcp__playwright__*]
---

# Slidev スライド自動テスト

**引数:**
- （なし）: 現在の `slides.md` をテスト
- ファイルパス: 指定されたスライドファイルをテスト
- `--no-fix`: 自動修正をスキップ（検出のみ）
- `--screenshot-all`: エラーがなくても全スライドのスクリーンショットを保存

**例:**
- `/slide-test` - メインスライドファイルをテスト
- `/slide-test pages/flowchart.md` - 特定ファイルをテスト
- `/slide-test --no-fix` - 検出のみ、修正なし
- `/slide-test --screenshot-all` - 全スライドのスクリーンショット保存

このスキルは、Playwright MCPを使用してSlidevスライドをブラウザで自動テストし、レイアウト崩れやエラーを検出して自動修正します。

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│  Claude Code (Orchestrator)                                  │
│  → /slide-test スキルを実行                                   │
│  → Slidevサーバー起動                                         │
│  → Playwright MCPで直接テスト実行                            │
│                                                              │
│  テストフロー:                                                │
│  1. browser_navigate → localhost:3030                        │
│  2. browser_snapshot → 各スライドの状態取得                  │
│  3. browser_console_messages → エラー検出                    │
│  4. browser_take_screenshot → エラー時スクリーンショット     │
│  5. browser_press_key → 次スライドへ移動                     │
│                                                              │
│  → エラーがあれば layout-fix ロジックで自動修正              │
│  → 結果をユーザーに報告                                       │
└─────────────────────────────────────────────────────────────┘
```

## 実行フロー

### Phase 1: 準備

1. タスクコンテキストを確立:
   - 対象ファイル: 引数で指定されたスライドファイル（デフォルト: `slides.md`）
   - タイムスタンプ: YYYYMMDD-HHMMSS形式
   - レポートディレクトリ: `.claude/docs/slide-errors/reports/[タイムスタンプ]/`

2. レポートディレクトリを作成:
   ```bash
   mkdir -p .claude/docs/slide-errors/reports/[タイムスタンプ]/screenshots
   ```

3. 対象スライドファイルを読み込み、スライド総数をカウント:
   - `---` で区切られたスライド数を数える
   - frontmatter（最初の `---...---`）は除外

### Phase 2: サーバー起動

1. 既存のSlidevサーバーを確認:
   ```bash
   lsof -i :3030 2>/dev/null || true
   ```

2. サーバーが起動していない場合、バックグラウンドで起動:
   ```bash
   npm run dev &
   ```

3. サーバー起動を待機（最大30秒）:
   ```bash
   # サーバーが応答するまで待機
   for i in {1..30}; do
     curl -s http://localhost:3030 > /dev/null && break
     sleep 1
   done
   ```

### Phase 3: Playwright MCPテスト実行

**Playwright MCPツールを直接使用してテスト**

#### 3-1. ブラウザでスライドを開く

```
mcp__playwright__browser_navigate(url="http://localhost:3030")
```

#### 3-2. 各スライドをテスト

スライド数分、以下を繰り返す:

**a. ページスナップショット取得**
```
mcp__playwright__browser_snapshot()
```
→ アクセシビリティツリーを取得し、要素構造を確認

**b. コンソールメッセージ確認**
```
mcp__playwright__browser_console_messages(level="error")
```
→ JavaScriptエラー、Vueエラー、リソース読み込みエラーを検出

**c. オーバーフロー検出（CSSクリッピング対応）**

Slidev は `html`, `body`, `#app`, `#page-root` すべてに `overflow: hidden` を設定するため、
スクロールバーは生成されない。

**重要**: Slidev は全スライドの `.slidev-page` を DOM に保持するが、非表示スライドは
`scrollHeight: 0` になる。現在表示中のスライドのみが非ゼロの `scrollHeight` を持つ。

検出は **現在表示中の `.slidev-page` の `scrollHeight` と `clientHeight` を比較** する。
`window.innerHeight` ではない（テーマのpaddingで `.slidev-page` の実サイズはビューポートより小さい）。

```
mcp__playwright__browser_evaluate(function="() => {
  const pages = document.querySelectorAll('.slidev-page');
  let activePage = null;
  pages.forEach(p => { if (p.scrollHeight > 0) activePage = p; });
  if (!activePage) return { isOverflow: false, error: 'no active .slidev-page found' };
  const contentHeight = activePage.scrollHeight;
  const containerHeight = activePage.clientHeight;
  const overflowAmount = contentHeight - containerHeight;
  const isOverflow = overflowAmount > 10;
  return {
    isOverflow,
    contentHeight,
    containerHeight,
    overflowAmount,
    overflowPercent: Math.round((overflowAmount / containerHeight) * 100)
  };
}")
```

→ `isOverflow: true` の場合、`overflowAmount` (px) と `overflowPercent` (%) で深刻度を判定
→ 10px のトレランスにより、境界ぎりぎりの誤検知を防止
→ 非表示スライドは `scrollHeight: 0` なのでスキップされる

**e. エラー検出時のスクリーンショット**
エラーがあった場合:
```
mcp__playwright__browser_take_screenshot(
  filename=".claude/docs/slide-errors/reports/[タイムスタンプ]/screenshots/slide-[番号]-[エラータイプ].png",
  type="png"
)
```

**f. 次のスライドへ移動**
```
mcp__playwright__browser_press_key(key="ArrowRight")
```

#### 3-3. --screenshot-all オプション時

全スライドのスクリーンショットを保存:
```
mcp__playwright__browser_take_screenshot(
  filename=".claude/docs/slide-errors/reports/[タイムスタンプ]/screenshots/slide-[番号].png",
  type="png"
)
```

### Phase 4: 結果分析

1. テスト結果をJSONファイルに保存:

```json
{
  "timestamp": "YYYYMMDD-HHMMSS",
  "targetFile": "slides.md",
  "totalSlides": 25,
  "testedSlides": 25,
  "errors": [
    {
      "slideNumber": 3,
      "type": "overflow",
      "details": "List items overflow viewport bottom",
      "screenshot": "screenshots/slide-3-overflow.png"
    },
    {
      "slideNumber": 7,
      "type": "console_error",
      "details": "Failed to load image: ./images/missing.png",
      "screenshot": "screenshots/slide-7-error.png"
    }
  ],
  "warnings": [
    {
      "slideNumber": 12,
      "type": "scrollbar",
      "details": "Vertical scrollbar detected"
    }
  ],
  "passed": 23,
  "failed": 2
}
```

ファイル保存先: `.claude/docs/slide-errors/reports/[タイムスタンプ]/test-results.json`

2. エラー有無を判定:
   - `errors.length > 0`: 修正が必要
   - `errors.length === 0 && warnings.length > 0`: 警告のみ
   - 両方ゼロ: 成功

### Phase 5: エラーカタログ更新

検出されたエラーパターンを永続的なカタログに追記:

1. `.claude/docs/slide-errors/error-catalog.md` を読み込み

2. 新しいエラーパターンがあれば追加:
   - 既存パターンと一致する場合: 検出回数をインクリメント
   - 新しいパターンの場合: カタログに追加

3. ファイルを更新

### Phase 6: 自動修正（`--no-fix`がない場合）

エラーがある場合、`/layout-fix` スキルのロジックを活用して修正:

#### 6-1. 修正可能なエラーを特定

| エラータイプ | 修正方法 |
|-------------|----------|
| overflow (CSSクリッピング) | 段階的修正（下記参照） |
| overflow (リスト項目過多) | 段階的修正 → スライド分割 |
| overflow (テキスト過多) | 段階的修正 → テキスト要約または分割 |
| image_not_found | パス修正または画像削除 |
| layout_mismatch | レイアウト変更 |

#### 6-2. 段階的修正（オーバーフロー）

**必ずStep 1から順に試み、各Step後に再テストする。**

**Step 1: スペーシング縮小**（まず試す）
- `mt-6` → `mt-3`, `mt-8` → `mt-4`
- `mb-6` → `mb-3`, `mb-4` → `mb-2`
- `p-5` → `p-3`, `p-6` → `p-4`
- `space-y-4` → `space-y-2`, `space-y-6` → `space-y-3`
- `gap-8` → `gap-4`, `gap-6` → `gap-3`
- カード内の `mb-3` → `mb-2`, `mb-4` → `mb-2`
- 大きな円形要素: `w-12 h-12` → `w-10 h-10`

→ 修正後に再テスト。オーバーフローが解消されれば完了。

**Step 2: フォントサイズ縮小**（Step 1で不十分な場合のみ）
- `text-lg` → `text-base`
- `text-xl` → `text-lg`
- `text-2xl` → `text-xl`

→ 修正後に再テスト。オーバーフローが解消されれば完了。

→ 修正後に再テスト。オーバーフローが解消されれば完了。

**Step 3: ユーザーに判断を仰ぐ**（Step 1-2で不十分な場合）

Step 1-2 を適用してもオーバーフローが残るスライドについては、
**AskUserQuestion** でユーザーに修正方針を確認する。

```
AskUserQuestion(questions=[{
  question: "スライド{N}「{タイトル}」が{X}pxオーバーフローしています。どう修正しますか？",
  header: "Slide {N}",
  multiSelect: false,
  options: [
    { label: "さらに縮小", description: "スペーシングとフォントをさらに小さくして1枚に収める" },
    { label: "スライド分割", description: "内容を2枚のスライドに分割する（(1/2), (2/2)）" },
    { label: "スキップ", description: "このスライドは修正せず、レポートに記録のみ" }
  ]
}])
```

**ユーザー回答ごとの処理:**

- **「さらに縮小」**: 残りのスペーシング・フォントを追加縮小して再テスト
- **「スライド分割」**: コンテンツを論理的な区切りで2枚に分割し、`(1/2)`, `(2/2)` をタイトルに付加
- **「スキップ」**: 修正せず、レポートに未修正として記録

**自動修正スクリプト:**

```bash
# Step 1: スペーシング縮小
node scripts/fix-overflow.mjs slides.md {スライド番号} --step=1

# Step 2: フォントサイズ縮小
node scripts/fix-overflow.mjs slides.md {スライド番号} --step=2

# ドライラン（変更内容の確認）
node scripts/fix-overflow.mjs slides.md {スライド番号} --step=1 --dry-run
```

4. 修正後に再テストを実行（Phase 3-4を繰り返し）

#### 6-3. 修正不可能なエラー

手動修正が必要な場合はレポートに記載:
- 複雑なレイアウト問題
- コンテンツの意味的な変更が必要な場合
- 外部リソースの問題

### Phase 7: レポート生成

Markdownレポートを生成:

```markdown
# Slidev スライドテストレポート

**テスト日時:** YYYY-MM-DD HH:MM:SS
**対象ファイル:** slides.md
**総スライド数:** 25

## サマリー

| 項目 | 数 |
|------|---|
| テスト済み | 25 |
| 成功 | 23 |
| エラー | 2 |
| 警告 | 1 |

## 検出されたエラー

### スライド 3: リスト項目のオーバーフロー

- **タイプ:** overflow
- **詳細:** リスト項目がビューポート下部にはみ出し
- **スクリーンショット:** [slide-3-overflow.png](./screenshots/slide-3-overflow.png)
- **修正状況:** ✅ 自動修正済み（2スライドに分割）

### スライド 7: 画像読み込みエラー

- **タイプ:** console_error
- **詳細:** Failed to load image: ./images/missing.png
- **スクリーンショット:** [slide-7-error.png](./screenshots/slide-7-error.png)
- **修正状況:** ⚠️ 手動修正が必要（画像ファイルを確認してください）

## 警告

### スライド 12: スクロールバー検出

- **タイプ:** scrollbar
- **詳細:** 縦スクロールバーが発生
- **推奨:** コンテンツ量を削減するか、フォントサイズを調整

## 自動修正サマリー

- 修正されたスライド: 1
- 手動修正が必要: 1

## 次のステップ

1. スライド7の画像パスを確認・修正
2. スライド12のコンテンツ量を見直し
3. `npm run dev` で変更を確認
```

ファイル保存先: `.claude/docs/slide-errors/reports/[タイムスタンプ]/report.md`

### Phase 8: 完了

1. ブラウザを閉じる:
   ```
   mcp__playwright__browser_close()
   ```

2. 結果をユーザーに報告（簡潔に）:

```
📊 スライドテスト完了

対象: slides.md (25スライド)
結果: ✅ 23成功 / ⚠️ 2エラー / 💡 1警告

自動修正: 1件
手動修正が必要: 1件

詳細レポート: .claude/docs/slide-errors/reports/[タイムスタンプ]/report.md
```

## チェック項目

### 1. コンテンツはみ出し検出

- `.slidev-page.scrollHeight` が `window.innerHeight` を超えていないか（CSSクリッピング検出）
- 要素が `getBoundingClientRect` でビューポート外にはみ出していないか
- 画像やテキストがクリップされていないか

### 2. コンソールエラー検出

- JavaScript エラー
- Vue.js エラー
- リソース読み込みエラー（画像、フォント等）

### 3. レイアウト崩れ検出

- 要素の重なり
- 予期しない空白
- フォントサイズ不正

### 4. アクセシビリティ警告

- コントラスト比不足
- alt属性欠如

## 完了条件

- [ ] 対象スライドファイル読み込み完了
- [ ] Slidevサーバー起動確認
- [ ] 全スライドテスト完了
- [ ] エラー検出・記録完了
- [ ] エラーカタログ更新完了
- [ ] 自動修正実行（該当する場合）
- [ ] 再テスト実行（修正した場合）
- [ ] レポート生成完了
- [ ] ブラウザ終了
- [ ] 結果報告完了

## エラーパターンと修正方法

### オーバーフロー系

| パターン | 検出方法 | 修正方法 |
|---------|----------|----------|
| CSSクリッピング | `.slidev-page.scrollHeight > window.innerHeight` | 段階的修正（スペーシング→フォント→分割） |
| リスト項目過多 | 同上 | 段階的修正 → スライド分割 |
| テキスト過多 | 同上 | 段階的修正 → 要約または分割 |
| 画像が大きすぎ | `getBoundingClientRect` で右側はみ出し | サイズ調整または two-cols |

### コンソールエラー系

| パターン | 検出方法 | 修正方法 |
|---------|----------|----------|
| 画像読み込み失敗 | 404エラー | パス修正または削除 |
| Vue コンポーネントエラー | Vue警告 | コンポーネント修正 |
| JavaScript エラー | JS例外 | コード修正 |

### レイアウト系

| パターン | 検出方法 | 修正方法 |
|---------|----------|----------|
| タイトル間隔不足 | 静的解析 | `***` + `mt-5` 追加 |
| フォントサイズ不足 | 静的解析 | `text-xl` クラス追加 |

## 参照ドキュメント

- `.claude/docs/slide-errors/error-catalog.md`: 永続的エラーカタログ
- `.claude/skills/layout-fix/SKILL.md`: レイアウト修正ロジック
- `.claude/docs/style-guide.md`: スタイルガイド
- `.claude/format/layout-patterns.md`: レイアウトパターン集
