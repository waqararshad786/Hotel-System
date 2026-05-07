const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const fs = require('fs');
const path = require('path');

// @GET /api/hotels
exports.getAllHotels = async (req, res) => {
    try {
        const { city, stars, search, minPrice, maxPrice } = req.query;
        let filter = { isActive: true };
        
        if (city) filter.city = new RegExp(city, 'i');
        if (stars) filter.stars = Number(stars);
        if (search) filter.name = new RegExp(search, 'i');
        
        const hotels = await Hotel.find(filter).sort({ stars: -1, createdAt: -1 });
        res.json({ success: true, count: hotels.length, hotels });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/hotels/cities
exports.getCities = async (req, res) => {
    try {
        const cities = await Hotel.distinct('city', { isActive: true });
        res.json({ success: true, cities });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/hotels/:id
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        const rooms = await Room.find({ hotel: hotel._id, isAvailable: true }).sort({ pricePerNight: 1 });
        res.json({ success: true, hotel, rooms });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @POST /api/hotels (admin)
exports.createHotel = async (req, res) => {
    try {
        console.log('Creating hotel with body:', req.body);
        console.log('Files received:', req.files);
        
        const imagePaths = [];
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagePaths.push(`uploads/hotels/${file.filename}`);
            });
        }
        
        // Parse amenities
        let amenities = req.body.amenities;
        if (typeof amenities === 'string') {
            try {
                amenities = JSON.parse(amenities);
            } catch (e) {
                amenities = amenities.split(',').map(a => a.trim());
            }
        }
        
        const hotelData = {
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            description: req.body.description,
            stars: parseInt(req.body.stars),
            emoji: req.body.emoji || '🏨',
            amenities: amenities || [],
            images: imagePaths,
            pricePerNight: parseInt(req.body.pricePerNight) || 0
        };
        
        console.log('Hotel data to save:', hotelData);
        
        const hotel = await Hotel.create(hotelData);
        res.status(201).json({ success: true, hotel });
    } catch (err) {
        console.error('Create hotel error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/hotels/:id (admin)
exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        
        const imagePaths = [...hotel.images];
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagePaths.push(`uploads/hotels/${file.filename}`);
            });
        }
        
        let amenities = req.body.amenities;
        if (typeof amenities === 'string') {
            try {
                amenities = JSON.parse(amenities);
            } catch (e) {
                amenities = amenities.split(',').map(a => a.trim());
            }
        }
        
        const hotelData = {
            name: req.body.name || hotel.name,
            city: req.body.city || hotel.city,
            address: req.body.address || hotel.address,
            description: req.body.description || hotel.description,
            stars: parseInt(req.body.stars) || hotel.stars,
            emoji: req.body.emoji || hotel.emoji,
            amenities: amenities || hotel.amenities,
            images: imagePaths,
            pricePerNight: parseInt(req.body.pricePerNight) || hotel.pricePerNight
        };
        
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, hotelData, { new: true });
        res.json({ success: true, hotel: updatedHotel });
    } catch (err) {
        console.error('Update hotel error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @DELETE /api/hotels/:id (admin)
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }
        
        // Delete hotel images
        if (hotel.images && hotel.images.length > 0) {
            hotel.images.forEach(imagePath => {
                const fullPath = path.join(__dirname, '..', imagePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }
        
        // Delete rooms and their images
        const rooms = await Room.find({ hotel: req.params.id });
        for (const room of rooms) {
            if (room.images && room.images.length > 0) {
                room.images.forEach(imagePath => {
                    const fullPath = path.join(__dirname, '..', imagePath);
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath);
                    }
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