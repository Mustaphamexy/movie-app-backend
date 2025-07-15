const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add movie to watchlist
// @route   POST /api/users/watchlist
// @access  Private
const addToWatchlist = async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;
    const user = await User.findById(req.user._id);

    // Check if movie already in watchlist
    const movieExists = user.watchlist.find(movie => movie.movieId === movieId);

    if (movieExists) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    user.watchlist.push({ movieId, title, poster });
    await user.save();

    res.json({ message: 'Movie added to watchlist', watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove movie from watchlist
// @route   DELETE /api/users/watchlist/:movieId
// @access  Private
const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(movie => movie.movieId !== parseInt(req.params.movieId));
    await user.save();

    res.json({ message: 'Movie removed from watchlist', watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add movie to favorites
// @route   POST /api/users/favorites
// @access  Private
const addToFavorites = async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;
    const user = await User.findById(req.user._id);

    // Check if movie already in favorites
    const movieExists = user.favorites.find(movie => movie.movieId === movieId);

    if (movieExists) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    user.favorites.push({ movieId, title, poster });
    await user.save();

    res.json({ message: 'Movie added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove movie from favorites
// @route   DELETE /api/users/favorites/:movieId
// @access  Private
const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(movie => movie.movieId !== parseInt(req.params.movieId));
    await user.save();

    res.json({ message: 'Movie removed from favorites', favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add movie review
// @route   POST /api/users/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { movieId, movieTitle, rating, comment } = req.body;
    const user = await User.findById(req.user._id);

    // Check if user already reviewed this movie
    const existingReview = user.reviews.find(review => review.movieId === movieId);

    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this movie' });
    }

    user.reviews.push({ movieId, movieTitle, rating, comment });
    await user.save();

    res.json({ message: 'Review added successfully', reviews: user.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's watchlist
// @route   GET /api/users/watchlist
// @access  Private
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateProfile,
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  addReview,
  getWatchlist,
  getFavorites,
};