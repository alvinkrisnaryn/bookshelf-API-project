const books = require("../../books");
const { sendResponse } = require("../../utils/response");

function deleteBookById(req, res, bookId) {
  try {
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
      return sendResponse(res, 404, {
        status: "fail",
        message: "Buku tidak ditemukan",
      });
    }

    books.splice(index, 1);

    return sendResponse(res, 200, {
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (err) {
    console.error("deleteBookById error:", err);
    return sendResponse(res, 500, {
      status: "fail",
      message: "Gagal menghapus buku",
    });
  }
}

module.exports = deleteBookById;
