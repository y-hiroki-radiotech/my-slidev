---
name: create-quiz
description: 過去の講義スライドから確認テスト（クイズ）を自動生成し、解答付きMarkdownとPDFを出力する
tools: [Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion]
---

# 講義からの確認テスト自動生成

**引数:** なし（対話形式で講義を選択）

このスキルは、`previous_lecture/` にアーカイブされた講義スライドから確認テスト（クイズ）を自動生成します。Claudeが講義内容を直接分析して問題を生成し、解答付きMarkdownとオプションでPDFを出力します。

## 実行フロー

### Phase 1: 講義ファイル選択

1. `previous_lecture/*.md` を Glob で一覧取得
2. 各ファイルのフロントマターまたは最初の `# ` 見出しからタイトルを抽出
3. AskUserQuestion で対象講義を選択:

```
AskUserQuestion:
  question: "どの講義からクイズを生成しますか？"
  header: "講義選択"
  multiSelect: false
  options:
    - label: "{lecture-title-1}"
      description: "{filename-1}"
    - label: "{lecture-title-2}"
      description: "{filename-2}"
    ... (最大4つ、5つ以上の場合はOtherで直接入力)
```

4. 選択されたファイルのパスを保持

### Phase 2: クイズ設定確認

AskUserQuestion を **2回** 使用して合計8つの設定を確認する。

#### AskUserQuestion 第1回: 基本設定（4問同時）

**Question 1: 問題数**
```
  question: "問題数を選択してください"
  header: "問題数"
  multiSelect: false
  options:
    - label: "10問"
      description: "短時間の確認テスト（10-15分）"
    - label: "15問 (Recommended)"
      description: "標準的な確認テスト（15-20分）"
    - label: "20問"
      description: "しっかりとした確認テスト（20-30分）"
    - label: "25問"
      description: "包括的なテスト（30-40分）"
```

**Question 2: 問題形式**
```
  question: "出題する問題形式を選択してください（複数選択可）"
  header: "問題形式"
  multiSelect: true
  options:
    - label: "選択問題（4択）(Recommended)"
      description: "4つの選択肢から正答を1つ選ぶ"
    - label: "正誤判定（○×）"
      description: "文の正誤を判断する"
    - label: "穴埋め問題"
      description: "重要な用語やフレーズを埋める"
    - label: "短答式"
      description: "簡潔な記述で回答する"
```

**Question 3: 難易度**
```
  question: "問題の難易度を選択してください"
  header: "難易度"
  multiSelect: false
  options:
    - label: "基礎"
      description: "基本的な知識の確認"
    - label: "標準 (Recommended)"
      description: "理解度を確認する標準レベル"
    - label: "応用"
      description: "深い理解や応用力を問う"
    - label: "混合"
      description: "基礎・標準・応用をバランスよく混合"
```

**Question 4: 出題範囲**
```
  question: "出題範囲を選択してください"
  header: "出題範囲"
  multiSelect: false
  options:
    - label: "全範囲 (Recommended)"
      description: "講義全体から均等に出題"
    - label: "前半重点"
      description: "講義の前半（基礎概念・導入部分）を重点的に出題"
    - label: "後半重点"
      description: "講義の後半（応用・まとめ部分）を重点的に出題"
    - label: "重要セクション"
      description: "特に重要なセクションに絞って出題（Otherで指定も可）"
```

#### AskUserQuestion 第2回: 出力・詳細設定（4問同時）

**Question 5: 解説の詳しさ**
```
  question: "解説の詳しさを選択してください"
  header: "解説"
  multiSelect: false
  options:
    - label: "簡潔"
      description: "正答と1-2文の簡単な解説のみ"
    - label: "標準 (Recommended)"
      description: "正答・解説・講義での該当箇所を含む"
    - label: "詳細"
      description: "正答・詳細解説・関連知識・よくある間違いも含む"
```

**Question 6: 出力形式（ファイル分離）**
```
  question: "問題と解答の出力形式を選択してください"
  header: "ファイル形式"
  multiSelect: false
  options:
    - label: "問題・解答を別々のファイル (Recommended)"
      description: "問題用と解答用を分離（印刷配布しやすい）"
    - label: "1つのファイルにまとめる"
      description: "問題と解答を1ファイルに含む（解答は改ページで分離）"
```

**Question 7: PDF出力**
```
  question: "PDF出力を行いますか？"
  header: "PDF出力"
  multiSelect: false
  options:
    - label: "する (Recommended)"
      description: "Markdownに加えてA4印刷用PDFも生成"
    - label: "しない"
      description: "Markdownファイルのみ生成"
```

**Question 8: 追加の指示**
```
  question: "特に注力してほしいポイントや追加の指示はありますか？"
  header: "追加指示"
  multiSelect: false
  options:
    - label: "特になし (Recommended)"
      description: "講義内容からバランスよく出題"
    - label: "用語・定義を重視"
      description: "専門用語や定義の正確な理解を重点的にテスト"
    - label: "数値・基準値を重視"
      description: "具体的な数値、許容値、基準を重点的にテスト"
    - label: "プロセス・手順を重視"
      description: "ワークフローや手順の理解を重点的にテスト"
```
※ ユーザーが「Other」を選択した場合、自由記述の指示をそのまま問題生成ルールに反映する

### Phase 3: 講義内容分析・問題生成（Claude直接）

1. Read ツールで講義ファイルを読み込む
2. Slidevマークアップ（HTML, CSS, Vue, frontmatter YAML, `---` 区切り, スピーカーノート）を無視し、教育コンテンツ（テキスト、箇条書き、概念、定義、例）を抽出
3. 講義の主要セクションを特定し、出題範囲設定に従って配分:
   - **全範囲**: 各セクションから均等に出題
   - **前半重点**: 前半セクションから70%、後半から30%
   - **後半重点**: 後半セクションから70%、前半から30%
   - **重要セクション**: ユーザー指定セクションから80%、その他から20%
4. 指定された問題数・形式・難易度・追加指示に従って問題を生成

**問題生成ルール:**
- 各問題はユニークな知識ポイントをテストする
- 難易度「混合」の場合: 基礎30%、標準50%、応用20%の比率
- 選択問題: 4つの選択肢（誤答は妥当だが明確に間違い）
- 正誤判定: 微妙な違いを含む文で理解度を確認
- 穴埋め: 重要用語・数値・概念を空欄にする（（　　　）表記）
- 短答式: 1-2文で回答できる問題

**追加指示の反映:**
- 「用語・定義を重視」: 専門用語の定義、略語の正式名称、概念の説明を重点的に出題
- 「数値・基準値を重視」: 具体的数値（線量、距離、割合、回数など）を問う問題を増やす
- 「プロセス・手順を重視」: ワークフローの順序、各ステップの役割を問う問題を増やす
- 自由記述の場合: ユーザーの指示内容をそのまま問題生成の方針に反映

**解説の詳しさ:**
- 「簡潔」: 正答 + 1-2文の解説のみ。講義該当箇所は省略
- 「標準」: 正答 + 解説 + 講義での該当箇所
- 「詳細」: 正答 + 詳細解説 + 関連知識の補足 + よくある間違い + 講義での該当箇所

5. 生成した問題を直接Phase 4のMarkdown生成に渡す

### Phase 4: クイズMarkdown生成

1. `quizzes/` ディレクトリを作成（存在しない場合）
2. 出力形式に応じてファイルを生成:

#### パターンA: 問題・解答を別々のファイル（推奨）

**問題ファイル:** `quizzes/{lecture-slug}-quiz-{YYYYMMDD}.md`
```markdown
# 確認テスト: {講義タイトル}

**日付:** {YYYY-MM-DD} | **問題数:** {N}問 | **制限時間目安:** {estimated_time}分

---

## 問題

### 問 1（選択問題・基礎）
{question_text}
- A. {option_a}
- B. {option_b}
- C. {option_c}
- D. {option_d}

---

### 問 2（正誤判定・標準）
{question_text}
（ ○ ・ × ）

---
（以下続く）
```

**解答ファイル:** `quizzes/{lecture-slug}-quiz-{YYYYMMDD}-answers.md`
```markdown
# 解答・解説: {講義タイトル}

**日付:** {YYYY-MM-DD} | **問題数:** {N}問

---

## 解答・解説

### 問 1
<span style="color: red;">**正答: {correct_answer}**</span>

**解説:** {explanation}

<span style="color: red;">**講義での該当箇所:** {source_content}</span>

---
（以下続く）
```

#### パターンB: 1つのファイルにまとめる

**出力先:** `quizzes/{lecture-slug}-quiz-{YYYYMMDD}.md`
- 問題セクションと解答セクションを `---` で区切り、1ファイルに含む
- 解答セクションは `## 解答・解説` で始まり、PDF化時に改ページで分離

3. 制限時間目安の計算:
   - 選択問題: 1問あたり1分
   - 正誤判定: 1問あたり0.5分
   - 穴埋め: 1問あたり1.5分
   - 短答式: 1問あたり2分

### Phase 5: PDF生成（オプション）

Phase 2 で「する」が選択された場合のみ実行。

**IMPORTANT: `file://` プロトコルはPlaywright MCPでブロックされるため、HTTPサーバー経由でアクセスする。**

#### パターンA: 問題・解答が別ファイルの場合

1. HTML変換（`--split` フラグで問題用・解答用HTMLを同時生成）:
```bash
node scripts/quiz-to-html.mjs quizzes/{quiz-filename}.md --split
```
→ `{quiz-filename}-questions.html` と `{quiz-filename}-answers.html` が生成される

2. HTTPサーバー起動:
```bash
cd quizzes && python3 -m http.server {port} &>/dev/null &
```

3. Playwright MCP でPDF生成（問題用）:
   - `browser_navigate` で `http://localhost:{port}/{quiz-filename}-questions.html` を開く
   - `browser_run_code` で `page.pdf()` 実行 → `quizzes/{quiz-filename}-questions.pdf`

4. Playwright MCP でPDF生成（解答用）:
   - `browser_navigate` で `http://localhost:{port}/{quiz-filename}-answers.html` を開く
   - `browser_run_code` で `page.pdf()` 実行 → `quizzes/{quiz-filename}-answers.pdf`

5. クリーンアップ:
```bash
rm quizzes/{quiz-filename}-questions.html quizzes/{quiz-filename}-answers.html
kill {server_pid}
```

6. ブラウザを閉じる: `browser_close`

#### パターンB: 1ファイルにまとめる場合

1. HTML変換:
```bash
node scripts/quiz-to-html.mjs quizzes/{quiz-filename}.md
```

2. HTTPサーバー起動 → Playwright MCP でPDF生成 → クリーンアップ（上記と同様）

#### page.pdf() 共通設定:
```javascript
async (page) => {
  await page.pdf({
    path: 'quizzes/{output-filename}.pdf',
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;"><span class="pageNumber"></span></div>',
    printBackground: true
  });
  return 'PDF generated successfully';
}
```

### Phase 6: 検証・完了

1. 生成されたMarkdownファイルを読み込んで検証:
   - 問題数が指定通りか確認
   - 各問題に形式タグと難易度タグがあるか確認
   - 解答セクション（解答ファイル）が全問題分あるか確認
   - `<span style="color: red;">` タグが正しく配置されているか確認

2. PDFが生成された場合、ファイルの存在を確認

3. 結果をユーザーに報告:

**別ファイルの場合:**
```
クイズ生成が完了しました:

- 問題: quizzes/{filename}.md
- 解答: quizzes/{filename}-answers.md
- 問題PDF: quizzes/{filename}.pdf（生成した場合）
- 解答PDF: quizzes/{filename}-answers.pdf（生成した場合）
- 問題数: {N}問（選択: {n1}, 正誤: {n2}, 穴埋め: {n3}, 短答: {n4}）
- 難易度: {difficulty}
- 出題範囲: {scope}
- 解説: {detail_level}
- 制限時間目安: {time}分
```

**1ファイルの場合:**
```
クイズ生成が完了しました:

- Markdown: quizzes/{filename}.md
- PDF: quizzes/{filename}.pdf（生成した場合）
- 問題数: {N}問（選択: {n1}, 正誤: {n2}, 穴埋め: {n3}, 短答: {n4}）
- 難易度: {difficulty}
- 出題範囲: {scope}
- 解説: {detail_level}
- 制限時間目安: {time}分
```

## 完了条件

- `quizzes/` にMarkdownファイルが生成されている
- 問題数・形式が指定通り
- 解答セクションが全問題分ある
- 赤字ハイライトが正しく適用されている
- PDFが正常に生成されている（オプション選択時）
- ファイル分離が選択通りに行われている

## エラーハンドリング

- **問題数不足**: 不足分を通知してユーザーに確認
- **PDF生成失敗**: Markdownは保持し、PDF失敗をユーザーに通知
- **講義ファイルが空/短すぎる**: 最低限のコンテンツ量を確認してから実行
- **HTTPサーバー起動失敗**: ポートを変更して再試行
