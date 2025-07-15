const express = require('express');
const router = express.Router();
const {
  updateProfile,
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  addReview,
  getWatchlist,
  getFavorites,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected
router.use(authMiddleware);

router.put('/profile', updateProfile);
router.post('/watchlist', addToWatchlist);
router.delete('/watchlist/:movieId', removeFromWatchlist);
router.get('/watchlist', getWatchlist);
router.post('/favorites', addToFavorites);
router.delete('/favorites/:movieId', removeFromFavorites);
router.get('/favorites', getFavorites);
router.post('/reviews', addReview);

module.exports = router;