const http = require("http");
const routes = require("./routes");

const PORT = process.env.PORT || 9000;

const server = http.createServer(routes);

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
