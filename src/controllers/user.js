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

const getAll = async (_req, res, next) => {
  try {
    const result = await services.user.getAll();
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res) => {
  try {
    const result = await services.user.getById(req.params.id);
    return res.status(result.status).json(result.data);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await services.user.getLoggedUser(req.headers.authorization);
    const result = await services.user.deleteUser(user.id);
    return res.status(result.status).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  deleteUser,
};
