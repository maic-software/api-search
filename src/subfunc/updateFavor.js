const algoliasearch = require("algoliasearch");
const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apis6";

const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);



/******************************************************************************/
/*
 * (template_id) -> void
 *
 * This function change the ranking of a template (and block it's own access).
 */

export function updateFavor(id,favor) {
  var divS = document.getElementById(id+"Star");
  if(divS.style.status === "used"){
   return;
  }
  else{
    var inc = parseInt(favor,10) + 1;
    divS.style.status = "used";
    divS.innerHTML = inc + "&#9733;";
    var upF = "0";
    index.getObject(id, ['favor'], (err, content) => {
      if (err) throw err;
      var upFInt = parseInt(content.favor, 10);
      upFInt += 1;
      upF = upFInt.toString(10);
      index.partialUpdateObject({
        favor: upF,
        objectID: id
      }, (err, content) => {
        if (err) throw err;
      });
    });
  }
}
