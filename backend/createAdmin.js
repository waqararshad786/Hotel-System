const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Delete existing admin
        await User.deleteMany({ email: 'waqar321arshad@gmail.com' });
        console.log('🗑️ Old admin removed');

        // Create admin
        const admin = await User.create({
            name: 'Waqar Arshad',
            email: 'waqar321arshad@gmail.com',
            password: '232611',
            role: 'admin',
            phone: '03001234567'
        });

        console.log('\n✅ Admin created successfully!');
        console.log('📧 Email: waqar321arshad@gmail.com');
        console.log('🔑 Password: 232611');
        console.log('👤 Role: admin');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
};

createAdmin();