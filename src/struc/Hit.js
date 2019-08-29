import React from "react";
import { Highlight } from "react-instantsearch-dom";
import { getSpoil } from "../subfunc/display.js";
import { getVersion } from "../subfunc/treeConst.js";
import { exposeSpecificPage } from "../subfunc/exposePage.js";
import { updateFavor } from "../subfunc/updateFavor.js";
import { parseLink } from "../subfunc/gCloudButton.js";


/******************************************************************************/
/*
 * (object_inside_algolia_database) -> template_representation
 *
 * This function create a object representing every template.
 */

export function incGlobalNumber() {
  globalNumber += 1;
}

export var globalNumber = 0;

export const Hit = ({ hit }) => {
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
        <span className="clickable" onClick={() => {exposeSpecificPage(hit.name)}}>
          <Highlight
            attribute="name"
            hit={hit}
            className="mr-2 text-grey-darkest font-normal"
          />
        </span>
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
      </h3>
      <p className="text-grey-dark mb-3">
        <Highlight attribute="description" hit={hit} />
      </p>
      <a
        data-step="8"
        data-disable-interaction
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
          data-disable-interaction
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
      <span
        onClick={() => { getSpoil(hit.objectID) }}
        className="spoiler"
        data-step="7"
        data-intro="You can click here to display a preview of the project."
        id={hit.objectID+"SpoilerInnerMSG"}
        >
        Preview
      </span>
      <div>&nbsp;</div>
      <link rel="stylesheet" href="/styles/arduino-light.css"/>
      <div id={hit.objectID+"Spoiler"} className="spoiled">
        <div>
          {getVersion(hit,globalNumber)}
          {incGlobalNumber()}
        </div>
        <div id={hit.objectID+"Code"}></div>
      </div>
      <div>
        {parseLink(hit.link,hit.button)}
      </div>
    </div>
  )
}
