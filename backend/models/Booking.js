const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    guestName: { type: String, required: true },
    guestPhone: { type: String, required: true },
    guestEmail: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    nights: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    bookingId: { type: String, unique: true },
    specialRequests: { type: String, default: '' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    cancellationReason: { type: String, default: '' },
    cancelledAt: { type: Date }
}, { timestamps: true });

bookingSchema.pre('save', function(next) {
    if (!this.bookingId) {
        this.bookingId = 'LXS-' + Date.now().toString().slice(-8).toUpperCase();
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);