const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {triggerSOS} = require("../controllers/emergencySOSController.js");

const router = express.Router();

// POST /api/emergency/trigger
router.post("/trigger", authMiddleware, triggerSOS);

module.exports = router;
