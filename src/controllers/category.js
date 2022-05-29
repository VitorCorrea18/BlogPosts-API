const services = require('../services');

const create = async (req, res) => {
  const result = await services.category.create(req.body.name);
  console.log(result);
  return res.status(result.status).json(result.data);
};

const getAll = async (_req, res, next) => {
  try {
    const result = await services.category.getAll();
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
};
