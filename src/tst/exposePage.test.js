import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {
  initFullPage
} from "../script.js";


function testExposePage() {
  var backupUrl = document.location.href;
  var expectation = initFullPage("smsbot");

  expect(exposePage()).toBe("Secundo");

  document.location.href = backupUrl + "p/smsbot";

  expect(exposePage()).toBe(expectation);

  document.location.href = backupUrl;
}


function testExposeSpecificPage() {
  var backupUrl = document.location.href;

  exposeSpecificPage("smsbot");

  expect(document.location.href).toBe(backupUrl+"p/"+arg);

  document.location.href = backupUrl;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Initial exposition",testExposePage);
  test("Exposition of a specific fullPage",testExposeSpecificPage);
  ReactDOM.unmountComponentAtNode(div);
});
