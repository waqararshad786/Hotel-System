const express = require('express');
const router = express.Router();
const { 
    register, login, getMe, updateProfile, changePassword,
    addToWishlist, removeFromWishlist
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/wishlist/add', protect, addToWishlist);
router.post('/wishlist/remove', protect, removeFromWishlist);

module.exports = router;