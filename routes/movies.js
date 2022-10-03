const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { urlValidation } = require('../middlewares/validators');

const router = express.Router();
const {
  getMyMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMyMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidation).required(),
    trailerLink: Joi.string().custom(urlValidation).required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
}), deleteMovie);

module.exports = router;
