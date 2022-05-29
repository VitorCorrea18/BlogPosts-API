const router = require('express').Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post('/', middlewares.validateCategory, middlewares.authToken, controllers.category.create);
router.get('/', middlewares.authToken, controllers.category.getAll);

module.exports = router;
