const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const UserSchema = new Schema({
  name: {
    type: String, minlength: 2, maxlength: 30, default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String, minlength: 2, maxlength: 30, default: 'Исследователь',
  },
  avatar: {
    type: String,
    match: /https?:\/\/(www.)?([\w\-]+\.{0,1}){1,32}\.[a-z]{2,}(?=\/)[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+#?$/, // eslint-disable-line
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  password: {
    type: String, required: true, select: false,
  },
  email: {
    type: String, required: true,
  },
}, { versionKey: false });

UserSchema.statics.validateEmail = async function (email) {
  if (validator.isEmail(email)) {
    const user = await this.findOne({ email });
    if (user) {
      throw new ValidationError('Пользователь с таким именем уже существует');
    }
  } else {
    throw new ValidationError('Некорректное значение поля \'email\'');
  }
};
UserSchema.statics.findUserByCredentials = async function (email, password) {
  const supposeUser = await this.findOne({ email }).select('+password');
  if (!supposeUser) {
    throw new UnAuthorizedError('Неправильный email/пароль');
  }
  const matchedPassword = await bcrypt.compare(password, supposeUser.password);
  if (!matchedPassword) {
    throw new UnAuthorizedError('Неправильный email/пароль');
  }
  return supposeUser;
};

module.exports = model('user', UserSchema);
