import { fillFullInfo, FullInfo } from '../struc/FullInfo.js';

function initFullPage(arg) {
  var result = new FullInfo(arg);
  fillFullInfo(arg);
  return result;
}

export function exposePage() {
  var url = document.location.href;
  var array = url.split("/");
  var arg = array[array.length-1];
  if (url === "http://localhost:3000/" || array[array.length-2] !== "p") {
    console.log("pass here");
    return "Secondo";
  }
  console.log(arg);
  return initFullPage(arg);
}

export function exposeSpecificPage(arg) {
  document.location.href = document.location.href + "p/" + arg;
}
