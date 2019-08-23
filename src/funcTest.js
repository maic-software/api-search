import {
  initFullPage,
  updateList,
  displayFacets,
  getIndexFromTable,
  getStaticApiGet,
  checkForm,
  getUrlVars,
  getUrlArg,
  initDisplayUrl,
  exposeSpecificPage,
  exposePage,
  templateGetCode,
  getSpoil,
  displayFolder,
  displayMenu,
  updateFavor,
  getFileContent,
  getBasicInput,
  genStdrName,
  genCompName,
  revealSecret,
  getVersion
} from "./script.js";


export function testInitFullPage() {
  console.log("No implementation for initFullPage()");
  return 0;
}

export function testUpdateList() {
  var idList = [];
  var pathList = [];
  for(let i = 0 ; i < 5 ; i++) {
    idList.push([]);
    pathList.push([]);
  }
  console.assert(updateList(3,"certainlyNotAnId","certainlyNotAPath") === "");
  console.assert(updateList(0,"certainlyAnId","certainlyAPath") === "");
  console.assert(updateList(0,"certainlyAnIdTwice","certainlyAPathTwice") === "");
  idList.push([]);
  pathList.push([]);
  console.assert(updateList(5,"anIdForSure","aPathForSure") === "");
  console.assert(updateList(1,"thatsAnId","thatsaPath") === "");
  console.assert(updateList(0,"certainlyAnIdAgain","certainlyAPathAgain") === "");
  idList.push([]);
  pathList.push([]);

  console.assert(idList.length === 7 && pathList.length === 7);

  console.assert(idList[0].legth === 3 && pathList.length === 3);
  console.assert(idList[0][0] === "certainlyAnId" && pathList[0][0] === "certainlyAPath");
  console.assert(idList[0][1] === "certainlyAnIdTwice" && pathList[0][1] === "certainlyAPathTwice");
  console.assert(idList[0][2] === "certainlyAnIdAgain" && pathList[0][2] === "certainlyAPathAgain");

  console.assert(idList[1].length === 1 && pathList[1].length === 1);
  console.assert(idList[1][0] === "anIdForSure" && pathList[1][0] === "aPathForSure");

  console.assert(idList[2].length === 0 && pathList[2].length === 0);

  console.assert(idList[3].length === 1 && pathList[2].length === 1);
  console.assert(idList[3][0] === "certainlyNotAnId" && pathList[3][0] === "certainlyNotAPath");

  console.assert(idList[4].length === 0 && pathList[4].length === 0);

  console.assert(idList[5].length === 1 && pathList[2].length === 1);
  console.assert(idList[5][0] === "anIdForSure" && pathList[5][0] === "aPathForSure");

  console.assert(idList[6].length === 0 && pathList[6].length === 0);

  return 0;
}

export function testDisplayFacets() {
  var displayer = document.getElementById("facetsOpener");
  var facets = document.getElementById("facetsFilter");

  console.assert(facets.style.display !== 'none' && displayer.innerHTML === "Close" && displayer.style.left === "230ps");

  displayFacets();

  console.assert(facets.style.display === "none" && displayer.innerHTML === "Open" && displayer.style.left === "-25px");

  displayFacets();

  console.assert(facets.style.display !== 'none' && displayer.innerHTML === "Close" && displayer.style.left === "230ps");

  return 0;
}

export function testGetIndexFromTable() {
  var formArgList = [["API","api","apis","APIs"],
                     ["type","types","Types","Type"],
                     ["category","categories","Category","Categories"],
                     ["language","languages","Language","Languages"]
                    ];
  var listOfReality = ["Api","API","ApI","Appi","mynameisjeff","type","types","APIs","api","language"];
  var listOfTruth = [-1,0,-1,-1,-1,1,1,0,0,3];
  for (let i = 0 ; i < listOfTruth.lenth ; i++) {
    console.assert(listOfTruth[i] === getIndexFromTable(listOfReality[i]));
  }
  return 0;
}

export function testGetStaticApiGet() {
  var listOfReality = [
                      "https://travis-ci.org/",
                      "https://developer.mozilla.org/fr/docs/Web/API/Console/assert",
                      "notAnUrl",
                      "http://tonto.com/twilio"
                      ]
  var listOfTruth = ["","assert","","twilio"];
  for (let i = 0 ; i < listOfTruth.length ; i++) {
    console.assert(listOfTruth[i] === getStaticApiGet(listOfReality[i]));
  }
  return 0;
}

export function testCheckForm() {
  var listOfReality = [
                      "?api=twilio",
                      "api=twilio",
                      "?api=twilio&language=Matlab",
                      "api=twilio&language=Matlab",
                      "api=twilio&lang=Matlab&language=Matlab",
                      "api=twilio=api",
                      "api=twilio&language=Matlab=twilio"
                    ];
  var listOfTruth = [0,1,0,1,1,0,1];
  for (let i = 0 ; i < listOfTruth.length ; i++) {
    console.assert(listOfTruth[i] === checkForm(listOfReality[i]));
  }
  return 0;
}

export function testGetUrlVars() {
  console.log("No implementation for getUrlVars()");
  return 0;
}

export function testGetUrlArg() {
  var backupUrl = document.location.href;
  var listOfReality = [
                      "?api=twilio",
                      "api=twilio",
                      "?api=twilio&language=Matlab",
                      "api=twilio&language=Matlab",
                      "api=twilio&lang=Matlab&language=Matlab",
                      "api=twilio=api",
                      "api=twilio&language=Matlab=twilio",
                      "api=twilio",
                      "api=twilio&langue=Matlab"
                      ];
  var listOfTruth = ["","twilio","","Matlab","Matlab","","twilio","",""];
  var listOfWishes = ["api","api","language","languages","language","api","apis","language","crayfish"];
  for (let i = 0 ; i < listOfTruth.length ; i++) {
    document.location.href = document.location.href + listOfReality[i];
    console.assert(listOfTruth[i] === getUrlArg(listOfWishes[i]));
  }
  document.location.href = backupUrl;
  return 0;
}

export function testInitDisplayUrl() {
  var backupUrl = document.location.href;
  var fullpage = document.getElementById("fullpage");
  var research = document.getElementById("research");

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  document.location.href = backupUrl + "something";

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  document.location.href = document.location.href + "p";

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  document.location.href = backupUrl;

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  document.location.href = backupUrl + "p";

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  document.location.href = backupUrl + "p/"

  console.assert(fullpage.style.display === "" && research.style.display === "none");

  document.location.href = document.location.href + "smsbot";

  console.assert(fullpage.style.display === "" && research.style.display === "none");

  document.location.href = backupUrl;

  console.assert(fullpage.style.display === "none" && research.style.display === "");

  return 0;
}

export function testExposeSpecificPage() {
  var backupUrl = document.location.href;

  exposeSpecificPage("smsbot");

  console.assert(document.location.href === backupUrl + "p/" + arg);

  document.location.href = backupUrl;

  return 0;
}

export function testExposePage() {
  console.log("No implementation for exposePage()");
  return 0;
}

export function testTemplateGetCode() {
  console.log("No implementation for templateGetCode()");
  return 0;
}

export function testGetSpoil() {
  console.log("No implementation for getSpoil()");
  return 0;
}

export function testDisplayFolder() {
  console.log("No implementation for displayFolder()");
  return 0;
}

export function testDisplayMenu() {
  console.log("No implementation for displayMenu()");
  return 0;
}

export function testUpdateFavor() {
  console.log("No implementation for updateFavor()");
  return 0;
}

export function testGetFileContent() {
  console.log("No implementation for getFileContent()");
  return 0;
}

export function testGetBasicInput() {
  console.log("No implementation for getBasicInput()");
  return 0;
}

export function testGenStdrName() {
  var listOfTruth = ["myfile",".myfile","my.first.json.file",".my.first.json.file"];
  var jsonOfTruth = require("./nameTemplate.json");
  for(let i = 0 ; i < 4 ; i++) {
    console.assert(listOfTruth[i] === genStdrName(jsonOfTruth[i]));
  }
  return 0;
}

export function testGenCompName() {
  var listOfTruth = ["myfile","pmyfile","mypfirstpjsonpfile","pmypfirstpjsonpfile"];
  var jsonOfTruth = require("./nameTemplate.json");
  for(let i = 0 ; i < 4 ; i++) {
    console.assert(listOfTruth[i] === genCompName(jsonOfTruth[i]));
  }
  return 0;
}

export function testRevealSecret() {
  console.log("No implementation for revealSecret()");
  return 0;
}

export function testGetVersion() {
  console.log("No implementation for getVersion()");
  return 0;
}
