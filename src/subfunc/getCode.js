import { hljs } from "../App.js";
import { FormInput } from "../App.js";
import $ from 'jquery';
import { arrayIdList, idList, pathList } from "../imp/sharedValues.js";

export function templateGetCode(id) {
  var i = 0;
  while (arrayIdList[i] !== id) {
    i += 1;
    if (i >= arrayIdList.length) {
      console.log("Error on arrayIdList detection!");
      return;
    }
  }
  for (let j = 0 ; j < idList[i].length ; j++) {
    getFileContent(idList[i][j],pathList[i][j]);
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
  console.log(path);
  $.ajax({
    type: "GET",
    url: url,
    dataType: "text",
    error:function(msg) {
      $("#"+id).text("Error on access!");
    },
    success:function(data) {
      var arraytmp = path.split("/");
      var name = arraytmp[arraytmp.length-1];
      var array = name.split(".");
      var lang = array[array.length-1];
      try {
        if (hljs.getLanguage(lang) !== void[0]) {
          data.replace("<","&lt;");
          data.replace(">","&rt;");
          document.getElementById(id).className = lang;
          document.getElementById(id+"Pre").className = "hljs";
          $('#'+id).text(data);
          hljs.highlightBlock(document.getElementById(id));
        }
        else {
          data.replace("<","&lt;");
          data.replace(">","&rt;");
          document.getElementById(id).className = "plaintext";
          document.getElementById(id+"Pre").className = "hljs";
          $("#"+id).text(data);
        }
      } catch (e) {
        console.log(id);
        console.log(e);
      }
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
  for (var i = 0; i < tree.argnum ; i++) {
    inclusion.push(new FormInput(id,tree.arg[i].name));
  }
  return inclusion;
}
