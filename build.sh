#!/bin/bash
#
# Simple build script for evolving r-tags
#
uglifyjs r-marked/r-marked.js --compress --comments --output=r-marked.min.js
uglifyjs r-args/r-args.js --compress --comments --output=r-args.min.js

# Build r-tags stand-alone except for Brick
cat js/marked.min.js  r-marked.min.js r-args.min.js > r-tags.min.js
