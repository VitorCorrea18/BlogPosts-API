const router = require('express').Router();
const controller = require('../controllers');
const middlewares = require('../middlewares/');

router.post('/', middlewares.validateLogin, controller.login);

module.exports = router;
