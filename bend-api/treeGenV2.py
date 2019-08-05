#!/usr/bin/env python
import json
import sys
import os

path = sys.argv[1]


def genName(name):
    result = {}
    if name[0] == ".":
        result["pointInit"] = "yes"
    else :
        result["pointInit"] = "no"
    array = name.split(".")
    if len(array) == 1:
        result["pointCompose"] = "no"
        result['name'] = name
        return result
    result["pointCompose"] = "yes"
    arraylist = []
    for i in range(len(array)):
        if name[0] != "." or i != 0:
            tmp = {}
            tmp["name"] = array[i]
            arraylist.append(tmp)
    tmp = len(array)
    if name[0] == ".":
        tmp -= 1
    result['nameNum'] = tmp
    result['name'] = arraylist
    return result


def exceptionFilder(name):
    if name == ".git":
        return 0
    if name == ".gitignore":
        return 0
    if name == "yarn.lock":
        return 0
    if name == "node_modules":
        return 0
    if name == ".npmignore":
        return 0
    ar = name.split(".")
    exct = ar[len(ar)-1]
    if exct == "jar":
        return 0
    if exct == "png":
        return 0
    if exct == "jpg":
        return 0
    if exct == "vod":
        return 0
    if exct == "jpeg":
        return 0
    if exct == "gif":
        return 0
    if exct == "ico":
        return 0
    return 1



def genFolder(path):
    num = 0
    array = []
    for dir in os.listdir(path):
        if os.path.isdir(path+"/"+dir) and exceptionFilder(dir):
            num += 1
            array.append(mainGeneration(path+"/"+dir))
    return num, array


def genFile(path):
    num = 0
    array = []
    for file in os.listdir(path):
        if os.path.isfile(path+"/"+file) and exceptionFilder(file):
            num += 1
            tmp = genName(file)
            tmp['type'] = 'file'
            array.append(tmp)
    return num, array


def mainGeneration(path):
    name = os.path.basename(path)
    result = genName(name)
    result['foldernum'], result['folder'] = genFolder(path)
    result['filenum'], result['file'] = genFile(path)
    return result



tree = {}
tree['tree'] = mainGeneration(path)

with open("tmp.json",'w') as f:
    json.dump(tree,f)
