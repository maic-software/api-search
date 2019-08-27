import { templateGetCode } from "./getCode.js";

/******************************************************************************/
/*
 * (spoiler_tag_id) -> void
 *
 * This function display a spoiler content and change the innerHTML msg.
 */


export function getSpoil(id) {
  var divS = document.getElementById(id+"Spoiler");
  if(divS.style.display === 'block'){
    divS.style.display = 'none';
  }
  else {
    templateGetCode(id);
    divS.style.display = 'block';
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


export function poperQuickStart() {
  setTimeout(function() {
    var div = document.getElementById("poper");
    div.style.display = "block";
  },5000);
}
