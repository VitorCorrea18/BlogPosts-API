const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, secretKey, jwtConfig);
  return token;
};

module.exports = generateJWT;
