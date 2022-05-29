const { Category } = require('../database/models');
const { status } = require('../helpers');

const create = async (name) => {
  const result = await Category.create({ name });
  const data = result.dataValues;
  return { status: status.CREATED, data };
};

module.exports = {
  create,
};
