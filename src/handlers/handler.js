const addbook = require("../models/addBook");
const getAllBooks = require("../models/getAllBooks");
const getBookById = require("../models/getBookById");
const updateBookById = require("../models/updateBookById");
const deleteBookById = require("../models/deleteBookById");

const addBookHandler = (request, h) => {
  return addbook(request, h);
};

const getAllBooksHandler = (request, h) => {
  return getAllBooks(request, h);
};

const getBookByIdHandler = (request, h) => {
  return getBookById(request, h);
};

const updateBookByIdHandler = (request, h) => {
  return updateBookById(request, h);
};

const deleteBookByIdHandler = (request, h) => {
  return deleteBookById(request, h);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
