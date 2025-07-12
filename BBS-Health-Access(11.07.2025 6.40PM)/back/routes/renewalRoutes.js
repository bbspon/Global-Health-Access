const express = require("express");
const { getPlansExpiringSoon } = require("../controllers/renewalController");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
router.get("/upcoming-renewals", adminAuth, getPlansExpiringSoon);

module.exports = router;
