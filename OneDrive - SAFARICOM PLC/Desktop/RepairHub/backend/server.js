const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const orders = require('./routes/orders');

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;

app.use('/api/users', require('./routes/users'));

app.use('/api/login', require('./routes/login'));


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/repairhub', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api/orders', orders);

app.listen(port, () => {
  console.log(`RepairHub app listening at http://localhost:${port}`)
});
