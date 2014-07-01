#!/bin/bash
#
# Simple build script for evolving r-tags
#
uglifyjs r-marked/r-marked.js --compress --comments --output=r-marked.min.js
uglifyjs r-args/r-args.js --compress --comments --output=r-args.min.js

# Build r-tags stand-alone except for Brick
uglifyjs js/marked.min.js r-marked/r-marked.js r-args/r-args.js --compress --comments --output=r-tags.min.js


