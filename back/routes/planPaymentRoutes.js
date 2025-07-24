// routes/planPaymentRoutes.js
const express = require("express");
const router = express.Router();
const planPaymentController = require("../controllers/planPaymentController");
const auth = require("../middleware/auth");

router.post("/pay/initiate", auth, planPaymentController.initiatePayment);
router.post("/pay/confirm", auth, planPaymentController.confirmPayment);

module.exports = router;
