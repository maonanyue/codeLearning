var XLSX = require('xlsx');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function writeHead(distPaths){
  let headText = "\"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources xmlns:tools=\"http://schemas.android.com/tools\" tools:ignore=\"MissingTranslation\">\"\n";

  for(let keyName in distPaths){
    mkdirp.sync(path.dirname(distPaths[keyName]), function(err) {
      // path exists unless there was an error
      console.log(distPaths[keyName] + " failed, "+err);
    });
    fs.writeFileSync(distPaths[keyName], headText);
  }
}


function addRows(distPaths, workbook, sheet_name){
  let worksheet = workbook.Sheets[sheet_name];
  let sheet_json = XLSX.utils.sheet_to_json(worksheet);
  let valueItem;
  sheet_json.forEach( function(row){
    for(let keyName in distPaths){
      valueItem = "    <string name=\""+row['Strings']+"\">"+row[keyName]+"</string>\n";
      fs.appendFileSync(distPaths[keyName], valueItem);
    }
  });
}

function addEnd(distPaths){
  let endText = "</resources>";
  for(let keyName in distPaths){
    fs.appendFileSync(distPaths[keyName], endText);
  }
}

function addPath(distPaths, distDir){
  for(let keyName in distPaths){
    distPaths[keyName] = distDir+"/"+distPaths[keyName];
    console.log(distPaths[keyName]);
  }
}

function buildAndroidStrings(distPaths, srcXml){
  writeHead(distPaths);
  var workbook = XLSX.readFile(srcXml);
  addRows(distPaths, workbook, "AppStrings");
  addRows(distPaths, workbook, "ServerEvent");
  addEnd(distPaths);
}

/**
 *
 */
let srcExcelFile=process.argv[2];
let distDir=process.argv[3];

var distPaths = {
  "English": "values/strings_english.xml",
"意大利语": "values-it/strings.xml",
"法语": "values-fr/strings.xml",
"西班牙语": "values-es/strings.xml",
"德语": "values-de/strings.xml"
}

addPath(distPaths, distDir);
buildAndroidStrings(distPaths, srcExcelFile);
