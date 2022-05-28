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
  console.log(userData, userWithoutPass);
  const token = { token: generateJWT(userWithoutPass) };
  return { status: status.CREATED, data: token };
};

module.exports = {
  verifyUser,
  create,
};
