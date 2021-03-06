const bookRepository = require('../repositories/book.repository')
const ApiGeneralError = require('../../utils/ApiGeneralError')
const mongoose = require('mongoose')

// Retrieve - all books
const getAllBooks = async (searchQuery, limit) => {
  limit = limit || 10
  const books = bookRepository.getAll(searchQuery, limit)
  return books
}

// Retrieve - all books
const getAllByUserId = async (userId) => {
  const books = await bookRepository.getAllByUserId(userId)
  return books
}

// Retrieve - one
const getBookById = async (bookId) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    // the id is invalid
    throw new ApiGeneralError({
      code: 401,
      message: `the book with that id: ${bookId} does not exist.`,
      errors: [`the book with that id: ${bookId} does not exist.`]
    })
  }

  const book = await bookRepository.getById(bookId)

  if (!book) {
    throw new ApiGeneralError({
      code: 401,
      message: `the book with that id: ${bookId} does not exist.`,
      errors: [`the book with that id: ${bookId} does not exist.`]
    })
  }

  return book
}

// Create a book
const createBook = async (book) => {
  return bookRepository.create(book)
}

// Update a book
const updateBookById = async (bookId, book) => {
  return bookRepository.updateById(bookId, book)
}

// Delete a book
const deleteBookById = async (bookId) => {
  return bookRepository.deleteById(bookId)
}

module.exports = {
  getAllBooks,
  getBookById,
  getAllByUserId,
  createBook,
  updateBookById,
  deleteBookById
}
