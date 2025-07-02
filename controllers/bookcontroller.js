const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const booksFilePath = './data/book.json';

const readJsonFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent.trim() ? JSON.parse(fileContent) : [];
  } catch (error) {
    return [];
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await readJsonFile(booksFilePath);
    res.json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookById = async (req, res) => {
  try {
    const books = await readJsonFile(booksFilePath);
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error getting book by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addBook = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }

  const { title, author, genre, publishedYear } = req.body;

  if (!title || !author || !genre || !publishedYear) {
    return res.status(400).json({ message: 'All fields are required (title, author, genre, publishedYear)' });
  }

  try {
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.userId,
    };

    const books = await readJsonFile(booksFilePath);
    books.push(newBook);
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateBook = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is required' });
  }

  const { title, author, genre, publishedYear } = req.body;

  try {
    const books = await readJsonFile(booksFilePath);
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (books[bookIndex].userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    books[bookIndex] = { ...books[bookIndex], title, author, genre, publishedYear };
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));

    res.json(books[bookIndex]);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const books = await readJsonFile(booksFilePath);
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (books[bookIndex].userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    books.splice(bookIndex, 1);
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
