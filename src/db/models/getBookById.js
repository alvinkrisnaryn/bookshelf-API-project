const books = require("../../books");
const { sendResponse } = require("../../utils/response");

function getBookById(req, res, bookId) {
  try {
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return sendResponse(res, 404, {
        status: "fail",
        message: "Buku tidak ditemukan",
      });
    }

    return sendResponse(res, 200, {
      status: "success",
      data: { book },
    });
  } catch (err) {
    return sendResponse(res, 500, {
      status: "fail",
      message: "Gagal mengambil detail buku",
    });
  }
}

module.exports = getBookById;
