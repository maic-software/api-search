import React, { Component } from 'react';
import '../css/App.css';
import "../css/fullInfo.css";
import { WidjetFileStandard, WidjetFolderStandard } from "./Widjet.js"

const algoliasearch = require("algoliasearch");

const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apis6";

const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

var hit;
var gloarg;

function exposeResearch(arg) {
  document.location.href = document.location.href.replace("p/","").replace(arg,"");
}



class CodeContainer extends Component {
  state = {
    container: 0
  };
  getVersion(hit) {
    var path = "/data/"+hit.API+"/"+hit.name;
    var inclusion = [];
    var i = 0;
    var current = hit.version[i];
    var id = hit.objectID;
    while(current != null) {
      if(current.tree.RMprovided === "yes") {
        inclusion.push(new WidjetFileStandard(id+hit.API+hit.name+current.tree.name,current.tree,path+"/"+current.tree.name+current.tree.RMpath,"README.md","READMEpmd"));
      }
      inclusion.push(new WidjetFolderStandard(id+hit.API+hit.name,current.tree,path+"/"+current.tree.name,current.tree.name,current.tree.name));
      i++;
      current = hit.version[i];
    }
    return inclusion;
  };
  getCodeByTempName(arg) {
    index.getObject(arg,(err,content) => {
      if (err) throw err;
      hit = content;
      this.setState({container: this.getVersion(hit)});
    });
  };
  render() {
    const { container } = this.state;
    return (
      <div id="CodeContainer">
      {container}
      {this.getCodeByTempName(gloarg)}
      </div>
    );
  }
}



export function fillFullInfo(arg) {
    index.getObject(arg, (err, content) => {
      if (content === void[0] || content === null) {
        document.getElementById("fullpage").innerText = "Tercio";
      }
      else {
        document.getElementById(arg+"FullInfoName").innerText = content.name;
        document.getElementById(arg+"FullInfoDescription").innerText = content.description;
        document.getElementById(arg+"FullInfoLink").innerText = content.link.replace('https://', '')
                                                                            .replace('http://', '')
                                                                            .replace('www.', '');
        document.getElementById(arg+"FullInfoLink").href = content.link;
      }
    });
  return 0;
}

export const FullInfo = (arg) => {
  return (
        <div
          key={arg+"FullInfo"}
          className="h-screen overflow-hidden"
        >
          <header className="flex bg-white w-full border-grey-light border-solid border-b flex-no-shrink">
            <div className="p-4 md:w-64 lg:w-64 xxl:w-80 items-center flex-no-shrink border-grey-light border-solid border-r hidden md:flex justify-center">
              <h1 className="text-base text-grey-darker uppercase tracking-wide">
                MAIC Software
              </h1>
            </div>
            <div className="p-4 md:w-64 lg:w-64 xxl:w-80 items-center flex-no-shrink border-grey-light border-solid border-r hidden md:flex justify-center">
              <h1 className="text-base text-grey-darker uppercase tracking-wide clickable" onClick={() => exposeResearch(arg)}>
                Research
              </h1>
            </div>
          </header>
          <h3
            data-step="5"
            data-intro="Every templates are given a name and a type that refer to it's complexity."
            className="text-xl mb-3 flex flex-col sm:flex-row"
            >
            <div id ={arg+"FullInfoName"} className="name">
              {arg}
            </div>
          </h3>
          <div className="bg-white p-8 rounded shadow hover:shadow-md my-2 transition flex flex-grow">
            <div className="h-full flow-grow max-h-screen overflow-y-scroll">
              <div className="h-full overflow-y-scroll">
                <p className="text-grey-dark mb-3">
                  <span id ={arg+"FullInfoDescription"} className="description">
                    Loading...
                  </span>
                </p>
                <a
                  data-step="8"
                  data-disable-interaction
                  data-intro="You can download the full template here."
                  href={"/ddl/"+arg+".zip"}
                  download={arg+".zip"}
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
                    id={arg+"FullInfoLink"}
                    data-step="6"
                    data-disable-interaction
                    data-intro="Here is a link to the documentation (for more informations)."
                    href="none"
                    className="text-blue hover:text-blue-darker transition no-underline truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Loading...
                  </a>
                </p>
                <div>&nbsp;</div>

                <div>&nbsp;</div>
                <link rel="stylesheet" href="/styles/arduino-light.css"/>
                <div id={arg+"FullInfoCode"}>
                  <div>
                    {gloarg = arg}
                    <CodeContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
