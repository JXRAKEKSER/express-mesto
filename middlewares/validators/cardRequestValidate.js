const { Joi, celebrate } = require('celebrate');

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().min(11),
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
