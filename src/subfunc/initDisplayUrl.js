/******************************************************************************/
/*
 * (section_id) -> display_text
 *
 * Chose which section (research or fullpage), has to be displayed.
 */

export function initDisplayUrl(section) {
  var url = document.location.href;
  var array = url.split("/");
  if ((url === "http://localhost:3000/" || array[array.length-2] !== 'p') && section === "fullpage") {
    return "none";
  }
  else if (array[array.length-2] === 'p'  && section === "research") {
    return "none";
  }
  return "";
}
