const jwt = require('jsonwebtoken');
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
  return { status: status.OK, data: result};
};

module.exports = {
  getUserId,
  create,
  verifyCategoryIds,
  getAll,
};
