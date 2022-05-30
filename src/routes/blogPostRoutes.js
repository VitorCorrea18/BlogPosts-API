const router = require('express').Router();
const controllers = require('../controllers');
const middlewares = require('../middlewares');

router.post('/', middlewares.authToken, middlewares.validateBlogPost,
  controllers.blogPost.create);

router.get('/', middlewares.authToken, controllers.blogPost.getAll);

router.get('/:id', middlewares.authToken, controllers.blogPost.getById);

router.put('/:id', middlewares.authToken, middlewares.validatePostUpdate,
  controllers.blogPost.editPost);

router.delete('/:id', middlewares.authToken, controllers.blogPost.deletePost);

module.exports = router;
