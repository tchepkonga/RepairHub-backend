const mongoose = require('mongoose');

// Define a schema
const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  device: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  issue: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Compile the schema into a model, it will automatically create a collection 'orders'
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
