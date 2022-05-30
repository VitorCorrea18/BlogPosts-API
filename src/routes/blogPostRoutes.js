const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', middlewares.authToken, middlewares.validateBlogPost, controllers.blogPost.create);
router.get('/', middlewares.authToken, controllers.blogPost.getAll);

module.exports = router;
