const express = require('express');

const mongoose = require('mongoose');

const authMiddleWare = require('./middlewares/auth.middleware');

const userRouter = require('./routes/user.router');
const cardRouter = require('./routes/card.router');

const app = express();

app.use(express.json());
app.use(authMiddleWare);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(3000, () => console.log('Server start'));
  } catch (error) {
    console.log(error);
  }
};

start();
