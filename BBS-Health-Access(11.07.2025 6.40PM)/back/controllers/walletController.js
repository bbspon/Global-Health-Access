const razorpay = require("../utils/razorpay");
const WalletTransaction = require("../models/Transaction");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

const createTopUpOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `wallet_topup_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    res.status(500).json({ msg: "Failed to create order", error });
  }
};
const getWalletHistory = async (req, res) => {
  const userId = req.user._id;
  const { type, startDate, endDate, page = 1, limit = 10 } = req.query;

  const filters = { userId, method: "wallet" };

  if (type) filters.type = type;
  if (startDate && endDate) {
    filters.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const skip = (page - 1) * limit;

  const total = await Transaction.countDocuments(filters);
  const transactions = await Transaction.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.json({ total, page: parseInt(page), transactions });
};
  
const confirmTopUp = async (req, res) => {
  const { amount, razorpayPaymentId } = req.body;
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, { $inc: { wallet: amount } });

  const txn = new WalletTransaction({
    userId,
    type: "credit",
    amount,
    method: "razorpay",
    reference: razorpayPaymentId,
    description: `Wallet top-up`,
  });

  await txn.save();

  res.json({ success: true });
};
const getPlanUsage = async (req, res) => {
  const userId = req.user._id;

  const plans = await UserPlan.find({ userId }).populate("planId");

  const result = plans.map((plan) => ({
    _id: plan._id,
    title: plan.planId.title,
    opdLimit: plan.planId.opdLimit,
    labLimit: plan.planId.labLimit,
    videoLimit: plan.planId.videoLimit,
    usage: plan.usage,
    createdAt: plan.createdAt,
  }));

  res.json(result);
};
  
// Ensure wallet exists
const getOrCreateWallet = async (userId) => {
  let wallet = await Wallet.findOne({ userId });
  if (!wallet) wallet = await Wallet.create({ userId });
  return wallet;
};

// Top-up wallet
exports.topUpWallet = async (req, res) => {
  const { amount, method, transactionId } = req.body;
  const wallet = await getOrCreateWallet(req.user._id);

  wallet.balance += amount;
  wallet.transactions.push({
    amount,
    method,
    type: "credit",
    transactionId,
    note: "Recharge"
  });

  await wallet.save();
  res.json({ success: true, balance: wallet.balance });
};

// Get wallet balance + history
exports.getWallet = async (req, res) => {
  const wallet = await getOrCreateWallet(req.user._id);
  res.json(wallet);
};
exports.deductFromWallet = async (req, res) => {
  const { amount, usageType, referenceId, note } = req.body;
  const wallet = await Wallet.findOne({ userId: req.user._id });

  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ error: "Insufficient wallet balance" });
  }

  wallet.balance -= amount;
  wallet.transactions.push({
    amount,
    method: "wallet",
    type: "debit",
    transactionId: `${usageType}-${referenceId}`,
    note,
  });

  await wallet.save();
  res.json({ success: true, balance: wallet.balance });
};
  
module.exports = { createTopUpOrder, confirmTopUp };
