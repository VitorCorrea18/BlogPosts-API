const router = require('express').Router();
const controller = require('../controllers');

router.post('/', controller.login);


module.exports = router;
