const router = require('express').Router();
const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post('/', middlewares.validateUser, controllers.user.create);
router.get('/', middlewares.authToken, controllers.user.getAll);

module.exports = router;
