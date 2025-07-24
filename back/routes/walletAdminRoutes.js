const express = require("express");
const router = express.Router();
const {
  getAllWalletTransactions,
} = require("../controllers/walletAdminController");
const auth = require("../middleware/authMiddleware");
// const isAdmin = require("../middleware/isAdmin"); // Optional if admin role check needed

router.get(
  "/admin/wallet-history",
  auth,
  /* isAdmin, */ getAllWalletTransactions
);

module.exports = router;
