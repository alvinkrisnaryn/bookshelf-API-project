const addbook = require("../models/addBook");
const getAllBooks = require("../models/getAllBooks");
const getBookById = require("../models/getBookById");
const updateBookById = require("../models/updateBookById");
const deleteBookById = require("../models/deleteBookById");
const messages = require("../constants/messages");
const books = require("../db/books");

const addBookHandler = (request, h) => {
  const { name, pageCount, readPage } = request.payload;

  // Validasi: name wajib ada
  if (!name) {
    return h
      .response({
        status: "fail",
        message:
          messages.ADD_BOOK_FAILED ||
          "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  // Validasi: readPage tidak boleh melebihi PageCount
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          messages.INVALID_READPAGE ||
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const bookId = addbook(request.payload);

  const isSuccess = books.some((book) => book.id === bookId);

  if (isSuccess) {
    return h
      .response({
        status: "success",
        message: messages.ADD_BOOK_SUCCESS || "Buku berhasil ditambahkan",
        data: {
          bookId,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    })
    .code(500);
};

const getAllBooksHandler = (request, h) => {
  const books = getAllBooks();
  return h
    .response({
      status: "success",
      data: {
        books,
      },
    })
    .code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = getBookById(bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: messages.BOOK_NOT_FOUND,
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: messages.BOOK_FOUND,
      data: {
        book,
      },
    })
    .code(200);
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, pageCount, readPage } = request.payload;

  // Validasi : name wajib ada
  if (!name) {
    return h.response({
      status: "fail",
      message: messages.MISSING_NAME,
    }).code;
  }

  // Validasi : readPage tidak boleh melebihi PageCount
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: messages.INVALID_READPAGE,
      })
      .code(400);
  }

  // Coba perbarui buku
  const isSuccess = updateBookById(bookId, request.payload);

  if (!isSuccess) {
    return h
      .response({
        status: "fail",
        message: messages.UPDATE_FAIL_ID_NOT_FOUND,
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      message: messages.UPDATE_SUCCESS,
    })
    .code(200);
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
