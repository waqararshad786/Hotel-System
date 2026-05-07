const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    images: [{ type: String }],
    emoji: { type: String, default: '🏨' },
    amenities: [{ type: String }],
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    pricePerNight: { type: Number, default: 0 },
    contactPhone: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    checkInTime: { type: String, default: '2:00 PM' },
    checkOutTime: { type: String, default: '12:00 PM' }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);