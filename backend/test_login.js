const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function testLogin() {
    try {
        console.log('Testing login...');
        const user = await User.findByRegNo('21BCE0001');
        if (!user) {
            console.log('User not found');
            process.exit(0);
        }
        
        console.log('User found:', user.reg_no);
        const isMatch = await bcrypt.compare('password123', user.password);
        console.log('Password match:', isMatch);

        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name, reg_no: user.reg_no, room_no: user.room_no },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        console.log('JWT generated:', token);
        
        process.exit(0);
    } catch (err) {
        console.error('Test Error:', err);
        process.exit(1);
    }
}
testLogin();
