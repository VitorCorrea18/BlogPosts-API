const services = require('../services');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await services.user.verifyUser(email);
    const result = await services.user.create(displayName, email, password, image);
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const getAll = async (_req, res) => {
  const result = await services.user.getAll();
  return res.status(result.status).json(result.data);
};

module.exports = {
  create,
  getAll,
};
