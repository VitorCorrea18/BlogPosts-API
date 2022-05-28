const Joi = require('joi');
const { status } = require('../helpers');

const SCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const validateUser = (req, _res, next) => {
  const { error } = SCHEMA.validate(req.body);
  if (error) next({ status: status.BAD_REQUEST, message: error.message });

  next();
};

module.exports = validateUser;
