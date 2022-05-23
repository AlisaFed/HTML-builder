const fs = require ('fs');
const path = require ('path');

fs.mkdir('./04-copy-directory/files-copy', err => {
    if(err) {fs.rmdir('./04-copy-directory/files-copy', err => {
    if(err) {
        fs.readdir ('./04-copy-directory/files-copy', {withFileTypes: true}, (error, dirEntryList) => {
            if(!error) {
                dirEntryList.forEach((dirEntry) => {
                    if (dirEntry.isFile()) {
                        fs.unlink(`./04-copy-directory/files-copy/${dirEntry.name}`, err => {
                            if(err) throw err;
                         });
                    } fs.rmdir('./04-copy-directory/files-copy', err => {
                        if(!err) {
                            fs.mkdir('./04-copy-directory/files-copy', err => {})
                            fs.readdir ('./04-copy-directory/files', {withFileTypes: true}, (error, dirEntryList) => {
                                if(!error) {
                                    dirEntryList.forEach((dirEntry) => {
                                        if (dirEntry.isFile()) {
                                            fs.copyFile(`./04-copy-directory/files/${dirEntry.name}`, `./04-copy-directory/files-copy/${dirEntry.name}`, error => {
                                                if(error) throw error; 
                                             });
                                        }
                                    });
                                } else {
                                    console.error(error);
                                };
                            });
                        };})
                });
            } else {
                console.error(error);
            };
        });
    }
})}
})


fs.readdir ('./04-copy-directory/files', {withFileTypes: true}, (error, dirEntryList) => {
    if(!error) {
        dirEntryList.forEach((dirEntry) => {
            if (dirEntry.isFile()) {
                fs.copyFile(`./04-copy-directory/files/${dirEntry.name}`, `./04-copy-directory/files-copy/${dirEntry.name}`, error => {
                    if(error) throw error; 
                 });
            }
        });
    } else {
        console.error(error);
    };
});