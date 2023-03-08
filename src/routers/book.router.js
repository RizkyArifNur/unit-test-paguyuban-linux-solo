const express = require('express')
const router = express.Router();
const bookController = require('../controllers/books.controller.js')

/**
 * Get list of books
 */
router.get("/", bookController.listBook);

/**
 * Get detail book by id
 */
router.get("/:id", bookController.getBookById);

/**
 * Create book
 */
router.post("/", bookController.createBook);

/**
 * Update book
 */
router.patch("/:id", bookController.updateBookById);

/**
 * Delete book by id
 */
router.delete("/:id", bookController.deleteBookById);

module.exports = {
    bookRouter: router
}