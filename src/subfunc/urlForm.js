export const formArgList = [["API","api","apis","APIs"],
                            ["type","types","Types","Type"],
                            ["category","categories","Category","Categories"],
                            ["language","languages","Language","Languages"]];


/******************************************************************************/
/*
 * (facet_name) -> index
 *
 * Check if the given facet is one (or a form) of the presented facets.
 */

export function getIndexFromTable(name) {
  for (let i = 0 ; i < formArgList.length ; i++) {
    for (let j = 0 ; j < formArgList[i].length ; j++) {
      if (formArgList[i][j] === name) {
        return i;
      }
    }
  }
  return -1;
}

/******************************************************************************/
/*
 * (url,index) -> query
 *
 * Get the query form.
 */

export function getStaticApiGet(url,index) {
  if (index !== 0) {
    return "";
  }
  var tmp = url.split("/");
  if (tmp.length === 1) {
    return "";
  }
  var testtmp = tmp[tmp.length-1].split(".");
  if (testtmp.length !== 1) {
    return "";
  }
  return tmp[tmp.length-1];
}

/******************************************************************************/
/*
 * (facet_name,query_form) -> boolean
 *
 * Check if the query form meets the requirements.
 */

export function checkForm(name,form) {
  var array = form.split("&");
  var arrayCurrent;
  for (let i = 0; i < array.length ; i++) {
    arrayCurrent = array[i].split("=");
    if (arrayCurrent[0] === name && arrayCurrent.length ===2) {
      return 1;
    }
  }
  return 0;
}

/******************************************************************************/
/*
 * () -> variables
 *
 * Gets the variables of the url (so the app can use it for the facets).
 */

export function getUrlVars() {
    var vars = {};
    document.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}

/******************************************************************************/
/*
 * (facet_name) -> value
 *
 * Gets the value of the given facet name.
 */

export function getUrlArg(name) {
  var current;
  var index = getIndexFromTable(name);
  var url = document.location.href;
  var form = url.split("?");
  if (index === -1) {
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
  return "";
}
