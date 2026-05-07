const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} is being accessed`);
    next();
});

app.get('/', (req, res) => {
    console.log('Home page is being accessed');
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    console.log('About page is being accessed');
    res.send('Welcome to the About Page!');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});