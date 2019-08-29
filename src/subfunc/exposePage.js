import { fillFullInfo, FullInfo } from '../struc/FullInfo.js';

/******************************************************************************/
/*
 * (template_id) -> full_page_info
 *
 * Init a full page info, get the basic info in it, and return.
 */

function initFullPage(arg) {
  var result = new FullInfo(arg);
  fillFullInfo(arg);
  return result;
}

/******************************************************************************/
/*
 * (void) -> full_page_info || nothing
 *
 * Test if the location is for a full page. Will render a full page info if so.
 * Otherwise it's not important, just return something.
 */

export function exposePage() {
  var url = document.location.href;
  var array = url.split("/");
  var arg = array[array.length-1];
  if (url === "http://localhost:3000/" || array[array.length-2] !== "p") {
    return "Secondo";
  }
  return initFullPage(arg);
}

/******************************************************************************/
/*
 * (template_id) -> void
 *
 * Change the location to a specific full info page.
 */

export function exposeSpecificPage(arg) {
  document.getElementById("poper").style.display = "none";
  document.location.href = document.location.href + "p/" + arg;
}
