const fs = require('fs');
const path = require('path');

let pathToDir1800 = path.join(process.cwd(), '1800');
let pathToDir2000 = path.join(process.cwd(), '2000');

fs.readdir(pathToDir1800, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

        fs.readdir(pathToDir2000, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }
                files.forEach(file => {
                    fs.rename(`${pathToDir2000}/${file}`, `${pathToDir1800}/${file}`, err => {
                        console.log(err);
                        return;
                    });
                });
        });


        files.forEach(file => {
            fs.rename(`${pathToDir1800}/${file}`, `${pathToDir2000}/${file}`, err => {
                console.log(err);
                return;
            });
        });
});