const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getUserQRCode } = require("../controllers/qrController");

router.get("/user/qr", auth, getUserQRCode);

module.exports = router;
