const potch = require('path');
const fs = require('fs');

var rmFlag = 0;
var pathToRm = "";
var pathInit = "";

function genName(name) {
  var result = {};
  if (name[0] === ".") {
    result["pointInit"] = "yes";
  }
  else {
    result["pointInit"] = "no";
  }
  var array = name.split(".");
  if (array.length === 1 || (array.length === 2 && name[0] === ".")) {
    result["pointCompose"] = "no";
    result["name"] = name;
    return result;
  }
  result["pointCompose"] = "yes";
  var arraylist = [];
  let i = 0;
  if (name[0] === ".") {
    i += 1;
  }
  for (; i < array.length ; i++) {
    let tmp = {};
    tmp["name"] = array[i];
    arraylist.push(tmp);
  }
  let tmp = array.length;
  if (name[0] === ".") {
    tmp -= 1;
  }
  result["nameNum"] = tmp;
  result["name"] = arraylist;
  return result;
}

function exceptionFilter(name) {
  if (name == ".git") {
    return 0;
  }
  if (name == ".gitignore") {
    return 0;
  }
  if (name == "yarn.lock") {
    return 0;
  }
  if (name == "node_modules") {
    return 0;
  }
  if (name == ".npmignore") {
    return 0;
  }
  var ar = name.split(".")
  var exct = ar[ar.length-1]
  if (exct == "jar") {
    return 0;
  }
  if (exct == "png") {
    return 0;
  }
  if (exct == "jpg") {
    return 0;
  }
  if (exct == "vod") {
    return 0;
  }
  if (exct == "jpeg") {
    return 0;
  }
  if (exct == "gif") {
    return 0;
  }
  if (exct == "ico") {
    return 0;
  }
  return 1;
}

function genFolder(path) {
  var array = [];
  var files = fs.readdirSync(path);
  for(var i in files) {
    let name = path + '/' + files[i];
    if (fs.lstatSync(name).isDirectory() && exceptionFilter(files[i])) {
      array.push(mainGeneration(name));
    }
  }
  return array;
}

function genFile(path) {
  var array = [];
  var files = fs.readdirSync(path);
  for (var i in files){
    let name = path + '/' + files[i];
    if (fs.lstatSync(name).isFile() && exceptionFilter(files[i])) {
      if (rmFlag === 0 && (files[i] === "README.md" || files[i] === "README.MD")) {
        let pathProj = path.replace(pathInit,"");
        pathToRm = pathProj + "/" + files[i];
        rmFlag = 1;
      }
      else {
        let tmp = genName(files[i]);
        tmp['type'] = 'file';
        array.push(tmp);
      }
    }
  }
  return array;
}

function mainGeneration(path) {
  var name = potch.basename(path);
  var result = genName(name);
  result['folder'] = genFolder(path);
  result['foldernum'] = result['folder'].length;
  result['file'] = genFile(path);
  result['filenum'] = result['file'].length;
  return result;
}

function genTree(path) {
  pathInit = path;
  var tree = {};
  tree['tree'] = mainGeneration(path);
  if (rmFlag === 1) {
    tree['tree']['RMprovided'] = "yes";
    tree['tree']['RMpath'] = pathToRm;
  }
  else {
    tree['tree']['RMprovided'] = "no";
  }
  return tree;
}

module.exports = genTree;
