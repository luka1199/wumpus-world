#!/bin/sh

git add .
git status
git commit -m 'Update pages'
git push origin master

git checkout gh-pages
git rebase master
git push origin gh-pages
git checkout master