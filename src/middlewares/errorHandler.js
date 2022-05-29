const { status, messages } = require('../helpers');

const errorHandler = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(status.INTERNAL_ERROR).json({ message: messages.INTERNAL_ERROR });
};

module.exports = errorHandler;
