const http = require("http");
const url = require("url");
const searchInFile = require("./searchInFile");

const filename = "data.txt";

// http://localhost:8080/getLogByTimeStamp?timestamp=2020-01-01T00:02:07.179Z

const server = http.createServer(async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    const { pathname, query } = url.parse(req.url, true);
    // console.log(pathname);
    if (pathname === '/getLogByTimeStamp' && req.method === 'GET') {
        let { timestamp } = query;
        // console.log(timestamp);
        try {
            const foundInFile = await searchInFile(filename, timestamp);
            // console.log(foundInFile);
            const resObj = {
                success: true,
                data: {
                    found: foundInFile.length != 0,
                    data: foundInFile.length == 0 ? "Not Found" : foundInFile[0],
                },
            };
            const resJson = JSON.stringify(resObj);
            res.end(resJson);
        } catch (error) {
            console.log(error);
        }
        res.end();
    } else {
        res.write("404 Not found");
        res.end();
    }
})

const PORT = 8080;
server.listen(PORT);
