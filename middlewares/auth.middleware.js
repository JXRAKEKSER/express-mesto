const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { JWT_SECRET } = require('../utils/authUtils');
module.exports = (req, res, next) => {
  if (req.method !== 'OPTIONS') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnAuthorizedError('Пользователь не авторизован');
      }
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
      if (error.name === 'JsonWebTokenError' && error.message === 'invalid signature') {
        error.statusCode = 401;
        error.sendError = function () {
          return res.status(this.statusCode).json({ message: 'Пользователь не авторизован' });
        };
      }
      next(error);
    }
  }
  next();
};
