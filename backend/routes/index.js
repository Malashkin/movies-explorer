const router = require('express').Router();
const {
  validateRegistration,
  validateAuthorization,
} = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const userRoute = require('./users');
const movieRoute = require('./movies');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateAuthorization, login);

router.use(auth);

router.use('/users', userRoute);
router.use('/movies', movieRoute);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена.');
});

module.exports = router;
