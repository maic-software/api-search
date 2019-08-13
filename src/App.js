import React, { Component } from 'react';
import {
  InstantSearch,
  SearchBox,
  Menu,
  Highlight,
  InfiniteHits
} from 'react-instantsearch-dom';
import './App.css';
import {
  displayFacets,
  getUrlArg,
  getSpoil,
  displayFolder,
  displayMenu,
  updateFavor,
  getFileContent,
  getBasicInput,
  revealSecret,
  getVersion
} from './script.js';
const algoliasearch = require("algoliasearch");
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

const APP_ID = "LYITGBJZF1";
const API_KEY = "c0d0c32d6bc8e80c30eabe69af5724d2";
const INDEX_NAME = "apis5";

const client = algoliasearch(APP_ID,API_KEY);
const index = client.initIndex(INDEX_NAME);

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
 * (folder_id,location_tree,path_to_file) -> object_to_present_code_files
 *
 * This function create a basic object that can present the content of a file.
 */

export const WidjetFile = (id,tree,path,name,nameCompatible) => {
  return (
    <div key={id+nameCompatible}>
      <span className="clickable" onClick={() => {getFileContent(id+"Code"+nameCompatible,path)}}>
        &#x21bb;
      </span>
      <div className="codeLister" onClick={() => {displayFolder(id+"Code"+nameCompatible)}}>
        {name}
      </div>
      <pre id={id+"Code"+nameCompatible+"Pre"}>
        <code id={id+"Code"+nameCompatible} display="block">
          {getFileContent(id+"Code"+nameCompatible,path)}
        </code>
      </pre>
      <div>&nbsp;</div>
    </div>
  )
}




/******************************************************************************/
/*
 * (folder_id,location_tree,path_to_file) -> object_to_generate_form_interface
 *
 * This function create a basic object that can contain a form interface.
 */

export const WidjetGetForm = (id,tree,path) => {
  return (
    <div key={id+tree.name}>
      <form action={tree.url} method="GET">
        {getBasicInput(id,tree)}
        <p>
          <button type="submit">
            {tree.execmsg}
          </button>
        </p>
      </form>
    </div>
  )
}




/******************************************************************************/
/*
 * (previous_folder_id,location_tree,path_to_folder) -> object_to_present_folder
 *
 * This function create a basic object that represent a folder inside a project.
 */

export const WidjetFolder = (id,tree,path,name,nameCompatible) => {
  return (
    [
    <div key={id+nameCompatible} className="folderWidjet">
      <div onClick={() => {displayFolder(id+nameCompatible+"T")}} className="folderClickable">
        {name+"/"}
      </div>
      <div>&nbsp;</div>
      <div id={id+nameCompatible+"T"} className="folder">
        <div>
          {revealSecret(id+nameCompatible+"T",tree,path)}
        </div>
      </div>
    </div>,
    <div key={id+"Space"}>&nbsp;</div>
  ]
  )
}




/******************************************************************************/
/*
 * (object_inside_algolia_database) -> template_representation
 *
 * This function create a object representing every template.
 */

const Hit = ({ hit }) => {
  return (
    <div
      key={hit.objectID}
      className="bg-white p-8 rounded shadow hover:shadow-md my-2 transition"
    >
      <h3
        data-step="5"
        data-intro="Every templates are given a name and a type that refer to it's complexity."
        className="text-xl mb-3 flex flex-col sm:flex-row"
        >
        <Highlight
          attribute="name"
          hit={hit}
          className="mr-2 text-grey-darkest font-normal"
        />
        <span className="flex items-center mt-2 sm:-mt-1">
          {hit.type && (
            <span className="flex items-center text-xxs border-solid border-grey-light text-grey border-2 px-2 py-1 rounded-full mr-1 uppercase">
              <svg
                className="w-2 h-auto -mt-1 mr-1 fill-current flex-no-shrink"
                xmlns="http://www.w3.org/2000/svg"
                width="402"
                height="402"
                viewBox="0 0 402 402"
              >
                <path d="M357.5 190.7c-5.3-5.3-11.8-8-19.4-8h-9.1v-54.8c0-35-12.6-65.1-37.7-90.2C266.1 12.6 236 0 201 0c-35 0-65.1 12.6-90.2 37.7C85.7 62.8 73.1 92.9 73.1 127.9v54.8h-9.1c-7.6 0-14.1 2.7-19.4 8 -5.3 5.3-8 11.8-8 19.4V374.6c0 7.6 2.7 14.1 8 19.4 5.3 5.3 11.8 8 19.4 8H338c7.6 0 14.1-2.7 19.4-8 5.3-5.3 8-11.8 8-19.4V210.1C365.5 202.5 362.8 196.1 357.5 190.7zM274.1 182.7H127.9v-54.8c0-20.2 7.1-37.4 21.4-51.7 14.3-14.3 31.5-21.4 51.7-21.4 20.2 0 37.4 7.1 51.7 21.4 14.3 14.3 21.4 31.5 21.4 51.7V182.7z" />
              </svg>
              <span>{hit.type}</span>
            </span>
          )}
        </span>
      </h3>
      <p className="text-grey-dark mb-3">
        <Highlight attribute="description" hit={hit} />
      </p>
      <a
        data-step="8"
        data-intro="You can download the full template here."
        href={"/ddl/"+hit.name+".zip"}
        download={hit.name+".zip"}
        >
        Download
      </a>
      <p className="flex items-center">
        <svg
          className="w-3 h-3 mr-2 text-grey fill-current flex-no-shrink"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.1 512.1"
        >
          <path d="M312.5 199.6c-6.1-6.1-12.8-11.5-20.1-16.1 -19.2-12.3-41.6-18.9-64.4-18.9 -31.7-0.1-62.1 12.5-84.5 35L34.9 308.2c-22.3 22.4-34.9 52.7-34.9 84.3 0 66 53.4 119.5 119.4 119.5 31.6 0.1 62-12.4 84.4-34.8l89.6-89.6c1.6-1.6 2.5-3.8 2.5-6.1 0-4.7-3.9-8.5-8.6-8.5h-3.4c-18.7 0.1-37.3-3.5-54.6-10.6 -3.2-1.3-6.9-0.6-9.3 1.9l-64.4 64.5c-20 20-52.4 20-72.4 0 -20-20-20-52.4 0-72.4l109-108.9c20-20 52.4-20 72.4 0 13.5 12.7 34.5 12.7 48 0 5.8-5.8 9.3-13.5 9.9-21.7C323 216.1 319.4 206.5 312.5 199.6z" />
          <path d="M477.1 35c-46.7-46.7-122.3-46.7-169 0l-89.5 89.4c-2.5 2.5-3.2 6.2-1.8 9.4 1.4 3.2 4.5 5.3 8 5.2h3.2c18.7 0 37.2 3.6 54.5 10.7 3.2 1.3 6.9 0.6 9.3-1.9l64.3-64.2c20-20 52.4-20 72.4 0 20 20 20 52.4 0 72.4l-80 80 -0.7 0.8 -28 27.8c-20 20-52.4 20-72.4 0 -13.5-12.7-34.5-12.7-48 0 -5.8 5.8-9.3 13.6-9.9 21.8 -0.6 9.8 3 19.3 9.9 26.3 9.9 9.9 21.4 18 34.1 23.9 1.8 0.9 3.6 1.5 5.4 2.3 1.8 0.8 3.7 1.4 5.5 2 1.8 0.7 3.7 1.3 5.5 1.8l5 1.4c3.4 0.9 6.8 1.5 10.3 2.1 4.2 0.6 8.5 1 12.7 1.2h6 0.5l5.1-0.6c1.9-0.1 3.8-0.5 6.1-0.5h2.9l5.9-0.9 2.7-0.5 4.9-1h0.9c21-5.3 40.1-16.1 55.4-31.4l108.6-108.6C523.7 157.3 523.7 81.7 477.1 35z" />
        </svg>
        <a
          data-step="6"
          data-intro="Here is a link to the documentation (for more informations)."
          href={hit.link}
          className="text-blue hover:text-blue-darker transition no-underline truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hit.link.replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')}
        </a>
      </p>
      <div>&nbsp;</div>
      <div onClick={() => { getSpoil(hit.objectID) }} className="spoiler">
        <div
          data-step="7"
          data-intro="You can click here to display a preview of the project."
          id={hit.objectID+"SpoilerInnerMSG"}
          >
          Click for further info
        </div>
      </div>
      <div>&nbsp;</div>
      <link rel="stylesheet" href="/styles/arduino-light.css"/>
      <div id={hit.objectID+"Spoiler"} className="spoiled">
        <div>
          {getVersion(hit)}
        </div>
        <div id={hit.objectID+"Code"}></div>
      </div>
      <span
        data-step="9"
        data-intro="You can vote here for a template. Help others find the most relevant and easy to launch templates."
        id={hit.objectID+"Star"} onClick={() => { updateFavor(hit.objectID,hit.favor)}}
        >
        {hit.favor}
        <span className="clickable">
          &#x2606;
        </span>
      </span>
    </div>
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
      <div className="h-screen overflow-hidden">
        <InstantSearch
          appId={APP_ID}
          apiKey={API_KEY}
          indexName={INDEX_NAME}
        >
          <link href="/styles/introjs.css" rel="stylesheet"/>
          <div className="flex flex-col h-screen font-sans">
            <header className="flex bg-white w-full border-grey-light border-solid border-b flex-no-shrink">
              <div className="p-4 md:w-64 lg:w-64 xxl:w-80 items-center flex-no-shrink border-grey-light border-solid border-r hidden md:flex justify-center">
                <h1 className="text-base text-grey-darker uppercase tracking-wide">
                  MAIC Software
                </h1>
              </div>
              <div
                data-step="1"
                data-intro="The most important feature here. You can basicaly search for anything you want. It can be an API or a type of service."
                className="flex flex-grow justify-between"
                >
                <SearchBox
                  className="h-full flex-grow"
                  autoFocus={true}
                  translations={{
                    placeholder: 'Search for a template name'
                  }}
                />
              </div>
              <div className="p-4 md:w-64 lg:w-64 xxl:w-80 items-center flex-no-shrink border-grey-light border-solid border-r hidden md:flex justify-center">
                <h1 className="text-base text-grey-darker uppercase tracking-wide">
                  <a className="clickable" onClick={() => {introJs.introJs().start()}}>Quick start up</a>
                </h1>
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
                  <h4 className="font-normal uppercase text-xs tracking-wide text-grey-dark px-4 pt-4 pb-1 border-grey-light border-solid border-t clickable" onClick={() => {displayMenu("APIMenu")}}>
                    APIs
                  </h4>
                  <div id="APIMenu" className="facetMenu">
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
                data-intro="Click here to display or hide the filter menu."
                id="facetsOpener"
                className="opener"
                onClick={() => {displayFacets()}}
                >
                Close
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
        </InstantSearch>
      </div>
    );
  }
}


export default App
