require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const orders = require('./routes/orders');
const logger = require('./middleware/logger'); // Add logger
const rateLimit = require("express-rate-limit"); // Add rate-limiter

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(logger);  // Logging middleware

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use("/api/", apiLimiter); // Apply rate limiting to routes beginning with /api/

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/orders', orders);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
  console.log(`RepairHub app listening at http://localhost:${port}`)
});

