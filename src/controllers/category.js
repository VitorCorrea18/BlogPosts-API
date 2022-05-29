const services = require('../services');

const create = async (req, res) => {
  const result = await services.category.create(req.body.name);
  console.log(result);
  return res.status(result.status).json(result.data);
};

module.exports = {
  create,
};
