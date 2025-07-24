const express = require("express");
const router = express.Router();
const {
  getUserTrends,
  createTrend,
} = require("../controllers/healthInsightsTrendController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getUserTrends);
router.post("/", authMiddleware, createTrend);

module.exports = router;
