require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/weather_dashboard_default_fallback_prevent_crash');
        console.log('connected');
        
        const email = 'test@test.com'.toLowerCase().trim();
        const user = await User.findOne({ email });
        console.log('User found:', user ? user.email : 'No user');

        if (user) {
            const isMatch = await user.comparePassword('password');
            console.log('Password match:', isMatch);
        } else {
            console.log('Testing create!');
            await User.create({ email: 'test@test.com', password: 'password', isAdmin: true });
            console.log('Created user');
        }
    } catch(e) {
        console.error('ERROR OCCURRED:', e);
    } finally {
        mongoose.disconnect();
    }
}
run();
