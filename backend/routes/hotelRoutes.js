const express = require('express');
const router = express.Router();
const { 
    getAllHotels, getHotelById, getCities, createHotel, 
    updateHotel, deleteHotel
} = require('../controllers/hotelController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { uploadHotelImages } = require('../middleware/upload');

router.get('/', getAllHotels);
router.get('/cities', getCities);
router.get('/:id', getHotelById);

// ✅ Make sure uploadHotelImages is used correctly
router.post('/', protect, adminOnly, uploadHotelImages, createHotel);
router.put('/:id', protect, adminOnly, uploadHotelImages, updateHotel);
router.delete('/:id', protect, adminOnly, deleteHotel);

module.exports = router;