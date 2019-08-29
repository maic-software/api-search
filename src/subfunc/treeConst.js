import { genStdrName, genCompName } from "./nameGen.js";
import {
  WidjetFileGlobal,
  WidjetFolderGlobal,
  WidjetFileStandard,
  WidjetFolderStandard,
  WidjetGetForm
} from "../struc/Widjet.js";
import { arrayIdList, idList, pathList } from "../imp/sharedValues.js";


/******************************************************************************/
/*
 * (folder_tag_id,location_tree,path_to_folder,arrayId) -> list_of_html_objects
 *
 * This function go recursively deeper inside the project to create the
 * associated tags for the project representation.
 * Carries an arrayId for the globalNumber feature.
 */


export function revealSecretGlobal(id,tree,path,arrayId) {
  var inclusion = [];
  var name;
  var nameCompatible;
  for(var i = 0; i < tree.foldernum ; i++) {
    name = genStdrName(tree.folder[i]);
    nameCompatible = genCompName(tree.folder[i]);
    if(name[0] !== "."){
      inclusion.push(new WidjetFolderGlobal(id,tree.folder[i],path+"/"+name,name,nameCompatible,arrayId));
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
        inclusion.push(new WidjetFileGlobal(id,tree.file[i],path+"/"+name,name,nameCompatible,arrayId));
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
 * (folder_tag_id,location_tree,path_to_folder) -> list_of_html_objects
 *
 * This function go recursively deeper inside the project to create the
 * associated tags for the project representation.
 */

export function revealSecretStandard(id,tree,path) {
  var inclusion = [];
  var name;
  var nameCompatible;
  for(var i = 0; i < tree.foldernum ; i++) {
    name = genStdrName(tree.folder[i]);
    nameCompatible = genCompName(tree.folder[i]);
    if(name[0] !== "."){
      inclusion.push(new WidjetFolderStandard(id,tree.folder[i],path+"/"+name,name,nameCompatible));
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
        inclusion.push(new WidjetFileStandard(id,tree.file[i],path+"/"+name,name,nameCompatible));
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
 * (object_inside_algolia_database,globalNumber) -> version_tag_object
 *
 * This function can be seen as the first iteration of "revealSecret" for the
 * recursive parcout.
 * Update the globalNumber features (arrayIdList, idList and pathList).
 */

export function getVersion(hit,globalNumber) {
  var path = "/data/"+hit.API+"/"+hit.name;
  var inclusion = [];
  var i = 0;
  var current = hit.version[i];
  var id = hit.objectID;
  while(current != null) {
    arrayIdList.push(id);
    idList.push([]);
    pathList.push([]);
    if(current.tree.RMprovided === "yes") {
      inclusion.push(new WidjetFileGlobal(id+hit.API+hit.name+current.tree.name,current.tree,path+"/"+current.tree.name+current.tree.RMpath,"README.md","READMEpmd",globalNumber));
    }
    inclusion.push(new WidjetFolderGlobal(id+hit.API+hit.name,current.tree,path+"/"+current.tree.name,current.tree.name,current.tree.name,globalNumber));
    i++;
    current = hit.version[i];
  }
  return inclusion;
}
