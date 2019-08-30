import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Menu,
  InfiniteHits,
  Stats
} from 'react-instantsearch-dom';
import { Hit } from "./struc/Hit.js";
import './css/App.css';
import "./css/add.css";
import { displayMenu, displayFacets, poperQuickStart, displayFolder } from './subfunc/display.js';
import { exposePage } from "./subfunc/exposePage.js";
import { initDisplayUrl } from "./subfunc/initDisplayUrl.js";
import { getUrlArg } from "./subfunc/urlForm.js";
import { index, APP_ID, API_KEY, INDEX_NAME } from "./imp/sharedValues.js";

const introJs = require("intro.js");
export const hljs = require('highlight.js');

// const dotenv = require('dotenv');
// dotenv.config();
//
// const {
//   APP_ID,
//   API_KEY,
//   INDEX_NAME
// } = process.env;
//
// console.log(APP_ID);
// console.log(API_KEY);
// console.log(INDEX_NAME);

// const APP_ID = "LYITGBJZF1";
// //const API_KEY = "c0d0c32d6bc8e80c30eabe69af5724d2";
// const API_KEY = "67baaf6fb4bc87e9b148aa237251b326";
// const INDEX_NAME = "apis6";
//
// const client = algoliasearch(APP_ID,API_KEY);
// const index = client.initIndex(INDEX_NAME);



index.setSettings({
  hitsPerPage: 5
});


/******************************************************************************/
/*
 * (form_id,name_of_the_input) -> input_of_the_given_name_html_object
 *
 * This function create a basic input html object.
 */

export const FormInput = (id,name) => {
  return (
    <p key={id+name}>
      <input className="gen" type="text" name={name}/>
    </p>
  )
}




/******************************************************************************/
/*
 * () -> webpage
 *
 * This class is a representation of the webpage.
 */

class App extends Component {
  render() {
    return (
      <div>
        <div className="h-screen overflow-hidden">
          <InstantSearch
            appId={APP_ID}
            apiKey={API_KEY}
            indexName={INDEX_NAME}
          >
            <link href="/styles/introjs.css" rel="stylesheet"/>
            <div id="research" className="flex flex-col h-screen font-sans" style={{display:initDisplayUrl("research")}}>
              <header className="flex bg-white w-full border-grey-light border-solid border-b flex-no-shrink">
                <div className="p-4 md:w-64 lg:w-64 xxl:w-80 items-center flex-no-shrink border-grey-light border-solid border-r hidden md:flex justify-center">
                  <h1 className="text-base text-grey-darker uppercase tracking-wide">
                    MAIC Software
                  </h1>
                </div>
                <div
                  data-step="1"
                  data-disable-interaction
                  data-intro="The most important feature here. You can basicaly search for anything you want. It can be an API or a type of service."
                  className="flex flex-grow justify-between border-grey-light border-solid border-r"
                  >
                  <SearchBox
                    className="h-full flex-grow"
                    autoFocus={true}
                    translations={{
                      placeholder: 'Search for a template name'
                    }}
                  />
                </div>
              </header>
              <div className="flex flex-grow">
                <aside
                  data-step="2"
                  data-intro="Here are the filters. You can filter your template by just clicking on one of the filters, and then choose for your attribut."
                  id="facetsFilter"
                  className="md:w-64 lg:w-64 xxl:w-80 flex-no-shrink bg-white border-grey-light border-solid border-r z-10 max-h-screen md:block overflow-hidden"
                  >
                  <div className="h-full overflow-y-auto">
                    <div style={{padding:"10px 15px"}}>
                      <Stats/>
                    </div>
                    <h4 className="font-normal uppercase text-xs tracking-wide text-grey-dark px-4 pt-4 pb-1 border-grey-light border-solid border-t clickable" onClick={() => {displayFolder("APIMenu")}}>
                      APIs
                    </h4>
                    <div id="APIMenu">
                      <Menu
                        attribute="API"
                        limit={8}
                        searchable={true}
                        defaultRefinement={getUrlArg("API")}
                        translations={{
                          placeholder: 'Search for APIs'
                        }}
                      />
                    </div>
                    <h4 className="font-normal uppercase text-xs tracking-wide text-grey-dark px-4 pt-4 pb-1 border-grey-light border-solid border-t clickable" onClick={() => {displayMenu("typeMenu")}}>
                      Types
                    </h4>
                    <div id="typeMenu" className="facetMenu">
                      <Menu
                        attribute="type"
                        limit={8}
                        searchable={true}
                        defaultRefinement={getUrlArg("type")}
                        translations={{
                          placeholder: 'Search for types'
                        }}
                      />
                    </div>
                    <h4 className="font-normal uppercase text-xs tracking-wide text-grey-dark px-4 pt-4 pb-1 border-grey-light border-solid border-t clickable" onClick={() => {displayMenu("categoryMenu")}}>
                      Categories
                    </h4>
                    <div id="categoryMenu" className="facetMenu">
                      <Menu
                        attribute="categorie"
                        limit={8}
                        searchable={true}
                        defaultRefinement={getUrlArg("category")}
                        translations={{
                          placeholder: 'Category searching'
                        }}
                      />
                    </div>
                    <h4 className="font-normal uppercase text-xs tracking-wide text-grey-dark px-4 pt-4 pb-1 border-grey-light border-solid border-t clickable" onClick={() => {displayMenu("languageMenu")}}>
                      Languages
                    </h4>
                    <div id="languageMenu" className="facetMenu">
                      <Menu
                        attribute="language"
                        limit={8}
                        searchable={true}
                        defaultRefinement={getUrlArg("language")}
                        translations={{
                          placeholder: 'Template language'
                        }}
                      />
                    </div>
                  </div>
                </aside>
                <a
                  data-step="3"
                  data-disable-interaction
                  data-intro="Click here to display or hide the filter menu."
                  id="facetsOpener"
                  className="opener"
                  onClick={() => {displayFacets()}}
                  >
                  Close
                </a>
                <a id="poper" className="poper" onClick={() => {introJs.introJs().start()}}>
                  Need help getting started?
                  {poperQuickStart()}
                </a>
                <main className="bg-grey-lighter flex-grow max-h-screen overflow-hidden">
                  <div
                    data-step="4"
                    data-intro="Right here are presented the templates, ordered by success and relevance. You can load more template by clicking on the loadmore button."
                    className="h-full overflow-y-scroll"
                    >
                    <div className="flex px-8 py-6">
                      <InfiniteHits hitComponent={Hit} showPrevious={false} />
                    </div>
                  </div>
                </main>
              </div>
              <footer className="flex flex-no-shrink justify-between flex-col sm:flex-row p-4 border-grey-light border-solid border-t text-sm text-grey-dark">
                <div>
                  &nbsp;
                </div>
              </footer>
            </div>
            <div id="fullpage" style={{display:initDisplayUrl("fullpage")}}>
              <div id="fullpagechild">
                {exposePage()}
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}


export default App
