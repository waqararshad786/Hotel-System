const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const path = require('path');
const fs = require('fs');

dotenv.config();
connectDb();

const app = express();

// ✅ Updated CORS - Allow Vercel frontend
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5000',
    'https://hotel-system-weld.vercel.app',
    'https://hotel-system.vercel.app',
    'https://*.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        
        // Allow all Vercel preview deployments
        if (origin && origin.includes('.vercel.app')) {
            return callback(null, true);
        }
        
        console.log('Blocked origin:', origin);
        callback(null, true); // Allow all for now (temporary)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const hotelsDir = path.join(uploadsDir, 'hotels');
const roomsDir = path.join(uploadsDir, 'rooms');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(hotelsDir)) fs.mkdirSync(hotelsDir, { recursive: true });
if (!fs.existsSync(roomsDir)) fs.mkdirSync(roomsDir, { recursive: true });

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: '🏨 LuxeStay API Running ✅',
        version: '2.0.0'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found: ' + req.url });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads folder: ${uploadsDir}`);
    console.log(`✅ CORS enabled for all origins (development mode)`);
});