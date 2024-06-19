const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { JWT_SIGNATURE_KEY, JWT_REFRESH_KEY } = require('../config/application');

const createAccessToken = (user) => {
  user.password = undefined;
  return jwt.sign({ data: user }, JWT_SIGNATURE_KEY, { expiresIn: '15m' });
};

const createRefreshToken = (user) => {
  user.password = undefined;
  return jwt.sign({ data: user }, JWT_REFRESH_KEY, { expiresIn: '7d' });
};

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SIGNATURE_KEY);
};

const decodeRefreshToken = ({ token }) => {
  return jwt.verify(token, JWT_REFRESH_KEY);
};

const getRandomToken = () => {
  return uuidv4();
};

module.exports = {
  createAccessToken,
  decodeToken,
  getRandomToken,
  createRefreshToken,
  decodeRefreshToken,
};
