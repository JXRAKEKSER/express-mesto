const NotFoundError = require('../errors/NotFoundError');

const Card = require('../models/Card');

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const { likes } = await Card.create({ name, link, owner: req.user.id });
    return res.status(201).json({
      name,
      link,
      likes,
      owner: req.user.id,
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      return res.status(400).json({ message: e.message });
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    const cardsForClient = cards.map((card) => ({
      _id: card._id,
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
    }));
    return res.status(200).json({ cards: cardsForClient });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findOneAndRemove({ _id: req.params.cardId }, {
      new: true,
      runValidators: true,
    });
    if (deletedCard) {
      return res.status(200).json({ id: req.params.cardId });
    }
    return res.status(404).json({ message: 'Карточка с таким id не найдена' });
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Неправильно передан id' });
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const addLike = async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { $addToSet: { likes: req.user.id } },
      {
        new: true,
      },
    );
    if (!updatedCard) {
      throw new NotFoundError('Такой карточки нет');
    }
    return res.status(200).json({
      card: {
        _id: updatedCard._id,
        name: updatedCard.name,
        link: updatedCard.link,
        owner: updatedCard.owner,
        likes: updatedCard.likes,
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Неправильно передан id' });
    }
    if (e instanceof NotFoundError) {
      return e.send(res);
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

const deleteLike = async (req, res) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { $pull: { likes: req.user.id } },
      {
        new: true,
      },
    );
    if (!updatedCard) {
      throw new NotFoundError('Такой карточки нет');
    }
    return res.status(200).json({
      card: {
        _id: updatedCard._id,
        name: updatedCard.name,
        link: updatedCard.link,
        owner: updatedCard.owner,
        likes: updatedCard.likes,
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === 'CastError') {
      return res.status(400).json({ message: 'Неправильно передан id' });
    }
    if (e instanceof NotFoundError) {
      return e.send(res);
    }
    return res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};
