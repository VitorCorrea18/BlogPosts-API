const Joi = require('joi');
const { status, messages } = require('../helpers');

const SCHEMA = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
});

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = SCHEMA.validate({ email, password });
  if (error) {
    next({ status: status.BAD_REQUEST, message: messages.MISSING_FIELDS });
  }
  next();
};

module.exports = validateLogin;
