const express = require('express');
const app = express();

// application level setting

app.set('appName', 'Express Demo App');

// routing

app.get('/', (req, res) => {
    console.log('Home page is being accessed');
    res.send('Welcome to the Home Page!');
});

app.post('/submit', (req, res) => {
    console.log('Form submitted');
    res.json({ message: 'Form submission successful!' });
});


//error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
