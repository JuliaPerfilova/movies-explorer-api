const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const { MESSAGES } = require('../utils/constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(MESSAGES.WRONG_URL);
  }
  return value;
};

const mailValidation = (value) => {
  if (!validator.isEmail(value)) {
    throw new CelebrateError(MESSAGES.WRONG_EMAIL);
  }
  return value;
};

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(mailValidation),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidation).required(),
    trailerLink: Joi.string().custom(urlValidation).required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});
