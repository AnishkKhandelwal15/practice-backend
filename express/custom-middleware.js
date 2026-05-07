const express = require('express');
const app = express();

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url} is being accessed`);
    next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    console.log('Home page is being accessed');
    res.send('Welcome to the Ho22me Page!');
}
);

app.get('/about', (req, res) => {
    console.log('About page is being accessed');
    res.send('Welcome to the Ab22out Page!');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

