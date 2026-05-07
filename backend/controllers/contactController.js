const Contact = require('../models/Contact');
const { sendContactReplyEmail } = require('../services/emailService');

// @POST /api/contact - Send contact message
exports.sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        const contact = await Contact.create({
            name, email, subject, message
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully! We will get back to you soon.',
            contact 
        });
    } catch (err) {
        console.error('Contact error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/admin/contacts - Get all contact messages (Admin only)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        const stats = {
            total: await Contact.countDocuments(),
            unread: await Contact.countDocuments({ status: 'unread' }),
            read: await Contact.countDocuments({ status: 'read' }),
            replied: await Contact.countDocuments({ status: 'replied' })
        };
        res.json({ success: true, contacts, stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/admin/contacts/:id/read - Mark contact as read
exports.markAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { status: 'read' }, 
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/admin/contacts/:id/reply - Reply to contact
exports.replyToContact = async (req, res) => {
    try {
        const { replyMessage } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: 'replied', replyMessage, repliedAt: new Date() },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @DELETE /api/admin/contacts/:id - Delete contact message
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};





// @POST /api/contact - Send contact message
exports.sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        const contact = await Contact.create({
            name, email, subject, message
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully! We will get back to you soon.',
            contact 
        });
    } catch (err) {
        console.error('Contact error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @GET /api/admin/contacts - Get all contact messages (Admin only)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        const stats = {
            total: await Contact.countDocuments(),
            unread: await Contact.countDocuments({ status: 'unread' }),
            read: await Contact.countDocuments({ status: 'read' }),
            replied: await Contact.countDocuments({ status: 'replied' })
        };
        res.json({ success: true, contacts, stats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/admin/contacts/:id/read - Mark contact as read
exports.markAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id, 
            { status: 'read' }, 
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, contact });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @PUT /api/admin/contacts/:id/reply - Reply to contact (Sends email)
exports.replyToContact = async (req, res) => {
    try {
        const { replyMessage } = req.body;
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        
        // Send email to user with original subject and message
        const emailSent = await sendContactReplyEmail(
            contact.email,
            contact.name,
            contact.subject,     // Original subject
            replyMessage,        // Admin's reply
            contact.message      // Original message
        );
        
        // Update contact status
        contact.status = 'replied';
        contact.replyMessage = replyMessage;
        contact.repliedAt = new Date();
        await contact.save();
        
        res.json({ 
            success: true, 
            message: emailSent ? 'Reply sent successfully! Customer will receive email shortly.' : 'Reply saved but email could not be sent.',
            contact 
        });
    } catch (err) {
        console.error('Reply error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @DELETE /api/admin/contacts/:id - Delete contact message
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};