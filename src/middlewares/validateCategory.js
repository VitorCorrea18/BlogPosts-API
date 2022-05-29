const Joi = require('joi');
const { status } = require('../helpers');

const SCHEMA = Joi.object({ name: Joi.string().required() });

const validateCategory = (req, _res, next) => {
  const { error } = SCHEMA.validate(req.body);

  if (error) {
    next({ status: status.BAD_REQUEST, message: error.message });
  }

  next();
};

module.exports = validateCategory;
