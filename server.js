const parse = require('./treeGen');
const express = require('express');
const algoliasearch = require("algoliasearch");
const app = express();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const APP_ADMIN_ID = "LYITGBJZF1";
const API_ADMIN_KEY = "67baaf6fb4bc87e9b148aa237251b326";
const INDEX_NAME = "apis6";

const client = algoliasearch(APP_ADMIN_ID,API_ADMIN_KEY);
const index = client.initIndex(INDEX_NAME);

app.use(cors());

const exec = require('child_process').exec;
var child;

function getFileName(name) {
  var result = "";
  for(let i = name.length-1 ; i > -1 ; i--) {
    if(name[i] === "/") {
      i = -1;
    }
    else {
      result = name[i] + result;
    }
  }
  return result;
}

function getFileDir(name) {
  var result = "";
  var bool = 1;
  for(let i = name.length-1 ; i > -1 ; i--) {
    while(bool) {
      if(name[i] === "/") {
        bool = 0;
      }
      else {
        i--;
      }
    }
    result = name[i] + result;
  }
  return result;
}

function testDir(path) {
  for (let i = 0 ; i < lstDir.length ; i++) {
    if (path === lstDir[i]) {
      return 0;
    }
    let j = 0;
    let bool = 1;
    while (j !== lstDir[i].length && j !== path.length && bool) {
      if (lstDir[i][j] !== path[j]) {
        bool = 0;
      }
      j += 1;
    }
    if (bool && j === path.length) {
      return 0;
    }
  }
  lstDir.push(path);
  return 1;
}

// function createDir(path) {
//   var list = path.split("/");
//   var dir = "public/upload/tmpDir";
//   if (testDir(dir)) {
//     fs.mkdir(dir, { recursive: true }, function(e){
//       if(!e || (e && e.code === 'EEXIST')){
//         console.log("Path " + dir + " already exists!");
//       } else {
//         console.log(e);
//       }
//     });
//   }
//   for(let i = 0 ; i < list.length-1 ; i++){
//     dir = dir + "/" + list[i];
//     if (testDir(dir)) {
//       fs.mkdir(dir, { recursive: true }, function(e){
//         if(!e || (e && e.code === 'EEXIST')){
//           console.log("Path " + dir + " already exists!");
//         } else {
//           console.log(e);
//         }
//       });
//     }
//   }
// }

function createDir(path) {
  var list = path.split("/");
  var dir = "public/upload/tmpDir";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for(let i = 0 ; i < list.length-1 ; i++) {
    dir = dir + "/" + list[i];
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname === "tmp.json") {
      cb(null, "public/upload/tmpDir/");
    }
    else {
      let dirname = getFileDir(file.originalname);
      createDir(dirname);
      cb(null, "public/upload/tmpDir/" + dirname);
    }
  },
  filename: function (req, file, cb) {
    if (file.originalname === "tmp.json") {
      cb(null, "tmp.json");
    }
    else {
      let filename = getFileName(file.originalname);
      cb(null, filename);
    }
  }
})

var upload = multer({ storage: storage , preservePath: true }).array('file');

function finalTreatment() {
  var files = fs.readdirSync("public/upload/tmpDir/");
  var root;
  if (files.length !== 2) {
    console.log("Error: tmp folder doesn't respect the conventions!");
    return 0;
  }
  if (files[1] === "tmp.json") {
    root = files[0];
  }
  else if (files[0] === "tmp.json") {
    root = files[1];
  }
  else {
    console.log("Error: tmp.json not present!");
    return 0;
  }
  var jfile = require("./public/upload/tmpDir/tmp.json");
  jfile['version'].push(parse("public/upload/tmpDir/"+root));
  var api = jfile['API'];
  var name = jfile['name'];
  var bddir = "public/data/"
  if (!fs.existsSync(bddir+api)) {
    fs.mkdirSync(bddir+api);
  }
  else {
    if (!fs.existsSync(bddir+api+"/"+name)) {
      fs.mkdirSync(bddir+api+"/"+name);
    }
    else {
      console.log("Warning: template already exists!");
      return 0;
    }
  }
  exec('cp -r public/upload/tmpDir/'+root+' public/data/'+api+'/'+name+'/',
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
       console.log('exec error: ' + error);
      }
    }
  );
  // index.addObjects([jfile],
  //   (err, { objectIDs } = {}) => {
  //     console.log(`Newcomer is laggy!`);
  //   }
  // );
  return 1;
}

app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }
    else if (err) {
      return res.status(500).json(err);
    }
    finalTreatment();
    return res.status(200).send(req.file);
  })
});

app.get('/search/:query', function(req, res) {
  console.log(req.params.query);
});

app.listen(8000, function() {
  console.log('App running on port 8000');
});
