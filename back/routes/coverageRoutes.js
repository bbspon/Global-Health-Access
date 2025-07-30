const express = require("express");
const router = express.Router();
const {
  checkCoverage,
  simulateCoverage,
} = require("../controllers/coverageController");

router.get("/check", checkCoverage); // /api/coverage/check?userId=xxx
router.post("/simulate", simulateCoverage); // /api/coverage/simulate

module.exports = router;
