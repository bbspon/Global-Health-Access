// routes/qrHealthPassRoutes.js
const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrHealthPassController");

router.post("/generate", qrController.generateQrToken);
router.post("/scan", qrController.recordScan);
router.get("/history/:userId", qrController.getScanHistory);

module.exports = router;
