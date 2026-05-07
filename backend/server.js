const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const path = require('path');
const fs = require('fs');

dotenv.config();
connectDb();

const app = express();

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const hotelsDir = path.join(uploadsDir, 'hotels');
const roomsDir = path.join(uploadsDir, 'rooms');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(hotelsDir)) fs.mkdirSync(hotelsDir, { recursive: true });
if (!fs.existsSync(roomsDir)) fs.mkdirSync(roomsDir, { recursive: true });

// CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
// After other routes
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: '🏨 LuxeStay API Running ✅',
        version: '2.0.0'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads folder: ${uploadsDir}`);
    console.log(`📁 Hotels images: ${hotelsDir}`);
    console.log(`📁 Rooms images: ${roomsDir}`);
});