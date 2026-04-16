const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, reg_no, password, role, room_no } = req.body;
        
        // Check if user exists
        const existingUser = await User.findByRegNo(reg_no);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this Registration Number' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userId = await User.create(name, reg_no, hashedPassword, role || 'student', room_no);

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

exports.login = async (req, res) => {
    try {
        const { reg_no, password } = req.body;

        // Find user
        const user = await User.findByRegNo(reg_no);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name, reg_no: user.reg_no, room_no: user.room_no },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: { id: user.id, name: user.name, role: user.role, reg_no: user.reg_no, room_no: user.room_no }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
