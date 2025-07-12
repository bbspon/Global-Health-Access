const express = require("express");
const {
  createTopUpOrder,
  confirmTopUp,
} = require("../controllers/walletController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/topup-order", auth, createTopUpOrder);
router.post("/topup-confirm", auth, confirmTopUp);
router.get("/history", auth, getWalletHistory);

router.post("/topup", auth, topUpWallet);
router.get("/me", auth, getWallet);
router.post("/deduct", auth, deductFromWallet);

module.exports = router;
