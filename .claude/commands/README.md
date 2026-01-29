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
