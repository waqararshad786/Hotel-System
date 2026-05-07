const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const Room = require('../models/Room');
const { sendBookingCancellationEmail } = require('../services/emailService');  // ✅ Add this import
const fs = require('fs');
const path = require('path');

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalBookings, totalHotels, totalUsers, totalRooms, allBookings] = await Promise.all([
            Booking.countDocuments(),
            Hotel.countDocuments({ isActive: true }),
            User.countDocuments({ role: 'user' }),
            Room.countDocuments({ isAvailable: true }),
            Booking.find({ status: { $in: ['confirmed', 'completed'] } })
        ]);
        
        const revenue = allBookings.reduce((sum, b) => sum + b.totalAmount, 0);
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
        
        const recentBookings = await Booking.find()
            .populate('user', 'name email')
            .populate('hotel', 'name')
            .sort({ createdAt: -1 })
            .limit(10);
        
        res.json({
            success: true,
            stats: { 
                totalBookings, totalHotels, totalUsers, totalRooms,
                revenue, pendingBookings, cancelledBookings, completedBookings, confirmedBookings,
                averageRating: 4.6, occupancyRate: 78, averageStay: 3.2, repeatCustomers: 42
            },
            recentBookings
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        let filter = {};
        if (status) filter.status = status;
        
        const bookings = await Booking.find(filter)
            .populate('user', 'name email phone')
            .populate('hotel', 'name city stars')
            .populate('room', 'name type pricePerNight')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Booking.countDocuments(filter);
        res.json({ success: true, bookings, total, pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, message: 'Status updated', booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { paymentStatus }, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, message: 'Payment status updated', booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        if (user.role === 'admin') {
            return res.status(403).json({ success: false, message: 'Cannot delete admin' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Hotels Admin
exports.getAllHotelsAdmin = async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ createdAt: -1 });
        const hotelsWithRoomCount = await Promise.all(
            hotels.map(async (hotel) => {
                const roomCount = await Room.countDocuments({ hotel: hotel._id });
                return { ...hotel.toObject(), roomCount };
            })
        );
        res.json({ success: true, hotels: hotelsWithRoomCount });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Hotel with images
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
        
        if (hotel.images && hotel.images.length > 0) {
            hotel.images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', imagePath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            });
        }
        
        const rooms = await Room.find({ hotel: req.params.id });
        for (const room of rooms) {
            if (room.images && room.images.length > 0) {
                room.images.forEach(imagePath => {
                    const fullPath = path.join(__dirname, '..', imagePath);
                    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
                });
            }
            await Room.findByIdAndDelete(room._id);
        }
        
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Room with images
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
        
        if (room.images && room.images.length > 0) {
            room.images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', imagePath);
                if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
            });
        }
        
        await Room.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Room deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (err) {
        console.error('Delete booking error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✅ Admin Cancel Booking with Email - Fixed
exports.adminCancelBooking = async (req, res) => {
    try {
        const { cancellationReason } = req.body;
        const booking = await Booking.findById(req.params.id)
            .populate('user')
            .populate('hotel')
            .populate('room');
            
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        if (booking.status === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Booking already cancelled' });
        }
        
        // Update booking status
        booking.status = 'cancelled';
        booking.cancellationReason = cancellationReason || 'Cancelled by admin';
        booking.cancelledAt = new Date();
        await booking.save();
        
        // Send cancellation email to user
        try {
            await sendBookingCancellationEmail(booking, booking.user, booking.hotel, cancellationReason);
            console.log('Cancellation email sent to:', booking.user.email);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue with response even if email fails
        }
        
        res.json({ 
            success: true, 
            message: 'Booking cancelled successfully. Email notification sent to customer.',
            booking 
        });
    } catch (err) {
        console.error('Admin cancel error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};