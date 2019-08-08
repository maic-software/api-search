import {
  WidjetFolder,
  WidjetFile,
  WidjetGetForm,
  FormInput
} from './App.js';
import $ from 'jquery';
const algoliasearch = require("algoliasearch");

const formArgList = [["API","api","apis","APIs"],
                     ["type","types","Types","Type"],
                     ["category","categories","Category","Categories"],
                     ["language","languages","Language","Languages"]];

// const dotenv = require('dotenv');
// console.log(dotenv.config());
//
// const {
//    APP_ADMIN_ID,
//    API_ADMIN_KEY,
//    INDEX_NAME
// } = process.env;
//
// console.log(APP_ADMIN_ID);
// console.log(API_ADMIN_KEY);
// console.log(INDEX_NAME);

const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apis5";

const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);



export function displayFacets(){
  var displayer = document.getElementById("facetsOpener");
  var facets = document.getElementById("facetsFilter");
  if(facets.style.display === 'none') {
    displayer.innerHTML = "Close";
    facets.style.display = "block";
    displayer.style.left = "230px";
  }
  else {
    displayer.innerHTML = "Open";
    facets.style.display = "none";
    displayer.style.left = "-25px";
  }
}


function getIndexFromTable(name) {
  for (let i = 0; i < formArgList.length ; i++){
    if (formArgList[i][0] === name) {
      return i;
    }
  }
  return -1;
}

function getStaticApiGet(url,index) {
  if (index !== 0) {
    //console.log("Not the API case.")
    return "";
  }
  var tmp = url.split("/");
  if (tmp.length === 1) {
    console.log("Error, url is not composed of / characters!");
    return "";
  }
  var testtmp = tmp[tmp.length-1].split(".");
  if (testtmp.length !== 1) {
    //console.log("No form argument provided.")
    return "";
  }
  return tmp[tmp.length-1];
}


function checkForm(name,form) {
  var array = form.split("&");
  var arrayCurrent;
  for (let i = 0; i < array.length ; i++) {
    arrayCurrent = array[i].split("=");
    if (arrayCurrent.length === 2) {
      if (arrayCurrent[0] === name) {
        return 1;
      }
    }
  }
  return 0;
}


function getUrlVars() {
    var vars = {};
    document.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}


export function getUrlArg(name) {
  var current;
  var index = getIndexFromTable(name);
  var url = document.location.href;
  var form = url.split("?");
  if (index === -1) {
    //console.log("Error, argument not present in the table!");
    return "";
  }
  if (form.length === 1) {
    return getStaticApiGet(url,index);
  }
  form = form[form.length-1];
  for (let i = 0; i < formArgList[index].length ; i++) {
    current = formArgList[index][i];
    if (checkForm(current,form)) {
      return getUrlVars()[current];
    }
  }
  //console.log("No argument founded for "+name);
  return "";
}


/******************************************************************************/
/*
 * (spoiler_tag_id) -> void
 *
 * This function display a spoiler content and change the innerHTML msg.
 */

export function getSpoil(id) {
  var divS = document.getElementById(id+"Spoiler");
  var msgS = document.getElementById(id+"SpoilerInnerMSG");
  if(divS.style.display === 'block'){
    divS.style.display = 'none';
    msgS.innerHTML = "Click for further info";
  }
  else {
    divS.style.display = 'block';
    msgS.innerHTML = "Click here to reduce";
  }
}




/******************************************************************************/
/*
 * (folder_tag_id) -> void
 *
 * This function display a folder tag content.
 */

export function displayFolder(id) {
  var divS = document.getElementById(id);
  if(divS.style.display === 'none'){
    divS.style.display = 'block';
  }
  else {
    divS.style.display = 'none';
  }
}



export function displayMenu(id) {
  var divS = document.getElementById(id);
  if(divS.style.display === 'block'){
    divS.style.display = 'none';
  }
  else {
    divS.style.display = 'block';
  }
}


/******************************************************************************/
/*
 * (template_id) -> void
 *
 * This function change the ranking of a template (and block it's own access).
 */

export function updateFavor(id,favor) {
  var divS = document.getElementById(id+"Star");
  if(divS.style.status === "used"){
   return;
  }
  else{
    var inc = parseInt(favor,10) + 1;
    divS.style.status = "used";
    divS.innerHTML = inc + "&#9733;";
    var upF = "0";
    index.getObject(id, ['favor'], (err, content) => {
      if (err) throw err;
      var upFInt = parseInt(content.favor, 10);
      upFInt += 1;
      upF = upFInt.toString(10);
      index.partialUpdateObject({
        favor: upF,
        objectID: id
      }, (err, content) => {
        if (err) throw err;
      });
    });
  }
}




/******************************************************************************/
/*
 * (file_tag_id,file_path) -> void
 *
 * This function read a file content and forward it to the associated html
 * object.
 */

export function getFileContent(id,path) {
  var url = path;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
    error:function(msg){
      alert( "Error on access !");
    },
    success:function(data){
      data.replace("<","&lt;");
      data.replace(">","&rt;");
      $("#"+id).text(data);
    }
  });
}




/******************************************************************************/
/*
 * (form_id,location_tree) -> inputs
 *
 * This function generate a list of form input object.
 */

export function getBasicInput(id,tree) {
  var inclusion = [];
  for(var i = 0; i < tree.argnum ; i++) {
    inclusion.push(new FormInput(id,tree.arg[i].name));
  }
  return inclusion;
}



function genStdrName(elem) {
  if (elem.pointInit === "no" && elem.pointCompose === "no") {
    return elem.name;
  }
  var name;
  if (elem.pointCompose === "yes") {
    name = elem.name[0].name;
    for(var i = 1; i < elem.nameNum ; i++) {
      name = name + "." + elem.name[i].name;
    }
  }
  else {
    name = elem.name;
  }
  if (elem.pointInit === "yes") {
    name = "." + name;
  }
  return name;
}


function genCompName(elem) {
  if (elem.pointInit === "no" && elem.pointCompose === "no") {
    return elem.name;
  }
  var name;
  if (elem.pointCompose === "yes") {
    name = elem.name[0].name;
    for(var i = 1; i < elem.nameNum ; i++) {
      name = name + "p" + elem.name[i].name;
    }
  }
  else {
    name = elem.name;
  }
  if (elem.pointInit === "yes") {
    name = "p" + name;
  }
  return name;
}


/******************************************************************************/
/*
 * (folder_tag_id,location_tree,path_to_folder) -> list_of_html_objects
 *
 * This function go recursively deeper inside the project to create the
 * associated tags for the project representation.
 */


export function revealSecret(id,tree,path) {
  var inclusion = [];
  var name;
  var nameCompatible;
  for(var i = 0; i < tree.foldernum ; i++) {
    name = genStdrName(tree.folder[i]);
    nameCompatible = genCompName(tree.folder[i]);
    if(name[0] !== "."){
      inclusion.push(new WidjetFolder(id,tree.folder[i],path+"/"+name,name,nameCompatible));
    }
  }
  for(i = 0; i < tree.filenum ; i++) {
    name = genStdrName(tree.file[i]);
    nameCompatible = genCompName(tree.file[i]);
    if(tree.file[i].type === 'getform') {
      if(name[0] !== "."){
        inclusion.push(new WidjetGetForm(id,tree.file[i],path+"/"+tree.file[i].name));
      }
    }
    else if(tree.file[i].type === 'file') {
      if(name[0] !== "."){
        inclusion.push(new WidjetFile(id,tree.file[i],path+"/"+name,name,nameCompatible));
      }
    }
    else {
      alert("File type unrecognised!");
    }
  }
  return inclusion;
}




/******************************************************************************/
/*
 * (object_inside_algolia_database) -> version_tag_object
 *
 * This function can be seen as the first iteration of "revealSecret" for the
 * recursive parcout.
 */

export function getVersion(hit) {
  var path = "/data/"+hit.API+"/"+hit.name;
  var inclusion = [];
  var i = 0;
  var current = hit.version[i];
  var id = hit.objectID;
  while(current != null) {
    if(current.tree.RMprovided === "yes") {
      inclusion.push(new WidjetFile(id+hit.API+hit.name+current.name,current.tree,path+"/"+current.tree.name+current.tree.RMpath,"README.md","READMEpmd"));
    }
    inclusion.push(new WidjetFolder(id+hit.API+hit.name+current.name,current.tree,path+"/"+current.tree.name,current.tree.name,current.tree.name));
    i++;
    current = hit.version[i];
  }
  return inclusion;
}
