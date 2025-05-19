const books = require("../db/books");

const deleteBookById = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return false;
  }
  books.splice(bookIndex, 1);
  return true;
};

module.exports = deleteBookById;