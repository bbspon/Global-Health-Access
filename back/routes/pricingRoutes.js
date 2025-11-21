const express = require("express");
const router = express.Router();

const {
  calculatePrice,
  getPriceMatrix,
  getComputedMatrix,
} = require("../controllers/pricingController");

// POST → Calculate premium
router.post("/calculate", calculatePrice);

// GET → Reference matrix (static tables)
router.get("/matrix", getPriceMatrix);

// GET → Computed full matrix (optional)
router.get("/computed", getComputedMatrix);

module.exports = router;
