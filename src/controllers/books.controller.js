
const { bookResponseMapper } = require('../mappers/book.mapper.js')
const { bookRepository } = require('../repositories/book.repository.js')
const express = require('express')
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function listBook(req, res) {
  const books = await bookRepository.findAll();
  res.send(bookResponseMapper.mapMany(books));
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function getBookById(req, res) {
  const book = await bookRepository.findById(req.params.id);
  if (!book) {
    res.status(404).json({
      message: `Books with id ${req.params.id} was not found`,
    });
  } else {
    res.send(bookResponseMapper.mapOne(book));
  }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function createBook(req, res) {
  const bookToInsert = req.body;
  const id = await bookRepository.create(bookToInsert);
  res.status(201).json({
    id,
  });
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function updateBookById(req, res) {
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
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
async function deleteBookById(req, res) {
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
}

module.exports = {
  listBook,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById
}