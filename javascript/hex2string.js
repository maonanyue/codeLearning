var readline = require('readline'),
    fs = require('fs');


function hex2string( data ){
    if(data.indexOf(',') > -1){
        let b = data.split(',')
        let buffer = new Buffer(b.length)
        let i = 0
        b.forEach( function(v){ buffer.writeUInt8( Number.parseInt(v, 16), i++ ) })
        console.log(buffer.toString('utf-8'))
    }else{
        let buffer = Buffer.from(data, "hex")
        console.log(buffer.toString('utf-8'))
    }
}


let data = process.argv[2]

if(process.argv[2] !== "-f"){
    hex2string(data)
    return
}


//    data = fs.readFileSync(process.argv[3]);

let rl = readline.createInterface({
    input: fs.createReadStream(process.argv[3]),
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line) {
    hex2string(line)
});
