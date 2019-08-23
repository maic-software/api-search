import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

require("./funcTest.js");


function globalTest() {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div)
  testInitFullPage();
  testUpdateList();
  testDisplayFacets();
  testGetIndexFromTable();
  testGetStaticApiGet();
  testCheckForm();
  testGetUrlVars();
  testGetUrlArg();
  testInitDisplayUrl();
  testExposeSpecificPage();
  testExposePage();
  testTemplateGetCode();
  testGetSpoil();
  testDisplayFolder();
  testDisplayMenu();
  testUpdateFavor();
  testGetFileContent();
  testGetBasicInput();
  testGenStdrName();
  testGenCompName();
  testRevealSecret();
  testGetVersion();
  ReactDOM.unmountComponentAtNode(div);
}

globalTest();
