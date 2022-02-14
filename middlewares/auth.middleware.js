const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports = (req, res, next) => {
  if (req.method !== 'OPTIONS') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ForbiddenError('Пользователь не авторизован');
      }
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      if (error.name === 'JsonWebTokenError' && error.message === 'invalid signature') {
        error.statusCode = 403;
        error.sendError = function () {
          return res.status(this.statusCode).json({ message: 'Пользователь не авторизован' });
        };
      }
      next(error);
    }
  }
  next();
};
