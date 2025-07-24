const User = require("../models/User");
const WalletTransaction = require("../models/WalletTransaction");
exports.getWalletBalance = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("walletBalance");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ walletBalance: user.walletBalance || 0 });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.topupWallet = async (req, res) => {
  try {
    const { amount, method, referenceId } = req.body;
    const userId = req.user._id; // ✅ correct way

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount." });
    }

    const transaction = await WalletTransaction.create({
      user: userId,
      amount,
      type: "credit",
      status: "success", // assume success for now; replace if using payment gateway callback
      method,
      referenceId,
      purpose: "top-up", // ✅ Required field
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Wallet topup failed:", err);
    res.status(500).json({ message: "Wallet top-up failed" });
  }
};
exports.getWalletDetails = async (req, res) => {
  try {
    const userId = req.user._id;

   const transactions = await WalletTransaction.find({ user: userId }).sort({ timestamp: -1 });


    const balance = transactions.reduce((acc, txn) => {
      return txn.type === "credit" ? acc + txn.amount : acc - txn.amount;
    }, 0);

    res.json({ balance, transactions });
  } catch (err) {
    console.error("Wallet fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch wallet info" });
  }
};
exports.getWalletHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, startDate, endDate } = req.query;

    const query = { user: userId }; // 🔥 Fix here

    if (type) query.type = type;

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const history = await WalletTransaction.find(query).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    console.error("Wallet history fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch wallet history" });
  }
};
