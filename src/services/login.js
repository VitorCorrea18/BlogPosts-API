const { User } = require('../database/models');
const { status, messages } = require('../helpers');
const generateJWT = require('../utils/generateJWT');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.dataValues.password !== password) {
    const error = { status: status.BAD_REQUEST, message: messages.INVALID_FIELDS };
    throw error;
  }

  const userData = user.dataValues;
  const { password: passDB, ...userWithoutPass } = userData;
  const token = { token: generateJWT(userWithoutPass) };
  return token;
};

module.exports = login;
