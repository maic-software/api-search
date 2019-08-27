import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const algoliasearch = require("algoliasearch");
const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apistest1";
const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

function testDisplayFacets() {
  var displayer = document.getElementById("facetsOpener");
  var facets = document.getElementById("facetsFilter");

  expect(facets.style.display).toBe("none");
  expect(displayer.innerHTML).toBe("Close");
  expect(displayer.style.left).toBe("230px");

  displayFacets();

  expect(facets.style.display).toBe("block");
  expect(displayer.innerHTML).toBe("Open");
  expect(displayer.style.left).toBe("-25px");

  displayFacets();

  expect(facets.style.display).toBe("none");
  expect(displayer.innerHTML).toBe("Close");
  expect(displayer.style.left).toBe("230px");
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  test("Facet displayer",testDisplayFacets);
  ReactDOM.unmountComponentAtNode(div);
});
