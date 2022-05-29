const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', middlewares.authToken, middlewares.validateBlogPost, controllers.blogPost.create);

module.exports = router;
