#!/bin/bash


COMMIT_MSG=$(git log -1 --pretty=%B)
git add --all
git commit -m "$COMMIT_MSG"
eb deploy
git reset HEAD~