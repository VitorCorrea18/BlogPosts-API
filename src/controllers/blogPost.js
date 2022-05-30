const services = require('../services');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  try {
    await services.blogPost.verifyCategoryIds(categoryIds);
    const userId = await services.blogPost.getUserId(req.headers.authorization);
    const result = await services.blogPost.create({ title, content, categoryIds, userId });
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const result = await services.blogPost.getAll();
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
};
