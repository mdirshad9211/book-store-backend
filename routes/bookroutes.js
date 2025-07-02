const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookcontroller');
const authenticateJWT = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', authenticateJWT, getBooks);
router.get('/:id', authenticateJWT, getBookById);
router.post('/', authenticateJWT, addBook);
router.put('/:id', authenticateJWT, updateBook);
router.delete('/:id', authenticateJWT, deleteBook);

module.exports = router;
