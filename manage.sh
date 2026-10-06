#!/bin/sh
# Workspace tooling for this local checkout. No credentials live in the repository.
set -eu
WEDDING_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
WEDDING_WORK=$(CDPATH= cd -- "$WEDDING_ROOT/../../work" && pwd)
WEDDING_GH="$WEDDING_WORK/github-cli/gh_2.102.0_macOS_arm64/bin/gh"
WEDDING_GIT="/Users/isha/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/git"
export GH_CONFIG_DIR="$WEDDING_WORK/gh-config"
cd "$WEDDING_ROOT"
case "${1:-status}" in
  status) "$WEDDING_GIT" status --short; "$WEDDING_GH" run list --repo ishadesigns/ai-wedding --limit 3 ;;
  login) "$WEDDING_GH" auth login --hostname github.com --git-protocol https --scopes workflow --web ;;
  publish)
    "$WEDDING_GH" api user --jq .login | /usr/bin/grep -qx ishadesigns || { echo 'Sign in as ishadesigns first.' >&2; exit 1; }
    "$WEDDING_GIT" add .
    if ! "$WEDDING_GIT" diff --cached --quiet; then "$WEDDING_GIT" commit -m "${2:-Update wedding website}"; fi
    "$WEDDING_GIT" push -u origin main
    ;;
  *) echo 'Usage: sh manage.sh [status|login|publish "commit message"]' >&2; exit 2 ;;
esac
