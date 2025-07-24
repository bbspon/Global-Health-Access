const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyDigitalCard,
  refreshQrToken,
} = require("../controllers/digitalHealthCardController");

router.get("/digital-card", authMiddleware, getMyDigitalCard);
router.put("/digital-card/refresh", authMiddleware, refreshQrToken);

module.exports = router;
