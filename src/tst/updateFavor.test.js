import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { wait } from "../util/waiter.js";

const algoliasearch = require("algoliasearch");
const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apistest1";
const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

function testUpdateFavor() {
  var valueInit, valueNext;

  expect(document.getElementById(smsbot+"Star").style.status).toNotExist();

  index.getObject("smsbot", ['favor'],(err, content) => {
    if (err) throw err;
    valueInit = content;
  });

  wait(500);

  updateFavor("smsbot",valueInit);

  wait(500);

  index.getObject("smsbot", ['favor'],(err, content) => {
    if (err) throw err;
    valueNext = content;
  });

  wait(500);

  expect(valueInit+1).toBe(valueNext);
  expect(document.getElementById(smsbot+"Star").style.status).toBe("used");

  updateFavor("smsbot",valueInit);

  wait(500);

  index.getObject("smsbot", ['favor'],(err, content) => {
    if (err) throw err;
    valueNext = content;
  });

  wait(500);

  expect(valueInit+1).toBe(valueNext);
  expect(document.getElementById(smsbot+"Star").style.status).toBe("used");

  return 0;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Increase the favor",testUpdateFavor);
  ReactDOM.unmountComponentAtNode(div);
});
