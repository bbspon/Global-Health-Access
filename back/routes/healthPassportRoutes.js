// routes/healthPassportRoutes.js
const express = require("express");
const router = express.Router();
const {
  getHealthPassportByUserId,
  exportPDF,
  exportFHIR,
  exportZIP,
  generateSecureLink,
} = require("../controllers/healthPassportController");

// GET
router.get("/:userId", getHealthPassportByUserId);

// POST (Optional export actions)
router.post("/export/pdf", exportPDF);
router.post("/export/fhir", exportFHIR);
router.post("/export/zip", exportZIP);
router.post("/export/secure-link", generateSecureLink);

module.exports = router;
