// routes/planEligibilityRoutes.js
const express = require("express");
const router = express.Router();
const {
  checkEligibility,
} = require("../controllers/planEligibilityController");
const auth = require("../middleware/auth");

router.post("/check-eligibility", auth, checkEligibility);

module.exports = router;
