#!/bin/bash


ROOTDIR="$( cd "$(dirname `dirname "${BASH_SOURCE[0]}"` )" && pwd )"

line_old='src/web/dist'
line_new='#src/web/dist'
sed -e "s%$line_old%$line_new%g" -i '' "$ROOTDIR/.gitignore"

COMMIT_MSG=$(git log -1 --pretty=%B)
git add --all
git commit -m "$COMMIT_MSG"
eb deploy
git reset HEAD~

git status
git checkout .gitignore
