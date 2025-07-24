// routes/dynamicPricingRoutes.js
const express = require("express");
const router = express.Router();
const { calculatePrice } = require("../controllers/dynamicPricingController");
const auth = require("../middleware/auth");

router.post("/calculate", auth, calculatePrice);

module.exports = router;
