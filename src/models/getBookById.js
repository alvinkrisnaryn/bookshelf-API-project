const books = require("../db/books");

const getBookById = (bookId) => {
  return books.find((book) => book.id === bookId) || null;
};

module.exports = getBookById;