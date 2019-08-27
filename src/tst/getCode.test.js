import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {
  templateGetCode,
  getFileContent,
  getBasicInput
} from "../subfunc/getCode.js";
import { wait } from "../util/waiter.js";


function testTemplateGetCode() {
  var divTest1 = document.getElementById("smsbotTwiliosmsbotv1CodeREADMEpmd");
  var divTest2 = document.getElementById("smsbotTwiliosmsbotv1TCodehandlerpjs");
  var divTest3 = document.getElementById("smsbotTwiliosmsbotv1TCodeserverlesspyml");
  var divTest4 = document.getElementById("smsbotTwiliosmsbotv1TCodeLICENSE");
  var divTest5 = document.getElementById("smsbotTwiliosmsbotv1TCodepackagepjson");

  expect(divTest1.innerHTML).toBe("");
  expect(divTest2.innerHTML).toBe("");
  expect(divTest3.innerHTML).toBe("");
  expect(divTest4.innerHTML).toBe("");
  expect(divTest5.innerHTML).toBe("");

  templateGetCode("smsbot");

  wait(1000);

  expect(divTest1.innerHTML).toNotBe("");
  expect(divTest2.innerHTML).toNotBe("");
  expect(divTest3.innerHTML).toNotBe("");
  expect(divTest4.innerHTML).toNotBe("");
  expect(divTest5.innerHTML).toNotBe("");
}


function testGetFileContent() {
  var codeTest1 = document.getElementById("smsbotTwiliosmsbotv1CodeREADMEpmd");
  var preTest1 = document.getElementById("smsbotTwiliosmsbotv1CodeREADMEpmdPre");
  var codeTest2 = document.getElementById("smsbotTwiliosmsbotv1TCodeLICENSE");
  var preTest2 = document.getElementById("smsbotTwiliosmsbotv1TCodeLICENSEPre");
  var codeTest3 = document.getElementById("smsbotTwiliosmsbotv1TCodepackagepjson");
  var preTest3 = document.getElementById("smsbotTwiliosmsbotv1TCodepackagepjsonPre");

  expect(codeTest1.innerHTML).toBe("");
  expect(codeTest1.className).toNotExist();
  expect(preTest1.className).toNotExist();
  expect(codeTest2.innerHTML).toBe("");
  expect(codeTest2.className).toNotExist();
  expect(preTest2.className).toNotExist();
  expect(codeTest3.innerHTML).toBe("");
  expect(codeTest3.className).toNotExist();
  expect(preTest3.className).toNotExist();

  getFileContent("smsbotTwiliosmsbotv1CodeREADMEpmd","/data/Twilio/smsbot/v1/README.md");
  getFileContent("smsbotTwiliosmsbotv1TCodeLICENSE","/data/Twilio/smsbot/v1/LICENSE");
  getFileContent("smsbotTwiliosmsbotv1TCodepackagepjson","/data/Twilio/smsbot/v1/package.json");

  wait(1000);

  expect(codeTest1.innerHTML).toNotBe("");
  expect(codeTest1.className).toBe("md");
  expect(preTest1.className).toBe("hljs");
  expect(codeTest2.innerHTML).toNotBe("");
  expect(codeTest2.className).toBe("plaintext");
  expect(preTest2.className).toBe("hljs");
  expect(codeTest3.innerHTML).toNotBe("");
  expect(codeTest3.className).toBe("json");
  expect(preTest3.className).toBe("hljs");
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Present file on the site",testTemplateGetCode);
  test("Getting file content",testGetFileContent);
  ReactDOM.unmountComponentAtNode(div);
});
