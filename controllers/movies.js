const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const { ERROR_MESSAGES } = require('../utils/errorConstants');

module.exports.getMyMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send({ data: movies }))
  .catch(next);

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST));
      else next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) res.send({ data: movie });
      else throw new ForbiddenError();
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError());
      else next(err);
    });
};
