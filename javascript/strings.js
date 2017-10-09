var readline = require('readline'),
    fs = require('fs'),
    path = require('path');
    
function ensureDirectoryExistence(filePath) {
    let dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}
    
function writeStrings(line){
    let re=/(values\S*)(.*)/ig;
    let arr;
    if((arr=re.exec(line)) == null){
    	return;
    }
    ensureDirectoryExistence(arr[1]);
    let stream = fs.createWriteStream(arr[1]);
    stream.once('open', function(fd) {
      stream.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
      stream.write("<resources xmlns:tools=\"http://schemas.android.com/tools\" tools:ignore=\"MissingTranslation\">\n");
      stream.write(arr[2].replace(/(notification_text_gcm_fg)/, "msg_filter_whatsapp_$1"));
      stream.write("\n</resources>\n");
      stream.end();
    })
}

    
let rl = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line) {
    writeStrings(line);
});

