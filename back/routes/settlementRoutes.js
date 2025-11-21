const express = require("express");
const router = express.Router();

const {
  generateSettlement,
  getSettlements,
} = require("../controllers/settlementController");

// POST → Generate monthly settlement
router.post("/generate", generateSettlement);

// GET → Fetch settlement history
router.get("/", getSettlements);

module.exports = router;
