const express = require("express");
const {
  createOrder,
  verifyAndComplete,
} = require("../controllers/paymentController");
const auth = require("../middleware/auth");

const router = express.Router();
router.post("/razorpay-order", auth, createOrder);
router.post("/razorpay-complete", auth, verifyAndComplete);

module.exports = router;
