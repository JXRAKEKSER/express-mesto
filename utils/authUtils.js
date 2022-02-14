const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const getToken = (payload) => {
  if (!payload) {
    throw new Error('Пустое тело токена');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
  getToken,
};
