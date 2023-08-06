const express = require('express');
const multer = require('multer');
const router = express.Router();

// Require the Order model
const Order = require('../models/order');

const upload = multer({ dest: 'uploads/' });

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

module.exports = router;
