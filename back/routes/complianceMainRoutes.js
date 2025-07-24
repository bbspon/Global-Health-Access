// routes/complianceMainRoutes.js
const express = require("express");
const router = express.Router();
const {
  getComplianceMain,
} = require("../controllers/complianceMainController");
const authMiddleware = require("../middleware/authMiddleware"); // optional

// GET /api/compliance/main
router.get("/main", authMiddleware, getComplianceMain);

module.exports = router;
