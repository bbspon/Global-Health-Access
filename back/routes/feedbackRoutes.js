// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");
const auth = require("../middleware/authMiddleware");

router.post("/submit", auth, submitFeedback);
router.get("/all", auth, getAllFeedback); // Admin only

module.exports = router;
