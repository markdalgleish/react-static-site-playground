#!/bin/bash

git config user.name "Travis-CI"
git config user.email "travis@example.com"

npm run deploy -- -r https://${GH_TOKEN}@github.com/markdalgleish/react-static-site-playground
