const Joi = require('joi');
const { status, messages } = require('../helpers');

const SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validatePostUpdate = (req, _res, next) => {
  const { error } = SCHEMA.validate(req.body);

  if (error) next({ status: status.BAD_REQUEST, message: messages.MISSING_FIELDS });

  next();
};

module.exports = validatePostUpdate;
