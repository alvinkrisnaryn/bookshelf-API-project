const books = require("../../books");
const { sendResponse } = require("../../utils/response");

function updateBookById(req, res, bookId) {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = data;

      if (!name) {
        return sendResponse(res, 400, {
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
      }

      if (readPage > pageCount) {
        return sendResponse(res, 400, {
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
      }

      const index = books.findIndex((b) => b.id === bookId);

      if (index === 1) {
        return sendResponse(res, 404, {
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
      }

      const updatedAt = new Date().toISOString();
      const finished = pageCount === readPage;

      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updatedAt,
        bookId,
      };

      return sendResponse(res, 200, {
        status: "success",
        message: "Buku berhasil diperbarui",
      });
    } catch (err) {
      return sendResponse(res, 500, {
        status: "fail",
        message: "Gagal memperbarui data buku",
      });
    }
  });
}

module.exports = updateBookById;
