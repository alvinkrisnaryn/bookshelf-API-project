const { handleRequest } = require('./handler');

module.exports = (req, res) => {
  handleRequest(req, res);
}