import {
  WidjetFolder,
  WidjetFile,
  WidjetGetForm,
  FormInput
} from './App.js';
import $ from 'jquery';
const algoliasearch = require("algoliasearch");
const client = algoliasearch("LYITGBJZF1","67baaf6fb4bc87e9b148aa237251b326");
const index = client.initIndex("apis2");




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

export function updateFavor(id) {
  var divS = document.getElementById(id+"Star");
  if(divS.style.status === "used"){
   return;
  }
  else{
    divS.style.status = "used";
    divS.innerHTML = "&#9733";
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
  if(document.getElementById(id).innerHTML !== "") {
    $('#'+id).text('');
  }
  else {
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




/******************************************************************************/
/*
 * (folder_tag_id,location_tree,path_to_folder) -> list_of_html_objects
 *
 * This function go recursively deeper inside the project to create the
 * associated tags for the project representation.
 */


export function revealSecret(id,tree,path) {
  var inclusion = [];
  for(var i = 0; i < tree.foldernum ; i++) {
    inclusion.push(new WidjetFolder(id,tree.folder[i],path+"/"+tree.folder[i].name));
  }
  for(i = 0; i < tree.filenum ; i++) {
    if(tree.file[i].type === 'getform') {
      inclusion.push(new WidjetGetForm(id,tree.file[i],path+"/"+tree.file[i].name));
    }
    else if(tree.file[i].type === 'file') {
      inclusion.push(new WidjetFile(id,tree.file[i],path+"/"+tree.file[i].name+"."+tree.file[i].lang));
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
    inclusion.push(new WidjetFolder(id+hit.API+hit.name,current.tree,path+"/"+current.tree.name));
    i++;
    current = hit.version[i];
  }
  return inclusion;
}
