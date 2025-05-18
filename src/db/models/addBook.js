const { nanoid } = require("nanoid");
const books = require("../../books");
const { sendResponse } = require("../../utils/response");

function addBook(req, res) {
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
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
      }

      if (readPage > pageCount) {
        return sendResponse(res, 400, {
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
      }

      const id = nanoid(16);
      const finished = pageCount === readPage;
      const insertdAt = new Date().toISOString();
      const updatedAt = insertdAt;

      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertdAt,
        updatedAt,
      };

      books.push(newBook);

      return sendResponse(res, 201, {
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: { bookId: id },
      });
    } catch (err) {
      return sendResponse(res, 500, {
        status: "fail",
        message: "Internal server error",
      });
    }
  });
}

module.exports = addBook;
