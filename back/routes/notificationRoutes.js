const express = require("express");
const router = express.Router();
const {
  getNotifications,
  createNotification,
} = require("../controllers/notificationController");

// You can add auth middleware if needed for admin routes
router.get("/", getNotifications); // ?role=hospital|admin|user
router.post("/create", createNotification);

module.exports = router;
