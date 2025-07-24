const express = require("express");
const router = express.Router();
const performanceScoreController = require("../controllers/performanceScoreController");
const authMiddleware = require("../middleware/authMiddleware"); // optional

router.get("/", authMiddleware, performanceScoreController.getAllScores);
router.post("/", authMiddleware, performanceScoreController.createScore); // optional

module.exports = router;
