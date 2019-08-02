#!/usr/bin/env python
import json
import sys
import os

path = sys.argv[1]


def exceptionFilterFolder(name):
    if name == 'node_modules':
        return 0
    if name[0] == ".":
        return 0
    if name.count(".") > 0:
        return 0
    return 1

def exceptionFilterFileLang(array):
    if array[len(array)-1] == "jar":
        return 0;
    if array[len(array)-1] == "png":
        return 0;
    if array[len(array)-1] == "jpg":
        return 0;
    if array[len(array)-1] == "vod":
        return 0;
    if array[len(array)-1] == "jpeg":
        return 0;
    if array[len(array)-1] == "gif":
        return 0;
    if array[len(array)-1] == "ico":
        return 0;
    return 1

def exceptionFilterFile(name):
    ar = name.split(".")
    if name.count(".") != 1:
        return 0
    if exceptionFilterFileLang(ar) == 0:
        return 0
    if name[0] == ".":
        return 0
    return 1


def getSection(path):
    full = os.path.basename(path)
    ret = full.split(".")
    return ret[0], ret[1]


def genFolder(path):
    num = 0
    array = []
    for dir in os.listdir(path):
        if os.path.isdir(path+"/"+dir) and exceptionFilterFolder(dir):
            num += 1
            array.append(mainGeneration(path+"/"+dir))
    return str(num), array



def genFile(path):
    num = 0
    array = []
    for file in os.listdir(path):
        if os.path.isfile(path+"/"+file) and exceptionFilterFile(file):
            num += 1
            tmp = {}
            tmp['name'] ,tmp['lang'] = getSection(path+"/"+file)
            tmp['type'] = 'file'
            array.append(tmp)
    return str(num), array



def mainGeneration(path):
    result = {}
    result['name'] = os.path.basename(path)
    result['foldernum'], result['folder'] = genFolder(path)
    result['filenum'], result['file'] = genFile(path)
    return result


tree = {}
tree['tree'] = mainGeneration(path)

with open("tmp.json",'w') as f:
    json.dump(tree,f)
