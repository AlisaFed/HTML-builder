const fs = require ('fs');
const path = require ('path');
const Stream = require('stream');
const writableStream = new Stream.Writable();

fs.mkdir('./06-build-page/project-dist', err => {if(err) throw err; });          
fs.mkdir('./06-build-page/project-dist/assets', err => {if(err) throw err; });   

//--------------------------------C___S___S----------------------------------------

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

//--------------------------------H___T___M___L----------------------------------

fs.readdir ('./06-build-page', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile() && `${path.extname(dirEntry.name)}` == '.html') {
                let readableStream = fs.createReadStream(`./06-build-page/${dirEntry.name}`, 'utf-8');
                readableStream.on("data", function(chunk){ 
                    let chunky = chunk.toString().replace(/{{header}}/gm,"<header></header>");
                    let chunki = chunky.toString().replace(/{{articles}}/gm,"<articles></articles>");
                    let chunke = chunki.toString().replace(/{{footer}}/gm,"<footer></footer>");
                    fs.appendFile('./06-build-page/project-dist/index.html', chunke, function(error) {
                        if(error) throw error;});
                });
            }
        });
    } else {
        console.error(error);
    };
});

//--------------------------------A___S___S___E___T___S----------------------------------

fs.readdir ('./06-build-page/assets', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isDirectory()) {
                fs.mkdir(`./06-build-page/project-dist/assets/${dirEntry.name}`, err => {if(err) throw err; }); 
                fs.readdir (`./06-build-page/assets/${dirEntry.name}`, {withFileTypes: true}, (error, dirEntryList) => {
                    dirEntryList.forEach((dirEntry1) => {
                        if (dirEntry1.isFile()) {
                            fs.copyFile(`./06-build-page/assets/${dirEntry.name}/${dirEntry1.name}`, `./06-build-page/project-dist/assets/${dirEntry.name}/${dirEntry1.name}`, error => {
                                if(error) throw error;}) 
                        }
                    });
                })
            }
        });
    } else {
        console.error(error);
    };
});