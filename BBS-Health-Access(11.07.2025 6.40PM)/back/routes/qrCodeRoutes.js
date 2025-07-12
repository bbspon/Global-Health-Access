const express = require("express");
const { createOrGetQRCode } = require("../controllers/qrCodeController");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/my-health-id", auth, createOrGetQRCode);

module.exports = router;
