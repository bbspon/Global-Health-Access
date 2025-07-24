const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/healthInsightController");

router.get("/me", auth, controller.getMyInsights);
router.post("/generate", auth, controller.generateInsights);

module.exports = router;
