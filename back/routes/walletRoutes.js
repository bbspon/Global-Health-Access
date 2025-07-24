// routes/walletRoutes.js

const express = require("express");
const router = express.Router();
const {
  getWalletBalance,
  topupWallet,
  getWalletDetails,
  getWalletHistory,
} = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/wallet", authMiddleware, getWalletBalance);
router.post("/topup", authMiddleware, topupWallet);
router.get("/my-wallet", authMiddleware, getWalletDetails);
router.get(
  "/wallet-history",
  authMiddleware,
  getWalletHistory
);

module.exports = router;
