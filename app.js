const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const authMiddleware = require('./middlewares/auth.middleware');
const corsMiddleware = require('./middlewares/cors.middleware');
const userRouter = require('./routes/user.router');
const cardRouter = require('./routes/card.router');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(corsMiddleware);

app.use('/users', userRouter);
app.use('/cards', authMiddleware, cardRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());
app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  if (error.sendError) {
    return error.sendError(res);
  }
  if (error.statusCode === 400) {
    return res.status(400).json({ message: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Неправильно передан id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Ошибка на сервере' });
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(5000, () => console.log('Server start'));
  } catch (error) {
    console.log(error);
  }
};

start();
