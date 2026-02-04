---
name: archive-lecture
description: 現在のslides.mdを内容から適切な名前を付けてprevious_lectureディレクトリにアーカイブする。講義が完了したら自動的にバックアップを作成。
---

# Archive Lecture Skill

## Purpose

現在のslides.mdをアーカイブし、新しい講義作成の準備をします。スライドの内容（フロントマター、タイトル）から適切なファイル名を自動生成し、previous_lecture/ディレクトリに保存します。

## When to Use

- 講義スライドが完成し、次の講義を作成する前
- スライドのバックアップを作成したい時
- プレゼンテーション後にアーカイブしたい時

## Usage

```
/archive-lecture
```

オプション:
```
/archive-lecture --custom-name "lecture-name"  # カスタム名を指定
/archive-lecture --no-commit                    # git commitをスキップ
```

## Workflow

### Phase 1: スライド内容の分析

1. **slides.mdを読み込む**
   - Read tool で slides.md を読み込み
   - 存在確認（ファイルが無い場合はエラー）

2. **メタデータを抽出**
   - フロントマター（YAML）から:
     - `title`: 講義タイトル
     - `theme`: テーマ名
     - 日付情報（あれば）
   - 最初のh1タイトルから講義名を抽出
   - 講義番号を検出（「第1回」「第2回」等）

3. **ファイル名を生成**

   生成ルール:
   ```
   lecture-{番号}-{スラッグ化したタイトル}-{日付}.md
   ```

   例:
   - 「第1回 放射線治療学入門」→ `lecture-01-radiation-therapy-introduction-2024-02-04.md`
   - 「放射線の生物学的効果」→ `lecture-radiation-biological-effects-2024-02-04.md`
   - カスタム名指定時: `{custom-name}-2024-02-04.md`

   スラッグ化ルール:
   - 日本語 → ローマ字変換または英語要約
   - スペース → ハイフン
   - 小文字化
   - 特殊文字削除

### Phase 2: アーカイブ実行

1. **ディレクトリ確認**
   - previous_lecture/ が存在するか確認
   - 無ければ作成: `mkdir -p previous_lecture`

2. **重複確認**
   - 同名ファイルが既に存在するか確認
   - 存在する場合:
     - タイムスタンプを追加: `{name}-{HHMMSS}.md`
     - または上書き確認をユーザーに問い合わせ

3. **ファイルをコピー**
   - slides.md を previous_lecture/{生成名}.md にコピー
   - Bash tool で `cp slides.md previous_lecture/{filename}`

4. **確認メッセージ**
   - アーカイブされたファイル名を表示
   - 保存先パスを表示

### Phase 3: Git記録（オプション）

1. **git commitを作成**（--no-commit が無い場合）
   ```bash
   git add previous_lecture/{filename}
   git commit -m "Archive lecture: {講義名}

   Archived slides.md to previous_lecture/{filename}
   Date: {date}

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
   ```

2. **コミット確認**
   - `git log --oneline -1` でコミット確認

## Output Format

成功時:
```
✅ 講義をアーカイブしました

📁 アーカイブファイル:
   previous_lecture/lecture-01-radiation-therapy-introduction-2024-02-04.md

📊 スライド情報:
   タイトル: 第1回 放射線治療学入門
   ページ数: 45ページ
   作成日: 2024-02-04

✓ Git commitを作成しました

次のステップ:
- 新しい講義を作成: /create-lecture 第2回
- スライドを確認: npm run dev
```

## Error Handling

### slides.mdが存在しない
```
❌ エラー: slides.mdが見つかりません

slides.mdを先に作成してください:
- /create-lecture で新規作成
```

### previous_lecture/に同名ファイルが存在
```
⚠️  警告: 同名のアーカイブが既に存在します

既存: previous_lecture/lecture-01-radiation-therapy-2024-02-04.md

選択肢:
1. タイムスタンプを追加して保存
2. 上書き
3. キャンセル
```

### メタデータ抽出失敗
```
⚠️  警告: タイトル情報を自動抽出できませんでした

デフォルト名で保存します:
previous_lecture/slides-archive-2024-02-04.md

カスタム名を指定する場合:
/archive-lecture --custom-name "your-name"
```

## Examples

### 基本的な使用

```
/archive-lecture
```

実行結果:
1. slides.mdから「第1回 放射線治療学入門」を抽出
2. `lecture-01-radiation-therapy-introduction-2024-02-04.md` を生成
3. previous_lecture/にコピー
4. git commit作成

### カスタム名指定

```
/archive-lecture --custom-name "special-lecture-radiation-biology"
```

実行結果:
- `special-lecture-radiation-biology-2024-02-04.md` として保存

### Commitスキップ

```
/archive-lecture --no-commit
```

実行結果:
- アーカイブのみ実行、git commitは作成しない

## Implementation Details

### タイトル抽出ロジック

```python
# 優先順位
1. フロントマターの title フィールド
2. 最初の # タイトル
3. 最初の ## タイトル
4. ファイル名から推測
```

### 講義番号抽出

```python
# パターンマッチング
- "第1回" → 01
- "第2回" → 02
- "Lecture 1" → 01
- "1回目" → 01
- 番号なし → "lecture" のみ
```

### スラッグ化

```python
# 変換例
"放射線治療学入門" → "radiation-therapy-introduction"
"生物学的効果と線量" → "biological-effects-and-dose"
"IMRT/VMAT" → "imrt-vmat"
```

## Integration with Other Skills

### 新規講義作成フロー

```
1. /archive-lecture
   → 現在の講義をアーカイブ

2. /create-lecture 第2回
   → 新しい講義を作成
   → slides.mdを上書き

3. /slide-style-rector slides.md
   → スタイル整形

4. npm run dev
   → プレビュー確認
```

### アーカイブ後の検索

```bash
# アーカイブから検索
ls previous_lecture/

# 特定の講義を確認
cat previous_lecture/lecture-01-*.md

# アーカイブを復元（手動）
cp previous_lecture/lecture-01-*.md slides.md
```

## Notes

- **元のslides.mdは削除されません** - コピーのみ実行
- **previous_lecture/は.gitignoreされていません** - すべてのアーカイブがgit管理される
- **日付は実行日が使用されます** - スライド作成日ではない
- **メタデータがない場合でもアーカイブ可能** - デフォルト名を使用

## Language Protocol

- **思考・処理**: 英語
- **ユーザー出力**: 日本語
- **ファイル名**: 英語（スラッグ化）
- **Commitメッセージ**: 日本語 + 英語

## Security

- **患者情報チェック**: アーカイブ前に警告（医療情報が含まれる可能性）
- **ファイルパス検証**: ディレクトリトラバーサル対策
- **上書き確認**: 既存ファイル保護
