const { Joi, celebrate } = require('celebrate');

const regexpLink = /https?:\/\/(www)?[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+/; // eslint-disable-line no-useless-escape

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regexpLink),
  }),
});

const cardIdParamsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().min(24),
  }),
});

module.exports = {
  createCardValidator,
  cardIdParamsValidator,
};
