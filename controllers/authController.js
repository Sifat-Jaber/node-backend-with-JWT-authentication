const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const authController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create a new user
            const user = new User({ username, password });
            await user.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find the user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Compare passwords
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    }
};

module.exports = authController;