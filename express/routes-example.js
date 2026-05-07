const e = require('express');
const expess = require('express');
const router = expess.Router();

const app = expess();

app.get('/', (req, res) => {
    console.log('Home page is being accessed');
    res.send('Welcome to the Home Page!');
});

app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 },
        { id: 3, name: 'Product C', price: 30 }
    ];
    console.log('Products page is being accessed');
    res.json(products);
});

// get a single product by id

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 },
        { id: 3, name: 'Product C', price: 30 }
    ];
    const product = products.find(p => p.id === productId);
    if (product) {
        console.log(`Product with id ${productId} is being accessed`);
        res.json(product);
    }else {
        console.log(`Product with id ${productId} not found`);
        res.status(404).send('Product not found');
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

