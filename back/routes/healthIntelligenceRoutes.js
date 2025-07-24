const express = require("express");
const router = express.Router();
const {
  getIntelligenceData,
} = require("../controllers/healthIntelligenceController");
const auth = require("../middleware/auth");

router.get("/intelligence/:role", auth, getIntelligenceData);

module.exports = router;
