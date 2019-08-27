import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {
  formArgList,
  getIndexFromTable,
  getStaticApiGet,
  checkForm,
  getUrlVars,
  getUrlArg
} from "../subfunc/urlForm.js";

function testGetIndexFromTable() {
  var listOfReality = ["Api","API","ApI","Appi","mynameisjeff","type","types","APIs","api","language"];
  var listOfTruth = [-1,0,-1,-1,-1,1,1,0,0,3];
  for (let i = 0 ; i < listOfTruth.lenth ; i++) {
    expect(getIndexFromTable(listOfReality[i])).toBe(listOfTruth[i]);
  }
}

function testGetStaticApiGet() {
  var listOfReality = [
                      "https://travis-ci.org/",
                      "https://developer.mozilla.org/fr/docs/Web/API/Console/assert",
                      "notAnUrl",
                      "http://tonto.com/twilio"
                      ]
  var listOfTruth = ["","assert","","twilio"];
  for (let i = 0 ; i < listOfTruth.length ; i++) {
    expect(getStaticApiGet(listOfReality[i])).toBe(listOfTruth[i]);
  }
}

function testCheckForm() {
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
    expect(checkForm(listOfReality[i])).toBe(listOfTruth[i]);
  }
}

function testGetUrlVars() {
  console.log("No implementation for getUrlVars()");
  return 0;
}

function testGetUrlArg() {
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
    document.location.href = backupUrl + listOfReality[i];
    expect(getUrlArg(listOfWishes[i])).toBe(listOfTruth[i]);
    document.location.href = backupUrl;
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Get the argument index in the table",testGetIndexFromTable);
  test("Get the forms",testGetStaticApiGet);
  test("Checking the forms",testCheckForm);
  test("Get the url form arg",testGetUrlArg);
  ReactDOM.unmountComponentAtNode(div);
});
