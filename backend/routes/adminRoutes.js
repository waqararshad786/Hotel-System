const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, getAllBookings, updateBookingStatus, updatePaymentStatus,
    getAllUsers, deleteUser, getAllHotelsAdmin, deleteHotel, deleteRoom,
    deleteBooking, adminCancelBooking
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);

// Dashboard Stats
router.get('/stats', getDashboardStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.put('/bookings/:id/payment', updatePaymentStatus);

// ✅ Admin cancel booking with email
router.put('/bookings/:id/admin-cancel', adminCancelBooking);

// Delete booking
router.delete('/bookings/:id', deleteBooking);

// Users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Hotels & Rooms
router.get('/hotels/all', getAllHotelsAdmin);
router.delete('/hotels/:id', deleteHotel);
router.delete('/rooms/:id', deleteRoom);

module.exports = router;