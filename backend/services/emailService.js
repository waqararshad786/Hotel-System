const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Get sender name from env
const getFromEmail = () => {
    return process.env.EMAIL_FROM || `"LuxeStay" <${process.env.EMAIL_USER}>`;
};

// Send Simple Welcome Email
const sendWelcomeEmail = async (userEmail, userName) => {
    const mailOptions = {
        from: getFromEmail(),
        to: userEmail,
        subject: 'Welcome to LuxeStay! 🎉',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #1E3A5F; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1E3A5F; margin-top: 0;">Hello ${userName}!</h2>
                    <p>Thank you for joining LuxeStay. We're excited to have you on board!</p>
                    <p>You can now book luxury hotels across Pakistan at best prices.</p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}/hotels" style="background: #1E3A5F; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">Explore Hotels</a>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">Need help? Contact us at support@luxestay.com</p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${userEmail}`);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// Send Simple Booking Confirmation Email
const sendBookingConfirmationEmail = async (booking, user, hotel, room) => {
    const mailOptions = {
        from: getFromEmail(),
        to: user.email,
        subject: `Booking Confirmed! - ${booking.bookingId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #1E3A5F; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1E3A5F; margin-top: 0;">Booking Confirmed! ✅</h2>
                    <p>Dear <strong>${user.name}</strong>,</p>
                    <p>Your booking has been confirmed. Here are the details:</p>
                    
                    <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                        <p><strong>Hotel:</strong> ${hotel.name}</p>
                        <p><strong>Room:</strong> ${room.name}</p>
                        <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
                        <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> PKR ${booking.totalAmount?.toLocaleString()}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}/bookings/${booking._id}" style="background: #1E3A5F; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">View Booking</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">Need help? Contact us at support@luxestay.com</p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Booking email sent to ${user.email}`);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// Send Simple Booking Cancellation Email
const sendBookingCancellationEmail = async (booking, user, hotel, reason) => {
    const mailOptions = {
        from: getFromEmail(),
        to: user.email,
        subject: `Booking Cancelled - ${booking.bookingId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #dc2626; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #dc2626; margin-top: 0;">Booking Cancelled ❌</h2>
                    <p>Dear <strong>${user.name}</strong>,</p>
                    <p>Your booking has been cancelled as requested.</p>
                    
                    <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                        <p><strong>Hotel:</strong> ${hotel.name}</p>
                        <p><strong>Reason:</strong> ${reason || 'Not specified'}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}/hotels" style="background: #1E3A5F; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">Book Again</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">Need help? Contact us at support@luxestay.com</p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Cancellation email sent to ${user.email}`);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// Send Simple Check-in Reminder
const sendCheckInReminderEmail = async (booking, user, hotel) => {
    const mailOptions = {
        from: getFromEmail(),
        to: user.email,
        subject: `Check-in Reminder - ${hotel.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #1E3A5F; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1E3A5F; margin-top: 0;">Your stay starts soon! 🎒</h2>
                    <p>Dear <strong>${user.name}</strong>,</p>
                    <p>This is a reminder that your check-in at <strong>${hotel.name}</strong> is tomorrow!</p>
                    
                    <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>Hotel:</strong> ${hotel.name}</p>
                        <p><strong>Check-in Date:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
                        <p><strong>Check-in Time:</strong> 2:00 PM</p>
                        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    </div>
                    
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}/bookings/${booking._id}" style="background: #1E3A5F; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">View Details</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">Need help? Call us at +92 300 1234567</p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reminder email sent to ${user.email}`);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// Send Simple Thank You Email after Check-out
const sendCheckOutThankYouEmail = async (user, hotel, booking) => {
    const mailOptions = {
        from: getFromEmail(),
        to: user.email,
        subject: `Thank you for staying at ${hotel.name}! ⭐`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #10B981; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #10B981; margin-top: 0;">Thank you for staying with us! 🌟</h2>
                    <p>Dear <strong>${user.name}</strong>,</p>
                    <p>Thank you for choosing <strong>${hotel.name}</strong>. We hope you had a wonderful experience!</p>
                    
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${process.env.FRONTEND_URL}/hotels/${hotel._id}" style="background: #1E3A5F; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">Write a Review</a>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 10px; border-radius: 5px; text-align: center;">
                        <p style="margin: 0;"><strong>🎁 Special Offer!</strong> Use code <strong>WELCOMEBACK10</strong> for 10% off your next booking.</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">Book again at <a href="${process.env.FRONTEND_URL}" style="color: #1E3A5F;">LuxeStay</a></p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Thank you email sent to ${user.email}`);
    } catch (error) {
        console.error('❌ Email error:', error.message);
    }
};

// ✅ Send Contact Reply Email - Simple version with proper subject and message
const sendContactReplyEmail = async (userEmail, userName, originalSubject, adminReply, originalMessage) => {
    const mailOptions = {
        from: getFromEmail(),
        to: userEmail,
        subject: `Re: ${originalSubject} - LuxeStay Support`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 10px;">
                <div style="background: #1E3A5F; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0;">🏨 LuxeStay Support</h1>
                </div>
                <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #1E3A5F; margin-top: 0;">Hello ${userName},</h2>
                    <p>Thank you for contacting LuxeStay. Here's our response to your inquiry:</p>
                    
                    <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>📧 Your Subject:</strong> ${originalSubject}</p>
                        <p style="margin: 0;"><strong>💬 Your Message:</strong></p>
                        <p style="margin: 5px 0 0 20px; color: #555;">${originalMessage}</p>
                    </div>
                    
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 0 0 10px 0;"><strong>✉️ Our Response:</strong></p>
                        <p style="margin: 5px 0 0 20px; color: #2e7d32;">${adminReply}</p>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 10px; border-radius: 5px; margin: 15px 0;">
                        <p style="margin: 0; font-size: 13px; color: #92400e;">📌 Need more help? Feel free to reply to this email or call our support team.</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px; text-align: center;">
                        Thank you for choosing LuxeStay!<br>
                        <a href="${process.env.FRONTEND_URL}" style="color: #1E3A5F;">Visit our website</a>
                    </p>
                </div>
            </div>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reply email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('❌ Email error:', error.message);
        return false;
    }
};

module.exports = {
    sendWelcomeEmail,
    sendBookingConfirmationEmail,
    sendBookingCancellationEmail,
    sendCheckInReminderEmail,
    sendCheckOutThankYouEmail,
    sendContactReplyEmail
};