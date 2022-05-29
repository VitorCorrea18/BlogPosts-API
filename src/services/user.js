const { User } = require('../database/models');
const { status, messages } = require('../helpers');
const generateJWT = require('../utils/generateJWT');

const verifyUser = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (result) {
    const error = { status: status.CONFLICT, message: messages.ALREADY_REGISTERED };
    throw error;
  }
};

const create = async (displayName, email, password, image) => {
  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });
  const userData = newUser.dataValues;
  const { password: passDB, ...userWithoutPass } = userData;
  const token = { token: generateJWT(userWithoutPass) };
  return { status: status.CREATED, data: token };
};

const getAll = async () => {
  const result = await User.findAll();
  const data = result.map((user) => {
    const { password: passDB, ...userWithoutPass } = user.dataValues;
    return userWithoutPass;
  });
  return { status: status.OK, data };
};

const getById = async (id) => {
  const result = await User.findOne({ where: { id } });
  if (!result) {
    const error = { status: status.NOT_FOUND, message: messages.USER_DONT_EXIST };
    throw error;
  }
  const userData = result.dataValues;
  const { password, ...userWithoutPass } = userData;
  return { status: status.OK, data: userWithoutPass };
}

module.exports = {
  verifyUser,
  create,
  getAll,
  getById,
};
