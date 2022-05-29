const router = require('express').Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post('/', middlewares.validateCategory, middlewares.authToken, controllers.category.create);

module.exports = router;
