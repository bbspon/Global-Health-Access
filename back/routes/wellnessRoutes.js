const express = require("express");
const {
  logWellness,
  getWellnessLogs,
} = require("../controllers/wellnessController");
const auth = require("../middleware/auth");

const router = express.Router();
router.post("/log", auth, logWellness);
router.get("/recent", auth, getWellnessLogs);

module.exports = router;
