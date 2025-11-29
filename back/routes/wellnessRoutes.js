const express = require("express");
const router = express.Router();
const {
  logWellness,
  getWellnessLogs,
  getRecentLogs,
} = require("../controllers/wellnessController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE wellness log
router.post("/log", authMiddleware, logWellness);

// GET user wellness logs
router.get("/logs", authMiddleware, getWellnessLogs);

// GET recent logs (last 7)
router.get("/recent", authMiddleware, getRecentLogs);

module.exports = router;
