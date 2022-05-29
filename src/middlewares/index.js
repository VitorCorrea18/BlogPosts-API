const validateLogin = require('./validateLogin');
const validateUser = require('./validateUser');
const authToken = require('./authToken');
const validateCategory = require('./validateCategory');
const errorHandler = require('./errorHandler');
const validateBlogPost = require('./validateBlogPost');

module.exports = {
  validateLogin,
  validateUser,
  authToken,
  validateCategory,
  errorHandler,
  validateBlogPost,
};
