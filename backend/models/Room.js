const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['standard', 'deluxe', 'suite', 'presidential'], required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, default: 2 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    roomNumber: { type: String, required: true },
    totalRooms: { type: Number, default: 1 },
    bookedRooms: { type: Number, default: 0 }
}, { timestamps: true });

roomSchema.virtual('availableRooms').get(function() {
    return this.totalRooms - this.bookedRooms;
});

module.exports = mongoose.model('Room', roomSchema);