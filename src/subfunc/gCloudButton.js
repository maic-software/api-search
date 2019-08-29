import React from "react";

const GCloudButton = (query) => {
  return (
    <a href={query}>
      <img src="https://storage.googleapis.com/cloudrun/button.svg" width="20%" height="20%"/>
    </a>
  )
}



export function parseLink(link,flag) {
  if (flag !== "yes") {
    return "";
  }
  var array = link.split("/");
  var rep, sub, tree;
  var query = "https://console.cloud.google.com/cloudshell/editor?shellonly=";
  if (array.length < 5) {
    return "";
  }
  if (array[2] !== "github.com") {
    return "";
  }
  if (array[0] !== "https:") {
    return "";
  }
  if (array.length > 5 && array[5] !== "tree") {
    rep = "https:/";
    sub = array[5];
    for (let i = 2 ; i < 5 ; i++) {
      rep = rep + "/" + array[i];
    }
    rep = rep + ".git";
    for (let i = 6 ; i < array.length ; i++) {
      sub = sub + "/" + array[i];
    }
    query = query + rep + "&cloudshell_working_dir=" + sub;
  }
  else if (array.length === 7 && array[5] === "tree") {
    rep = "https:/";
    tree = array[6];
    for (let i = 2 ; i < 5 ; i++) {
      rep = rep + "/" + array[i];
    }
    rep = rep + ".git";
    query = query + rep + "&cloudshell_git_branch=" + tree;
  }
  else if (array.length > 7 && array[5] === "tree") {
    rep = "https:/";
    tree = array[6];
    sub = array[7];
    for (let i = 2 ; i < 5 ; i++) {
      rep = rep + "/" + array[i];
    }
    rep = rep + ".git";
    for (let i = 8 ; i < array.length ; i++) {
      sub = sub + "/" + array[i];
    }
    query = query + rep + "&cloudshell_git_branch=" + tree + "&cloudshell_working_dir=" + sub;
  }
  else {
    query = query + link + ".git";
  }
  return new GCloudButton(query);
}
