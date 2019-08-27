export function updateList(arrayId,id,path) {
  idList[arrayId].push(id);
  pathList[arrayId].push(path);
  return "";
}

export var arrayIdList = [];
export var idList = [];
export var pathList = [];
