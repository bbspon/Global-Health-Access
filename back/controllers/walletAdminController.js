const WalletTransaction = require("../models/WalletTransaction");

exports.getAllWalletTransactions = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    console.error("Admin wallet history error:", error);
    res.status(500).json({ message: "Error fetching all wallet transactions" });
  }
};
