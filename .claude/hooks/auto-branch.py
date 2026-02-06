#!/usr/bin/env python3
"""
Auto Branch Hook - 作業開始時に自動でgitブランチを切る + マージ確認

機能:
1. セッション開始時（mainブランチにいる場合）に自動で作業用ブランチを作成
2. 作業完了時にマージ可否をチェックして提案

ブランチ命名規則: work/YYYYMMDD-HHMMSS
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path


# マージ確認をトリガーするキーワード
MERGE_TRIGGER_KEYWORDS = [
    "完了", "終わり", "終了", "おわり", "マージ", "merge",
    "done", "finish", "完成", "できた", "終わった",
    "mainに戻", "mainにマージ", "ブランチ統合"
]


def get_current_branch() -> str:
    """現在のブランチ名を取得"""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        return result.stdout.strip() if result.returncode == 0 else ""
    except Exception:
        return ""


def has_uncommitted_changes() -> bool:
    """コミットされていない変更があるかチェック"""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        return bool(result.stdout.strip())
    except Exception:
        return False


def get_commits_ahead_of_main() -> int:
    """mainブランチより何コミット先にいるか"""
    try:
        # まずmainが存在するか確認
        result = subprocess.run(
            ["git", "rev-parse", "--verify", "main"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        base_branch = "main" if result.returncode == 0 else "master"

        result = subprocess.run(
            ["git", "rev-list", "--count", f"{base_branch}..HEAD"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        return int(result.stdout.strip()) if result.returncode == 0 else 0
    except Exception:
        return 0


def get_changed_files_count() -> int:
    """mainブランチからの変更ファイル数"""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--verify", "main"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        base_branch = "main" if result.returncode == 0 else "master"

        result = subprocess.run(
            ["git", "diff", "--name-only", f"{base_branch}...HEAD"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        if result.returncode == 0 and result.stdout.strip():
            return len(result.stdout.strip().split("\n"))
        return 0
    except Exception:
        return 0


def get_base_branch() -> str:
    """ベースブランチ（main or master）を取得"""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--verify", "main"],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        return "main" if result.returncode == 0 else "master"
    except Exception:
        return "main"


def is_work_branch(branch_name: str) -> bool:
    """作業用ブランチかどうか判定"""
    work_prefixes = ("work/", "feature/", "fix/", "hotfix/", "dev/")
    return branch_name.startswith(work_prefixes)


def get_session_marker_path() -> Path:
    """セッションマーカーファイルのパスを取得"""
    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", ".")
    session_id = os.environ.get("CLAUDE_SESSION_ID", "default")
    return Path(project_dir) / ".claude" / ".session-branch-created" / session_id


def is_branch_already_created() -> bool:
    """このセッションで既にブランチを作成済みかチェック"""
    marker_path = get_session_marker_path()
    return marker_path.exists()


def mark_branch_created(branch_name: str):
    """ブランチ作成済みマーカーを記録"""
    marker_path = get_session_marker_path()
    marker_path.parent.mkdir(parents=True, exist_ok=True)
    marker_path.write_text(branch_name)


def create_work_branch() -> tuple[bool, str]:
    """作業用ブランチを作成"""
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    branch_name = f"work/{timestamp}"

    try:
        result = subprocess.run(
            ["git", "checkout", "-b", branch_name],
            capture_output=True,
            text=True,
            cwd=os.environ.get("CLAUDE_PROJECT_DIR", "."),
        )
        if result.returncode == 0:
            return True, branch_name
        else:
            return False, result.stderr
    except Exception as e:
        return False, str(e)


def cleanup_old_markers():
    """古いセッションマーカーを削除（24時間以上前のもの）"""
    try:
        project_dir = os.environ.get("CLAUDE_PROJECT_DIR", ".")
        marker_dir = Path(project_dir) / ".claude" / ".session-branch-created"
        if not marker_dir.exists():
            return

        now = datetime.now().timestamp()
        for marker_file in marker_dir.iterdir():
            if marker_file.is_file():
                age = now - marker_file.stat().st_mtime
                if age > 86400:  # 24 hours
                    marker_file.unlink()
    except Exception:
        pass


def should_check_merge(user_prompt: str) -> bool:
    """マージ確認をすべきかどうか判定"""
    prompt_lower = user_prompt.lower()
    for keyword in MERGE_TRIGGER_KEYWORDS:
        if keyword.lower() in prompt_lower:
            return True
    return False


def check_merge_readiness() -> dict:
    """マージ準備状況をチェック"""
    current_branch = get_current_branch()
    base_branch = get_base_branch()

    checks = {
        "current_branch": current_branch,
        "base_branch": base_branch,
        "is_work_branch": is_work_branch(current_branch),
        "uncommitted_changes": has_uncommitted_changes(),
        "commits_ahead": get_commits_ahead_of_main(),
        "changed_files": get_changed_files_count(),
    }

    # マージ可否判定
    checks["can_merge"] = (
        checks["is_work_branch"] and
        not checks["uncommitted_changes"] and
        checks["commits_ahead"] > 0
    )

    return checks


def generate_merge_message(checks: dict) -> str:
    """マージ確認メッセージを生成"""
    branch = checks["current_branch"]
    base = checks["base_branch"]

    if not checks["is_work_branch"]:
        return f"[Merge Check] 現在 `{branch}` ブランチにいます。作業用ブランチではないためマージ確認をスキップします。"

    lines = [f"[Merge Check] ブランチ `{branch}` のマージ準備状況:"]

    # ステータス表示
    if checks["uncommitted_changes"]:
        lines.append("  - 未コミットの変更があります（先にコミットしてください）")
    else:
        lines.append("  - 未コミットの変更: なし")

    lines.append(f"  - {base}からのコミット数: {checks['commits_ahead']}")
    lines.append(f"  - 変更ファイル数: {checks['changed_files']}")

    # 判定結果
    if checks["can_merge"]:
        lines.append("")
        lines.append(f"マージ可能です。以下のコマンドで {base} にマージできます:")
        lines.append(f"  git checkout {base} && git merge {branch} && git branch -d {branch}")
        lines.append("")
        lines.append("または `/commit-push` でプッシュ後、PRを作成することもできます。")
    elif checks["uncommitted_changes"]:
        lines.append("")
        lines.append("未コミットの変更をコミットしてからマージしてください。")
    elif checks["commits_ahead"] == 0:
        lines.append("")
        lines.append(f"{base}と同じ状態です。マージする変更がありません。")

    return "\n".join(lines)


def handle_branch_creation():
    """ブランチ作成処理"""
    # 既にこのセッションでブランチを作成済みならスキップ
    if is_branch_already_created():
        return None

    current_branch = get_current_branch()

    # gitリポジトリでない場合はスキップ
    if not current_branch:
        return None

    # main/master以外のブランチにいる場合はスキップ
    if current_branch not in ("main", "master"):
        mark_branch_created(current_branch)
        return None

    # 未コミットの変更がある場合は警告
    if has_uncommitted_changes():
        return {
            "additionalContext": (
                "[Auto Branch] mainブランチに未コミットの変更があります。"
                "作業用ブランチを作成する前にコミットまたはstashしてください。"
            )
        }

    # 作業用ブランチを作成
    success, result = create_work_branch()

    if success:
        mark_branch_created(result)
        return {
            "additionalContext": f"[Auto Branch] 作業用ブランチ `{result}` を作成しました。"
        }
    else:
        return {
            "additionalContext": f"[Auto Branch] ブランチ作成に失敗: {result}"
        }


def handle_merge_check():
    """マージ確認処理"""
    current_branch = get_current_branch()

    # main/masterにいる場合はスキップ
    if current_branch in ("main", "master"):
        return None

    checks = check_merge_readiness()
    message = generate_merge_message(checks)

    return {"additionalContext": message}


def main():
    user_prompt = os.environ.get("CLAUDE_USER_PROMPT", "")

    # 古いマーカーをクリーンアップ
    cleanup_old_markers()

    # マージ確認キーワードが含まれている場合
    if should_check_merge(user_prompt):
        result = handle_merge_check()
        if result:
            print(json.dumps(result))
            return

    # ブランチ作成処理
    result = handle_branch_creation()
    if result:
        print(json.dumps(result))


if __name__ == "__main__":
    main()
