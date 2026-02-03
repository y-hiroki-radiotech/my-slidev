# Slidev スラッシュコマンド

このディレクトリには、Claude Codeで使用できるスラッシュコマンドが含まれています。

## 利用可能なコマンド

### `/add-slide` - 新規スライドセクション追加

授業計画を参照しながら、新しいスライドセクションを自動生成します。

**使用例:**
```bash
/add-slide 放射線の種類と特性
```

**詳細:** `add-slide.md` を参照

---

### `/create-lecture` - 講義全体の自動生成

授業計画から講義全体のスライドを一括生成します。

**使用例:**
```bash
/create-lecture 第1回
```

**詳細:** `create-lecture.md` を参照

---

### `/create-abstract` - 抄読会スライド生成

医学論文情報から抄読会用のスライドを自動生成します。

**使用例:**
```bash
/create-abstract 10.1016/j.ijrobp.2023.xxxxx
/create-abstract --pdf /path/to/paper.pdf
```

**詳細:** `create-abstract.md` を参照

---

### `/prepare-pdf` - PDF出力用最適化

スライドをPDF出力用に最適化し、自動的にPDFを生成します。

**使用例:**
```bash
/prepare-pdf
/prepare-pdf pages/abstract-Smith-2024.md
```

**詳細:** `prepare-pdf.md` を参照

---

### `/slide-style-rector` - スタイル自動整形

スタイルガイドとレイアウトパターンに基づいてスライドを自動整形します。

**使用例:**
```bash
/slide-style-rector slides.md
/slide-style-rector slides.md 10-20
```

**詳細:** `slide-style-rector.md` を参照

---

### `/layout-fix` - レイアウト崩れ自動修正

スライドのレイアウト崩れを検出して自動修正します。

**使用例:**
```bash
/layout-fix slides.md
```

**詳細:** `layout-fix.md` を参照

---

### `/slidev-diagram` - 図解生成とスライド挿入

AI画像生成を使用して図解を作成し、スライドに挿入します。

**使用例:**
```bash
/slidev-diagram リニアックの構造を図解して。ページ7に挿入、slides.md
```

**詳細:** `slidev-diagram.md` を参照

---

## コマンドの特徴

すべてのコマンドは以下の特徴を持ちます：

- **完全自動実行**: ユーザー介入なしで開始から完了まで実行
- **タスク管理**: tasklist.mdで進捗を自動管理
- **バージョン管理**: 重要な変更前に自動git commit
- **品質保証**: プレビュー確認とフォーマット検証
- **プランニング**: 専用ディレクトリで計画と実行履歴を保存

## エージェントとの違い

- **コマンド** (このディレクトリ): ユーザーが直接呼び出す具体的なアクション
- **エージェント** (`.claude/agents/`): 特定分野の専門家として振る舞う自律的システム

詳細は、プロジェクトルートの `README.md` を参照してください。
