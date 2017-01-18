#!/bin/bash

git config --global user.name "Travis-CI"
git config --global user.email "travis@example.com"

npm run deploy -- -r https://${GH_TOKEN}@github.com/markdalgleish/react-static-site-playground
