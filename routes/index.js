const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { validateSignin, validateSignup } = require('../middlewares/validators');
const { MESSAGES } = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(MESSAGES.SERVER_CRASH);
  }, 0);
});

router.post('/signin', validateSignin, login);

router.post('/signup', validateSignup, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError(MESSAGES.PAGE_NOT_FOUND));
});

module.exports = router;
