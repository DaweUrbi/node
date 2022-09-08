const http = require('http');

const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'David', age: 30 },
    { name: 'Petr', age: 30 },
];

const products = [
    { name: 'Apple', price: 10 },
    { name: 'Orange', price: 15 },
    { name: 'Banana', price: 20 },
    { name: 'Pineapple', price: 25 },
];

const server = http.createServer((req, res) => {
    console.log('request', req.url);

    if (req.url === '/cat') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<img src='https://www.rd.com/wp-content/uploads/2021/01/GettyImages-1175550351.jpg?w=2141'/>");
    }
    if (req.url === '/dog') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bernese-mountain-dog-royalty-free-image-1581013857.jpg?crop=0.87845xw:1xh;center,top&resize=980:*'/>");
    }
    if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({users}));
    }
    if (req.url === '/products') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({products:products}));
    }
    res.end();
});

server.listen(3000, () => console.log("Server is listening on port 3000"));