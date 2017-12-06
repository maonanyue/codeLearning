#!/usr/bin/env bash
CMD=$1
FILE_NAME=$2
SRC_DIR=$3
DIST_DIR=$4

for i in `find $SRC_DIR -name $FILE_NAME`
do
    PARENT_NAME=`dirname $i`
    PARENT_NAME=`basename $PARENT_NAME`
    $CMD $i $DIST_DIR/$PARENT_NAME
done
