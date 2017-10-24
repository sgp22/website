#!/bin/bash


ROOTDIR="$( cd "$(dirname `dirname "${BASH_SOURCE[0]}"` )" && pwd )"

sed -e 'static/ s/^#*/#/' -i '' "$ROOTDIR/.gitignore"

#COMMIT_MSG=$(git log -1 --pretty=%B)
#git add --all
#git commit -m "$COMMIT_MSG"
#eb deploy
#git reset HEAD~

#git checkout .gitignore
