const http = require('http');

const server = http.createServer((req, res) => {

    const url = req.url;
    console.log('Req', url);

    if(url === '/') {
        console.log('Home page is being accessed');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to the Home Page!');
    } else if(url === '/about') {
        console.log('About page is being accessed');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to the About Page!');
    }
        else {
        console.log('Page not found');
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});