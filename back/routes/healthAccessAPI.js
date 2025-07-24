const express = require("express");
const {
  checkEligibility,
  regenerateApiKey,
  uploadNGOCSV,
} =require("../controllers/healthAccessAPIController") 
const router = express.Router();

// POST /api/health-access/check-eligibility
router.post("/check-eligibility", checkEligibility);

// POST /api/health-access/regenerate-api-key
router.post("/regenerate-api-key", regenerateApiKey);

// POST /api/health-access/upload-ngo-csv
router.post("/upload-ngo-csv", uploadNGOCSV);

module.exports = router;