#!/bin/sh
git checkout gh-pages
git merge master
git add .
git commit -m "Update pages"
git push origin gh-pages
git checkout master
