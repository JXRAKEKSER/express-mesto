const { Joi, celebrate } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(4),
  }),
});
const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(4),
  }),
});
const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().min(24),
  }),
});
const regexpUrl = /https?:\/\/(www)?[\w\-]+\.\w+[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+/; // eslint-disable-line
const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(11).pattern(regexpUrl),
  }),
});
const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  createUserValidator,
  loginUserValidator,
  getUserByIdValidator,
  updateAvatarValidator,
  updateProfileValidator,
};
