import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {
  initDisplayUrl
} from "../subfunc/initDisplayUrl.js";

function testInitDisplayUrl() {
  var backupUrl = document.location.href;
  var fullpage = document.getElementById("fullpage");
  var research = document.getElementById("research");

  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");
  console.assert(fullpage.style.display === "none" && research.style.display === "");


  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");
  console.assert(fullpage.style.display === "none" && research.style.display === "");


  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");

  document.location.href = backupUrl;

  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");

  document.location.href = backupUrl + "p";

  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");

  document.location.href = backupUrl + "p/"

  expect(full.style.display).toBe("");
  expect(research.style.display).toBe("none");

  document.location.href = document.location.href + "smsbot";

  expect(full.style.display).toBe("");
  expect(research.style.display).toBe("none");

  document.location.href = backupUrl;

  expect(full.style.display).toBe("none");
  expect(research.style.display).toBe("");
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Display initialisation",testInitDisplayUrl);
  ReactDOM.unmountComponentAtNode(div);
});
