const fs = require ('fs');
const path = require ('path');
const Stream = require('stream');
const writableStream = new Stream.Writable();

fs.mkdir('./06-build-page/project-dist', err => {if(err) throw err; })

fs.readdir ('./06-build-page/styles', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile() && `${path.extname(dirEntry.name)}` == '.css') {
                let readableStream = fs.createReadStream(`./06-build-page/styles/${dirEntry.name}`, 'utf-8');
                readableStream.on("data", function(chunk){ 
                    fs.appendFile('./06-build-page/project-dist/style.css', chunk, function(error){
                        if(error) throw error; 
                     });
                });
            }
        });
    } else {
        console.error(error);
    };
});


fs.readdir ('./06-build-page', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile() && `${path.extname(dirEntry.name)}` == '.html') {
                let readableStream = fs.createReadStream(`./06-build-page/styles/${dirEntry.name}`, 'utf-8');
                readableStream.on("data", function(chunk){ 
                    fs.appendFile('./06-build-page/project-dist/style.css', chunk, function(error){
                        if(error) throw error; 
                     });
                });
            }
        });
    } else {
        console.error(error);
    };
});
fs.createWriteStream('./06-build-page/project-dist/index.html', err => {if(err) throw err; });






/*fs.readdir ('./06-build-page/assets', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isDirectory) {
                fs.copyFile(`./06-build-page/assets/${dirEntry.name}`, `./06-build-page/project-dist/assets/${dirEntry.name}`, error => {
                    if(error) throw error; 
                 });
            }
        });
    } else {
        console.error(error);
    };
});



fs.mkdir('./06-build-page/project-dist/assets', err => {if(err) throw err; })*/