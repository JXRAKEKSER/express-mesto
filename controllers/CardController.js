const NotFoundError = require('../errors/NotFoundError');

const Card = require('../models/Card');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const { likes, _id } = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).json({
      _id,
      name,
      link,
      likes,
      owner: req.user._id,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const getCards = async (req, res, next) => {
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
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const deletedCard = await Card.findOneAndRemove({ _id: req.params.cardId, owner: req.user._id }, {
      new: true,
      runValidators: true,
    });
    if (deletedCard) {
      return res.status(200).json({ id: req.params.cardId });
    }
    return res.status(404).json({ message: 'Карточка с таким id не найдена' });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const addLike = async (req, res, next) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { $addToSet: { likes: req.user._id } },
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
    next(e);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.cardId },
      { $pull: { likes: req.user._id } },
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
    next(e);
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
};
