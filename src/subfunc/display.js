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

/******************************************************************************/
/*
 * (void) => void
 *
 * Display the facet filter and move the facet opener.
 */

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

/******************************************************************************/
/*
 * (void) -> void
 *
 * Display asynchronously a poper.
 */

export function poperQuickStart() {
  var iterator = 80;
  setTimeout(function() {
    if (document.getElementById("research").style.display !== "none") {
      document.getElementById("poper").style.right = "85%";
      document.getElementById("poper").style.display = "block";
      poperAnimRec(iterator);
    }
  },5000);
}

function poperAnimRec(iterator) {
  if (iterator >= 0) {
    setTimeout(function() {
      var perc = document.getElementById("poper").style.right;
      var valint = parseInt(perc.replace("%",""),10);
      valint -= 1;
      var valstr = valint.toString() + "%";
      document.getElementById("poper").style.right = valstr;
      poperAnimRec(iterator-1);
    },1);
  }
}
