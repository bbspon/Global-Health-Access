const express = require("express");
const { triggerSOS } = require("../controllers/emergencyController");
const auth = require("../middleware/auth");

const router = express.Router();
router.post("/trigger", auth, triggerSOS);

module.exports = router;
