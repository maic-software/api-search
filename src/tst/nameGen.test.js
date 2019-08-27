import {
  genCompName,
  genStdrName
} from "../subfunc/nameGen.js";

function testGenStdrName() {
  var listOfTruth = ["myfile",".myfile","my.first.json.file",".my.first.json.file"];
  var jsonOfTruth = require("./nameTemplate.json");
  for (let i = 0 ; i < 4 ; i++) {
    expect(genStdrName(jsonOfTruth[i])).toBe(listOfTruth[i]);
  }
}

function testGenCompName() {
  var listOfTruth = ["myfile","pmyfile","mypfirstpjsonpfile","pmypfirstpjsonpfile"];
  var jsonOfTruth = require("./nameTemplate.json");
  for(let i = 0 ; i < 4 ; i++) {
    expect(genCompName(jsonOfTruth[i])).toBe(listOfTruth[i]);
  }
}

test("Standard name construction",testGenStdrName);
test("Compatible name construction",testGenCompName);
