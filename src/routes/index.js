const loginRoutes = require('./loginRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

module.exports = {
  login: loginRoutes,
  user: userRoutes,
  category: categoryRoutes,
};
