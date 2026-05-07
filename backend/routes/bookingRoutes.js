const express = require('express');
const router = express.Router();
const { 
    createBooking, getMyBookings, getBookingById, cancelBooking, checkAvailability
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/check-availability', protect, checkAvailability);
router.get('/:id', protect, getBookingById);
router.put('/:id/cancel', protect, cancelBooking);  // ✅ Make sure this exists

module.exports = router;