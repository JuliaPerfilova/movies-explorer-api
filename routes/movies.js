const express = require('express');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validators');

const router = express.Router();
const {
  getMyMovies, addMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMyMovies);

router.post('/', validateAddMovie, addMovie);

router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
