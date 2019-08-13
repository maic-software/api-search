var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');
var fs = require('fs');

app.use(cors());

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

function createDir(path) {
  var list = path.split("/");
  var dir = "";
  for(let i = 0 ; i < list.length ; i++){
    dir = dir + list[i] + "/";
    fs.mkdir(dir, { recursive: true }, function(e){
      if(!e || (e && e.code === 'EEXIST')){
        console.log("Path " + dir + " already exists!");
      } else {
        console.log(e);
      }
    });
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirname = getFileDir(file.originalname);
    console.log(dirname);
    dirname = 'public/upload/' + dirname;
    createDir(dirname);
    cb(null, dirname);
  },
  filename: function (req, file, cb) {
    let filename = getFileName(file.originalname);
    cb(null, filename);
  }
})

var upload = multer({ storage: storage , preservePath: true }).array('file');

app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }
    else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  })
});

app.get('/search/:query', function(req, res) {
  console.log(req.params.query);
});

app.listen(8000, function() {
  console.log('App running on port 8000');
});
