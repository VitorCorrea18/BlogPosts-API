const { Category } = require('../database/models');
const { status } = require('../helpers');

const create = async (name) => {
  const result = await Category.create({ name });
  const data = result.dataValues;
  return { status: status.CREATED, data };
};

const getAll = async () => {
  const result = await Category.findAll();
  const data = result.map((category) => category.dataValues);
  return { status: status.OK, data };
};

module.exports = {
  create,
  getAll,
};
