const http = require('http');
const port = 3000;

const server = http.createServer( (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    
    if(req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end('Hello World :)');
    } else {
        res.statusCode = 404;
        res.end('Page not found.');
    }
}).listen(port);

//test
