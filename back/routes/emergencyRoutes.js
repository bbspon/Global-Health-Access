const express = require("express");
const { triggerSOS, getLogs } = require("../controllers/emergencyController");
const auth = require("../middleware/auth");

const router = express.Router();
router.post("/trigger", auth, triggerSOS);
router.get("/logs", auth, getLogs);

module.exports = router;
