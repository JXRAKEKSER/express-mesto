const { Joi, celebrate } = require('celebrate');

const regexpUrl = /https?:\/\/(www.)?([\w\-]+\.{0,1}){1,32}\.[a-z]{2,}(?=\/)[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+#?$/; // eslint-disable-line
const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(11).pattern(regexpUrl),
  }),
});

const cardIdParamsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().min(24),
  }),
});

module.exports = {
  createCardValidator,
  cardIdParamsValidator,
};
