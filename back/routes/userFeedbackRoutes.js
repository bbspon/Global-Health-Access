// routes/userFeedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
} = require("../controllers/userFeedbackController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadImage"); // for optional image upload

router.post("/submit", authMiddleware, upload.single("image"), submitFeedback);

router.get("/all", authMiddleware, getAllFeedback); // for admin

module.exports = router;
