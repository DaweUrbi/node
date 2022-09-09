const http  = require('http');
const fs = require('fs');

const users = [
    {name: 'John', age: 25},
    {name: 'Jane', age: 30},
    {name: 'Jack', age: 28},
    {name: 'Jill', age: 32}
];

const server = http.createServer((req, res) => {
        if(req.url === '/readFile'){
            fs.readFile('index.html', "utf-8", (err, data) => {
                if (err) {
                    console.log("Error on read file", err);
                }
                console.log("content file", data);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            
            });
        } if (req.url === '/writeFile') {
            fs.writeFile('index2.html', "<h1>Hello World</h1>", (err) => {
                if (err) {
                    console.log("Error on write file", err);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: "Write file success"}));
                console.log("Write file success");
                res.end();
            });
        } if (req.url === '/updateFile') {
            fs.appendFile('index2.html', "<h1>Hello World Updated</h1>", (err) => {
                if (err) {
                    console.log("Error on updated file", err);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: "File updated"}));
                console.log("File updated");
                res.end();
            });
        } if (req.url === '/deleteFile') {
            fs.unlink('index2.html', (err) => {
                if (err) {
                    console.log("Error on delete file", err);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: "File deleted"}));
                console.log("File deleted");
                res.end();
            });
        } if (req.url === '/renameFile') {
            fs.rename('index2.html', 'main.html', (err) => {
                if (err) {
                    console.log("Error on rename file", err);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: "File renamed"}));
                console.log("File renamed");
                res.end();
            });
        } if (req.url === '/createFolder') {
            fs.mkdir('newFolder', (err) => {
                if (err) {
                    console.log("Error on create folder", err);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({ message: "Folder created"}));
                console.log("Folder created");
                res.end();
            });
        }
    
});

server.listen(3001, () => console.log('Server is running on port 3001'));