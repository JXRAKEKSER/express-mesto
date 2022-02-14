const Router = require('express');

const {
  createCardValidator,
  cardIdParamsValidator,
} = require('../middlewares/validators/cardRequestValidate');

const {
  createCard,
  getCards,
  deleteCard,
  addLike,
  deleteLike,
} = require('../controllers/CardController');

const router = new Router();

router.post('/', createCardValidator, createCard);
router.get('/', getCards);
router.delete('/:cardId', cardIdParamsValidator, deleteCard);
router.put('/:cardId/likes', cardIdParamsValidator, addLike);
router.delete('/:cardId/likes', cardIdParamsValidator, deleteLike);

module.exports = router;
