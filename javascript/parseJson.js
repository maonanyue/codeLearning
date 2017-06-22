let fs = require('fs');
let data = fs.readFileSync(process.argv[2]);
let dataObj = JSON.parse(data);

var stream = fs.createWriteStream(process.argv[3]);
stream.once('open', function(fd) {
  dataObj.out.gpsItemEntities.forEach((item) => stream.write( Object.keys(item).map(key => item[key])+"\n" ) );
  stream.end();
});
