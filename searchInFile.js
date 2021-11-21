const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

const searchInFile = (filename, text) => {
    return new Promise((resolve, reject) => {
        const inStream = fs.createReadStream(filename);
        const outStream = new stream();
        const rl = readline.createInterface(inStream, outStream);
        const result = [];
        const regEx = new RegExp(text, "i");
        rl.on("line", function (line) {
            if (line && line.search(regEx) >= 0) {
                result.push(line);
                return;
            }
        });
        rl.on("close", function () {
            // console.log("finished search", filename);
            resolve(result);
        });
    });
};

module.exports = searchInFile;
