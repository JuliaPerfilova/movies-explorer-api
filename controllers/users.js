const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const { MESSAGES } = require('../utils/constants');
const { DEV_SECRET } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    next(new NotFoundError());
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    next(err);
  });

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      next(new NotFoundError());
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGES.EMAIL_IN_USE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token, message: MESSAGES.AUTHORIZATION_SUCCESSFUL });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({ data: (({ password, ...other }) => other)(user.toJSON()) });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGES.WRONG_INPUT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGES.CONFLICT));
      } else {
        next(err);
      }
    });
};
