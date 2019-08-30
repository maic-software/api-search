const algoliasearch = require("algoliasearch");

export function updateList(arrayId,id,path) {
  idList[arrayId].push(id);
  pathList[arrayId].push(path);
  return "";
}

export var arrayIdList = [];
export var idList = [];
export var pathList = [];

export const APP_ID = "LYITGBJZF1";
//const API_KEY = "c0d0c32d6bc8e80c30eabe69af5724d2";
export const API_KEY = "67baaf6fb4bc87e9b148aa237251b326";
export const INDEX_NAME = "apis6";

const client = algoliasearch(APP_ID,API_KEY);
export const index = client.initIndex(INDEX_NAME);
