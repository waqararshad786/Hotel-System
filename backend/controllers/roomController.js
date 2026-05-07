const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const fs = require('fs');
const path = require('path');

// @GET /api/rooms/hotel/:hotelId
exports.getRoomsByHotel = async (req, res) => {
    try {
        const rooms = await Room.find({ hotel: req.params.hotelId, isAvailable: true }).sort({ pricePerNight: 1 });
        res.json({ success: true, rooms });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel', 'name city address');
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
        res.json({ success: true, room });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @POST /api/rooms (admin)
exports.createRoom = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.body.hotel);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        
        const imagePaths = [];
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagePaths.push(`uploads/rooms/${file.filename}`);
            });
        }
        
        let amenities = req.body.amenities;
        if (typeof amenities === 'string') {
            amenities = amenities.split(',').map(a => a.trim());
        }
        
        const roomData = {
            hotel: req.body.hotel,
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            pricePerNight: parseInt(req.body.pricePerNight),
            capacity: parseInt(req.body.capacity),
            amenities: amenities || [],
            roomNumber: req.body.roomNumber,
            images: imagePaths
        };
        
        const room = await Room.create(roomData);
        res.status(201).json({ success: true, room });
    } catch (err) {
        console.error('Create room error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/rooms/:id (admin)
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
        
        const imagePaths = [...room.images];
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagePaths.push(`uploads/rooms/${file.filename}`);
            });
        }
        
        let amenities = req.body.amenities;
        if (typeof amenities === 'string') {
            amenities = amenities.split(',').map(a => a.trim());
        }
        
        const roomData = {
            name: req.body.name || room.name,
            type: req.body.type || room.type,
            description: req.body.description || room.description,
            pricePerNight: parseInt(req.body.pricePerNight) || room.pricePerNight,
            capacity: parseInt(req.body.capacity) || room.capacity,
            amenities: amenities || room.amenities,
            roomNumber: req.body.roomNumber || room.roomNumber,
            images: imagePaths
        };
        
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, roomData, { new: true });
        res.json({ success: true, room: updatedRoom });
    } catch (err) {
        console.error('Update room error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @DELETE /api/rooms/:id (admin)
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
        
        // Delete room images from filesystem
        if (room.images && room.images.length > 0) {
            room.images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', imagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }
        
        await Room.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Room deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};