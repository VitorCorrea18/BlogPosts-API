const jwt = require('jsonwebtoken');

const secretKey = 'batatinhaFrita123';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, secretKey, jwtConfig);
  return token;
};

module.exports = generateJWT;
