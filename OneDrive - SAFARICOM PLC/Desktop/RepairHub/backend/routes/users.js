const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

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
router.post('/register', [
  // Check if email is valid
  check('email').isEmail().withMessage('Email is not valid'),
  // Check if password is at least 5 chars long
  check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  
  try {
      // Check if email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send('User already registered.');

      user = new User(req.body);
      await user.save();

      // Optionally: send a token or some data back upon successful registration
      res.send({
          email: user.email,
          id: user._id
      });
  } catch (error) {
      res.status(400).send(error.message);
  }
});
// Admin-only route
router.get('/admin-endpoint', auth('admin'), (req, res) => {
  res.send('Hello Admin!');
});

// Employee-only route
router.get('/employee-endpoint', auth('employee'), (req, res) => {
  res.send('Hello Employee!');
});

module.exports = router;
