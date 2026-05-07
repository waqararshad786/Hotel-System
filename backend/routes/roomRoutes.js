const express = require('express');
const router = express.Router();
const { 
    getRoomsByHotel, getRoomById, createRoom, updateRoom, deleteRoom
} = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { uploadRoomImages } = require('../middleware/upload');

// Public routes
router.get('/hotel/:hotelId', getRoomsByHotel);
router.get('/:id', getRoomById);

// Admin only routes
router.post('/', protect, adminOnly, uploadRoomImages, createRoom);
router.put('/:id', protect, adminOnly, uploadRoomImages, updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;