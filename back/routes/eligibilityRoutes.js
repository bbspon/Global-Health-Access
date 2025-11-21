const express = require("express");
const router = express.Router();

const {
  checkEligibilityController,
} = require("../controllers/eligibilityController");

// POST → Check eligibility for plan + addons
router.post("/check", checkEligibilityController);

module.exports = router;
