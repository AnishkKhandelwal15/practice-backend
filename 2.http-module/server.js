const http = require('http');

const server = http.createServer((req, res) =>{
    console.log('Req', req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('Response is being sent to you', res);
    res.end('Hello World');
    console.log('Response has been sent');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});