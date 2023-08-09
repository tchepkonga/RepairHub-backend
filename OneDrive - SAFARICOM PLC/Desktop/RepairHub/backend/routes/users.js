const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials.' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).send({ error: 'Invalid login credentials.' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Server error. Please try again later.' });
    }
});

// Registration Route
router.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(req.body);
        await user.save();

        res.send({
            email: user.email,
            id: user._id
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
