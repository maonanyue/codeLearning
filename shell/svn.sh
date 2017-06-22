#!/usr/bin/env bash
baseDir=$(dirname "$0")
SVN_DIRS=`find $baseDir -maxdepth 3 -mindepth 3 -type d`

svn $1 $SVN_DIRS
