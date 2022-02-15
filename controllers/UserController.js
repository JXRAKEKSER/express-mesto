const bcrypt = require('bcrypt');
const User = require('../models/User');
const { getToken } = require('../utils/authUtils');

const createUser = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  try {
    await User.validateEmail(email);
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({ email, password: hashPassword });
    return res.status(201).json({ name: user.name, about: user.about, avatar: user.avatar });
  } catch (e) {
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    // В массив usersObjectForClient помещаются объекты пользователей очищенные от поля версии
    const usersObjectForClient = users.map((user) => ({ name: user.name, about: user.about, avatar: user.avatar }));
    return res.status(200).json({ users: usersObjectForClient });
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      return res.status(200).json({ name: user.name, about: user.about, avatar: user.avatar });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
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
    next(e);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedAvatar = await User.findOneAndUpdate({ _id: req.user._id }, { avatar }, {
      new: true,
      runValidators: true,
    });
    if (updatedAvatar) {
      return res.status(200).json({ avatar: updatedAvatar.avatar });
    }
    return res.status(404).json({ message: 'Пользователь не найден' });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    return res.status(200).json({ jwt: getToken({ _id: user._id }) });
  } catch (e) {
    next(e);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const myProfile = await User.findOne({ _id: req.user._id });
    return res.status(200).json({
      _id: myProfile._id,
      name: myProfile.name,
      about: myProfile.about,
      avatar: myProfile.avatar,
      email: myProfile.email,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getMyProfile,
};
