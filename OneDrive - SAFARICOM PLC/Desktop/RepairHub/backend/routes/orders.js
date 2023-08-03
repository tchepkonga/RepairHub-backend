const express = require('express');
const router = express.Router();

// Require the Order model we just created
const Order = require('../models/order');

router.post('/', async (req, res) => {
  let order = new Order({
    customerName: req.body.customerName,
    device: req.body.device,
    issue: req.body.issue
  });
  
  order = await order.save();

  res.send(order);
});

module.exports = router;
