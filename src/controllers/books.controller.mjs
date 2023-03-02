import * as expres from "express";
import { bookResponseMapper } from "../mappers/book.mapper.mjs";
import { bookRepository } from "../repositories/book.repository.mjs";
const router = expres.Router();

/**
 * Get list of books
 */
router.get("/", async (req, res) => {
  const books = await bookRepository.findAll();
  res.send(bookResponseMapper.mapMany(books));
});

/**
 * Get detail book by id
 */
router.get("/:id", async (req, res) => {
  const book = await bookRepository.findById(req.params.id);
  if (!book) {
    res.status(404).json({
      message: `Books with id ${req.params.id} was not found`,
    });
  } else {
    res.send(bookResponseMapper.mapOne(book));
  }
});

/**
 * Create book
 */
router.post("/", async (req, res) => {
  const bookToInsert = req.body;
  const id = await bookRepository.create(bookToInsert);
  res.status(201).json({
    id,
  });
});

/**
 * Update book
 */
router.patch("/:id", async (req, res) => {
  const bookId = req.params.id;
  const bookToUpdate = await bookRepository.findById(bookId);
  if (!bookToUpdate) {
    res.status(404).json({
      message: `Books with id ${req.params.id} was not found`,
    });
    return;
  }
  await bookRepository.update(bookId, {
    ...bookToUpdate,
    ...req.body,
  });

  res.status(200).json({
    id: bookId,
  });
});

/**
 * Delete book by id
 */
router.delete("/:id", async (req, res) => {
  const bookId = req.params.id;
  const bookToDelete = await bookRepository.findById(bookId);
  if (!bookToDelete) {
    res.status(404).json({
      message: `Books with id ${req.params.id} was not found`,
    });
    return;
  }

  await bookRepository.deleteById(bookId);
  res.sendStatus(204);
});

export const bookRouter = router;
