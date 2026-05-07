const Booking = require('../models/Booking');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const { sendBookingConfirmationEmail, sendBookingCancellationEmail } = require('../services/emailService');

// @POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const { hotelId, roomId, checkIn, checkOut, guestName, guestPhone, guestEmail, specialRequests } = req.body;
        
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
        if (!room.isAvailable) return res.status(400).json({ success: false, message: 'Room not available' });
        
        const hotel = await Hotel.findById(hotelId);
        if (!hotel || !hotel.isActive) return res.status(404).json({ success: false, message: 'Hotel not found' });
        
        const d1 = new Date(checkIn);
        const d2 = new Date(checkOut);
        if (d2 <= d1) return res.status(400).json({ success: false, message: 'Invalid dates' });
        
        const nights = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        const subtotal = room.pricePerNight * nights;
        const taxes = Math.round(subtotal * 0.16);
        const totalAmount = subtotal + taxes;
        
        const booking = await Booking.create({
            user: req.user._id,
            hotel: hotelId,
            room: roomId,
            guestName, guestPhone, guestEmail,
            checkIn: d1, checkOut: d2,
            nights, pricePerNight: room.pricePerNight,
            subtotal, taxes, totalAmount,
            specialRequests
        });
        
        await booking.populate(['hotel', 'room']);
        
        const user = await User.findById(req.user._id);
        await sendBookingConfirmationEmail(booking, user, hotel, room);
        
        res.status(201).json({ success: true, message: 'Booking confirmed! Check your email for details.', booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/bookings/my
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('hotel', 'name city emoji images stars')
            .populate('room', 'name type pricePerNight capacity images amenities')
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/bookings/:id
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('hotel')
            .populate('room')
            .populate('user', 'name email');
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
    try {
        const { reason } = req.body;
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        if (booking.status === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Already cancelled' });
        }
        
        booking.status = 'cancelled';
        booking.cancellationReason = reason || 'No reason provided';
        booking.cancelledAt = new Date();
        await booking.save();
        
        const user = await User.findById(req.user._id);
        const hotel = await Hotel.findById(booking.hotel);
        await sendBookingCancellationEmail(booking, user, hotel, reason);
        
        res.json({ success: true, message: 'Booking cancelled. Check your email for confirmation.', booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/bookings/check-availability
exports.checkAvailability = async (req, res) => {
    try {
        const { roomId, checkIn, checkOut } = req.query;
        const overlapping = await Booking.find({
            room: roomId,
            status: { $in: ['confirmed', 'pending'] },
            $or: [
                { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
                { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } }
            ]
        });
        res.json({ success: true, available: overlapping.length === 0 });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
// @PUT /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
    try {
        const { reason } = req.body;
        console.log('Cancel request for booking:', req.params.id);
        console.log('Cancel reason:', reason);
        
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        
        if (booking.status === 'cancelled') {
            return res.status(400).json({ success: false, message: 'Already cancelled' });
        }
        
        booking.status = 'cancelled';
        booking.cancellationReason = reason || 'No reason provided';
        booking.cancelledAt = new Date();
        await booking.save();
        
        console.log('Booking cancelled successfully:', booking._id);
        
        res.json({ success: true, message: 'Booking cancelled successfully', booking });
    } catch (err) {
        console.error('Cancel error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};