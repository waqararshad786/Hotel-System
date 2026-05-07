const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

// Public route - anyone can send message
router.post('/', sendContactMessage);

module.exports = router;