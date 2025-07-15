const express = require('express');
const router = express.Router();
const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getGenres,
  getMoviesByGenre,
} = require('../controllers/movieController');

router.get('/search', searchMovies);
router.get('/popular', getPopularMovies);
router.get('/top-rated', getTopRatedMovies);
router.get('/upcoming', getUpcomingMovies);
router.get('/genres', getGenres);
router.get('/genre/:genreId', getMoviesByGenre);
router.get('/:id', getMovieDetails);

module.exports = router;