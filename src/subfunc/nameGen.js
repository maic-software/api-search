/******************************************************************************/
/*
 * (json_name_element) -> standard_name
 *
 * Will generate a standard name (usable for path), given a json element.
 */

export function genStdrName(elem) {
  if (elem.pointInit === "no" && elem.pointCompose === "no") {
    return elem.name;
  }
  var name;
  if (elem.pointCompose === "yes") {
    name = elem.name[0].name;
    for(var i = 1; i < elem.nameNum ; i++) {
      name = name + "." + elem.name[i].name;
    }
  }
  else {
    name = elem.name;
  }
  if (elem.pointInit === "yes") {
    name = "." + name;
  }
  return name;
}

/******************************************************************************/
/*
 * (json_name_element) -> compatible_name
 *
 * Will generate a compatible name (usable for id), given a json element.
 */

export function genCompName(elem) {
  if (elem.pointInit === "no" && elem.pointCompose === "no") {
    return elem.name;
  }
  var name;
  if (elem.pointCompose === "yes") {
    name = elem.name[0].name;
    for(var i = 1; i < elem.nameNum ; i++) {
      name = name + "p" + elem.name[i].name;
    }
  }
  else {
    name = elem.name;
  }
  if (elem.pointInit === "yes") {
    name = "p" + name;
  }
  return name;
}
