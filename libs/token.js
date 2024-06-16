const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { JWT_SIGNATURE_KEY } = require("../config/application");

const createToken = (user) => {
  user.password = undefined;
  return jwt.sign(
    {
      user,
    },
    JWT_SIGNATURE_KEY
  );
};

const decodeToken = (token) => {
  return jwt.verify(token, JWT_SIGNATURE_KEY);
};

const getRandomToken = () => {
  return uuidv4();
};

module.exports = { createToken, decodeToken, getRandomToken };
