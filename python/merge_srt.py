#!/usr/local/bin/python
# -*- coding: utf-8 -*-

import srt
import sys

print('start...')

with open(sys.argv[1], encoding='utf-8') as myfile:
    data1 = myfile.read()
    
with open(sys.argv[2], encoding='utf-8') as myfile:
    data2 = myfile.read()
    
sub1 = list(srt.parse(data1))
sub2 = list(srt.parse(data2))
subDict = {}

for i in range(len(sub1)):
    subDict[sub1[i].start] = sub1[i]

for i in range(len(sub2)):
    if(sub2[i].start in subDict):
        subDict[sub2[i].start].content += "\n" + sub2[i].content
    else:
        subDict[sub2[i].start] = sub2[i]
        
subDict = sorted(subDict.items())

mysub = []
idx = 1
for k,v in subDict:
    v.index = idx
    mysub.append(v)
    ++idx

with open("merg.srt", "w", encoding='utf-8') as myfile:
    myfile.write(srt.compose(mysub))
	  
print('finished')
