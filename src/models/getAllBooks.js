const books = require("../db/books");

const getAllBooks = () => {
  return books.map(({ id, name, publisher }) => ({ id, name, publisher }));
};

module.exports = getAllBooks;
