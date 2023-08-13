const express = require('express');
const multer = require('multer');
const router = express.Router();

// Require the Order model
const Order = require('../models/order');

const upload = multer({ dest: 'uploads/' });

// Post route for adding a new order
router.post('/', upload.single('signedDocument'), async (req, res) => {
  try {
    // Check if the file was uploaded
    if (!req.file || !req.file.path) {
      return res.status(400).send("File not uploaded correctly.");
    }

    const order = new Order({
      customerName: req.body.customerName,
      device: req.body.device,
      issue: req.body.issue,
      status: 'Received',
      signedDocument: req.file.path
    });

    const result = await order.save();
    res.send(result);
  } catch (error) {
    console.log("Error saving the order:", error);
    res.status(400).send(error.message);
  }
});

// Get route for fetching paginated orders
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const skip = (page - 1) * limit;

        const orders = await Order.find().skip(skip).limit(limit);
        res.json(orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(400).send(error.message);
    }
});

// Get route for search and filtering orders
router.get('/search', async (req, res) => {
    try {
        const { customerName, device } = req.query;
        let filter = {};

        if (customerName) {
            filter.customerName = new RegExp(customerName, 'i');
        }

        if (device) {
            filter.device = new RegExp(device, 'i');
        }

        const orders = await Order.find(filter);
        res.json(orders);
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
