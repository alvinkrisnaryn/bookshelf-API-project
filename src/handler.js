const { parse } = require("url");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("./db/models");

async function handleRequest(req, res) {
  const { method, url } = req;
  const parsedUrl = parse(url, true);
  const pathname = parsedUrl.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathname === "/books" && method === "POST") return addBook(req, res);
  if (pathname === "/books" && method === "GET") return getAllBooks(req, res);
  if (method === "GET" && pathname.startsWith("/books/"))
    return getBookById(req, res, pathSegments[1]);
  if (method === "PUT" && pathname.startsWith("/books/"))
    return updateBookById(req, res, pathSegments[1]);
  if (method === "DELETE" && pathname.startsWith("/books/"))
    return deleteBookById(req, res, pathSegments[1]);

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "fail", message: "Route not found" }));
}

module.exports = { handleRequest };
