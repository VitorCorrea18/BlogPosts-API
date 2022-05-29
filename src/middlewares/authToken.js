const jwt = require('jsonwebtoken');
const { status, messages } = require('../helpers');
const { User } = require('../database/models');

const secretkey = process.env.JWT_SECRET;

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(status.UNAUTHORIZED).json({ message: messages.TOKEN_NOT_FOUND });
    }
    const decoded = jwt.verify(token, secretkey);
    const userIsValid = await User.findOne({ where: { email: decoded.data.email } });
    if (!userIsValid) {
      return res.status(status.UNAUTHORIZED).json({ message: messages.EXPIRED_TOKEN });
    }
    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: messages.EXPIRED_TOKEN });
  }
};

module.exports = authToken;
