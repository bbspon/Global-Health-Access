const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // middleware for JWT
const {
  getShareSettings,
  saveShareSettings,
} = require("../controllers/profileShareController");

router.get("/settings", auth, getShareSettings);
router.post("/settings", auth, saveShareSettings);

module.exports = router;
