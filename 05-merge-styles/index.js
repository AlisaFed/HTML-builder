const fs = require ('fs');
const path = require ('path');
const ws = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');
const Stream = require('stream');
const writableStream = new Stream.Writable();

fs.readdir ('./05-merge-styles/styles', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile() && `${path.extname(dirEntry.name)}` == '.css') {
                let readableStream = fs.createReadStream(`./05-merge-styles/styles/${dirEntry.name}`, 'utf-8');
                readableStream.on("data", function(chunk){ 
                    fs.appendFile('./05-merge-styles/project-dist/bundle.css', chunk, function(error){
                        if(error) throw error; 
                     });
                });
            }
        });
    } else {
        console.error(error);
    };
});

