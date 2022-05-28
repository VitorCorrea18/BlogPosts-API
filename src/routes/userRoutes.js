const router = require('express').Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post('/', middlewares.validateUser, controllers.user.create);

module.exports = router;
