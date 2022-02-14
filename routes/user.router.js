const { Router } = require('express');

const {
  createUserValidator,
  loginUserValidator,
  getUserByIdValidator,
  updateAvatarValidator,
  updateProfileValidator,
} = require('../middlewares/validators/userRequestValidate');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

const {
  login,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getMyProfile,
} = require('../controllers/UserController');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginUserValidator, login);
router.get('/me', authMiddleware, getMyProfile);
router.get('/', authMiddleware, getUsers);
router.get('/:id', getUserByIdValidator, authMiddleware, getUserById);
router.patch('/me', updateProfileValidator, authMiddleware, updateUser);
router.patch('/me/avatar', updateAvatarValidator, authMiddleware, updateAvatar);

module.exports = router;
