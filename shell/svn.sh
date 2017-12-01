#!/usr/bin/env bash

function call_svn(){
action=$1
depth=$2
DIRS=`find $baseDir -maxdepth ${depth} -mindepth ${depth} -type d`

for curDir in $DIRS
do
    if [ -d "$curDir/.svn" ]; then
        svn $action $curDir
    fi
done

}

#baseDir=$(dirname "$0")
#SVN_DIRS=`find $baseDir -maxdepth 3 -mindepth 3 -type d`
#echo $SVN_DIRS
##svn $1 $SVN_DIRS

for depth in 1 2 3
do
    call_svn $1 $depth
done
