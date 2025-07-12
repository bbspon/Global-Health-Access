const express = require("express");
const {
  initiatePayment,
  payWithWallet,
} = require("../controllers/planPaymentController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/initiate", auth, initiatePayment);
router.post("/wallet-pay", auth, payWithWallet);

module.exports = router;
