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

const getById = async (req, res, next) => {
  try {
    const result = await services.blogPost.getById(req.params.id);
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const post = await services.blogPost.getById(req.params.id);
    await services.blogPost.verifyLoggedUser(req.headers.authorization, post.data);
    const result = await services.blogPost.editPost(req.params.id, title, content);
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await services.blogPost.getById(req.params.id);
    await services.blogPost.verifyLoggedUser(req.headers.authorization, post.data);
    const result = await services.blogPost.deletePost(req.params.id);
    return res.status(result.status).end();
  } catch (err) {
    next(err);
  }
};

const searchPost = async (req, res, next) => {
  try {
    const result = await services.blogPost.searchPost(req.query.q);
    return res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  editPost,
  deletePost,
  searchPost,
};
