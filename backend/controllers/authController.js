const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../services/emailService');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        const user = await User.create({ name, email, password, phone });
        
        // Send Welcome Email
        await sendWelcomeEmail(email, name);
        
        res.status(201).json({
            success: true,
            message: 'Account created successfully! Check your email for welcome message.',
            token: generateToken(user._id),
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required' });
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({
            success: true,
            message: 'Login successful!',
            token: generateToken(user._id),
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password').populate('wishlist');
    res.json({ success: true, user });
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, avatar } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { name, phone, avatar }, { new: true }).select('-password');
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!(await user.matchPassword(currentPassword))) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.addToWishlist = async (req, res) => {
    try {
        const { hotelId } = req.body;
        const user = await User.findById(req.user._id);
        if (!user.wishlist.includes(hotelId)) {
            user.wishlist.push(hotelId);
            await user.save();
        }
        res.json({ success: true, message: 'Added to wishlist' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { hotelId } = req.body;
        await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: hotelId } });
        res.json({ success: true, message: 'Removed from wishlist' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};