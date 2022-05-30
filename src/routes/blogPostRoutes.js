const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', middlewares.authToken, middlewares.validateBlogPost, controllers.blogPost.create);
router.get('/', middlewares.authToken, controllers.blogPost.getAll);
router.get('/:id', middlewares.authToken, controllers.blogPost.getById);

module.exports = router;
