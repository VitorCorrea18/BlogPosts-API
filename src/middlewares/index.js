const validateLogin = require('./validateLogin');
const validateUser = require('./validateUser');
const authToken = require('./authToken');
const validateCategory = require('./validateCategory');
const errorHandler = require('./errorHandler');

module.exports = {
  validateLogin,
  validateUser,
  authToken,
  validateCategory,
  errorHandler,
};
