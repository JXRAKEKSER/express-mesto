const ValidationError = require('../errors/ValidationError');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    await User.create({
      name, about, avatar,
    });
    return res.status(201).json({ name, about, avatar });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: e.message });
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // В массив usersObjectForClient помещаются объекты пользователей очищенные от поля версии
    const usersObjectForClient = users.map((user) => ({ name: user.name, about: user.about, avatar: user.avatar }));
    return res.status(200).json({ users: usersObjectForClient });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      return res.status(200).json({ name: user.name, about: user.about, avatar: user.avatar });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Неправильно передан id' });
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      return res.status(200).json({ name: updatedUser.name, about: updatedUser.about, avatar: updatedUser.avatar });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: e.message });
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    // Сейчас в модели нет валидации по полю аватар, валидация ссылки будет добавлена позже в виде регулярных выражений
    // Условие ниже проверяет существует ли поле аватар в запросе и не является ли оно пустым
    // Если проверка не пройдена - выбрасывается кастомная ошибка валидации
    if (!avatar) {
      throw new ValidationError('Отсутствует поле \'avatar\', либо оно пустое');
    }
    const updatedAvatar = await User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
      new: true,
    });
    if (updatedAvatar) {
      return res.status(200).json({ avatar: updatedAvatar.avatar });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  } catch (e) {
    console.log(e);
    if (e instanceof ValidationError) {
      return e.sendError(res);
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
