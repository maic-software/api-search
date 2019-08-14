

function genName(name) {
  var result = {};
  if (name[0] === ".") {
    result["pointInit"] = "yes";
  }
  else {
    result["pointInit"] = "no";
  }
  var array = name.split(".");
  if (array.length === 1) {
    result["pointCompose"] = "no";
    result["name"] = name;
    return result;
  }
  result["pointCompose"] = "yes";
  var arraylist = [];
  for (let i = 0 ; i < array.length ; i++) {
    if (name[0] !== "." || i !== 0) {
      let tmp = {};
      tmp["name"] = array[i];
      arraylist.push(tmp);
    }
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

function genFolder(path,tree) {

}

function genFile(path,tree) {

}

function mainGeneration(path,tree) {

}

export function genTree(path) {

}
