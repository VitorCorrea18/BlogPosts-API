const services = require('../services');

const create = async (req, res, next) => {
  try {
    const result = await services.category.create(req.body.name);
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
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
