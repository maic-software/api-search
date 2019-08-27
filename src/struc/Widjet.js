import React from "react";
import { getFileContent, getBasicInput} from "../subfunc/getCode.js";
import { displayFolder } from "../subfunc/display.js";
import { updateList } from "../imp/sharedValues.js";
import { revealSecretGlobal, revealSecretStandard } from "../subfunc/treeConst.js";

/******************************************************************************/
/*
 * (folder_id,location_tree,path_to_file) -> object_to_present_code_files
 *
 * This function create a basic object that can present the content of a file.
 */

export const WidjetFileGlobal = (id,tree,path,name,nameCompatible,arrayId) => {
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
          {updateList(arrayId,id+"Code"+nameCompatible,path)}
        </code>
      </pre>
      <div>&nbsp;</div>
    </div>
  )
}

export const WidjetFileStandard = (id,tree,path,name,nameCompatible) => {
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

export const WidjetFolderGlobal = (id,tree,path,name,nameCompatible,arrayId) => {
  return (
    [
    <div key={id+nameCompatible} className="folderWidjet">
      <div onClick={() => {displayFolder(id+nameCompatible+"T")}} className="folderClickable">
        {name+"/"}
      </div>
      <div>&nbsp;</div>
      <div id={id+nameCompatible+"T"} className="folder">
        <div>
          {revealSecretGlobal(id+nameCompatible+"T",tree,path,arrayId)}
        </div>
      </div>
    </div>,
    <div key={id+"Space"}>&nbsp;</div>
  ]
  )
}

export const WidjetFolderStandard = (id,tree,path,name,nameCompatible) => {
  return (
    [
    <div key={id+nameCompatible} className="folderWidjet">
      <div onClick={() => {displayFolder(id+nameCompatible+"T")}} className="folderClickable">
        {name+"/"}
      </div>
      <div>&nbsp;</div>
      <div id={id+nameCompatible+"T"} className="folder">
        <div>
          {revealSecretStandard(id+nameCompatible+"T",tree,path)}
        </div>
      </div>
    </div>,
    <div key={id+"Space"}>&nbsp;</div>
  ]
  )
}
