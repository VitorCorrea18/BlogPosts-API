const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogPostRoutes = require('./blogPostRoutes');

module.exports = {
  login: loginRoutes,
  user: userRoutes,
  category: categoryRoutes,
  blogPost: blogPostRoutes,
};
