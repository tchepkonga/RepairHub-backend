const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) return res.status(400).send('Invalid email or password.');

    // Validate password
    const validPassword = await user.validatePassword(req.body.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
