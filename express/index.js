const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Home page is being accessed');
    res.send('Welcome to the Home Page!');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});