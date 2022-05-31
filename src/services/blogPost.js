const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { status, messages } = require('../helpers');

const getUserId = async (token) => {
  const secretKey = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secretKey);
  const user = await User.findOne({ where: { email: decoded.data.email } });
  return user.dataValues.id;
};

const create = async ({ title, content, categoryIds, userId }) => {
  const newPost = await BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
  const postId = newPost.dataValues.id;

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
  });

  return { status: status.CREATED, data: newPost.dataValues };
};

const verifyCategoryIds = async (categoryIds) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length < categoryIds.length) {
    const error = { status: status.BAD_REQUEST, message: messages.CATEGORY_NOT_FOUND };
    throw error;
  }
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: status.OK, data: result };
};

const getById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) {
    const error = { status: status.NOT_FOUND, message: messages.POST_DOESNT_EXIST };
    throw error;
  }
  return { status: status.OK, data: result };
};

// To edit or delete a post the logged user must be the post owner
// The getLoggedUser is called on the controllers to know the identity of the loggedUser
// and then compare with the post key "userId";

const verifyLoggedUser = async (token, post) => {
  const secretkey = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secretkey);
  const user = await User.findOne({ where: { id: decoded.data.id } });
  if (user.dataValues.id !== post.userId) {
    const error = { status: status.UNAUTHORIZED, message: messages.UNAUTHORIZED_USER };
    throw error;
  }
};

const editPost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: status.OK, data: newPost };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { status: status.NO_CONTENT };
};

// https://stackoverflow.com/questions/53971268/node-sequelize-find-where-like-wildcard
// https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize

const searchPost = async (query) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${query}%` },
        content: { [Op.like]: `%${query}%` },
      },
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: status.OK, data: post };
};

module.exports = {
  getUserId,
  create,
  verifyCategoryIds,
  getAll,
  getById,
  editPost,
  verifyLoggedUser,
  deletePost,
  searchPost,
};
