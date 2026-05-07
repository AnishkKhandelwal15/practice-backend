const express = require('express');
const app = express();


// middleware to log requests
app.use(express.json());

let books = [
    { id: 1, title: 'Book A', author: 'Author A' },
    { id: 2, title: 'Book B', author: 'Author B' },
    { id: 3, title: 'Book C', author: 'Author C' }
];

// starting the server
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our book store!',
    });
});

// get all books
app.get('/books', (req, res) => {
    res.json(books);
});

//GET SINGLE BOOK

app.get("/single-book/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

//add a new book
app.post('/add-book', (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

//UPDATE A BOOK
app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === bookId);

    if (book) {
        book.title = title;
        book.author = author;
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

//delete a book

app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook[0]
        });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});
 
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});