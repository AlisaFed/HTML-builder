const fs = require ('fs');
const EventEmitter = require('events');
const emitter = new EventEmitter();
const ws = fs.createWriteStream('./02-write-file/text.txt');
const Stream = require('stream');
const writableStream = new Stream.Writable();

fs.access('./02-write-file/text.txt', function(error){
    if (error){
        console.log('Начнем пожалуй');
    } else {
        console.log('Продолжим');
    }
}) 

writableStream._write = (chunk, encoding, next) => {
    let last_input = chunk.toString().replace(/(\r\n\r)/gm,"");
    fs.appendFile('./02-write-file/text.txt', last_input, function(err) {
        if(err) return console.error(err);
        else if (last_input == 'exit'){
            console.log("Закончили упражнение");
            process.stdin.push(null);
        };
        next();
    });
    };
    process.on('SIGINT', function(){
        console.log("Закончили упражнение");
        process.stdin.push(null);
    });

process.stdin.pipe(writableStream);