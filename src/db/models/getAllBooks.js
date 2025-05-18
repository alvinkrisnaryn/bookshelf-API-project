const books = require("../../books");
const { sendResponse } = require("../../utils/response");

function getAllBooks(req, res) {
  try {
    const results = books.map(({ id, name, publisher }) => ({
      id,
      name,
      publisher,
    }));

    return sendResponse(res, 200, {
      status: "success",
      data: { books: results },
    });
  } catch (err) {
    return sendResponse(res, 500, {
      status: "fail",
      message: "Gagal mengambil data buku",
    });
  }
}

module.exports = getAllBooks;
