const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
};

// Configure storage for hotel images
const hotelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/hotels/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        console.log(`Saving hotel image: ${filename}`);
        cb(null, filename);
    }
});

// Configure storage for room images
const roomStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/rooms/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + path.extname(file.originalname);
        console.log(`Saving room image: ${filename}`);
        cb(null, filename);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

// Upload middleware - allow multiple files with field name 'images'
const uploadHotelImages = multer({
    storage: hotelStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
}).array('images', 10);  // ✅ Field name should be 'images'

const uploadRoomImages = multer({
    storage: roomStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).array('images', 10);  // ✅ Field name should be 'images'

module.exports = { uploadHotelImages, uploadRoomImages };