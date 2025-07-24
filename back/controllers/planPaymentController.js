// controllers/planPaymentController.js
const PaymentTransaction = require("../models/PaymentTransaction");
const UserPlan = require("../models/UserPlan");
const HealthPlan = require("../models/HealthPlan");

exports.initiatePayment = async (req, res) => {
  try {
    const { planId, amount, method } = req.body;
    const userId = req.user.id;

    const plan = await HealthPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const txn = new PaymentTransaction({
      userId,
      planId,
      amount,
      method,
      status: "initiated",
    });

    await txn.save();

    res.json({ message: "Payment initiated", txnId: txn._id });
  } catch (err) {
    console.error("Initiate payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { txnId, paymentRef } = req.body;
    const userId = req.user.id;

    const txn = await PaymentTransaction.findById(txnId);
    if (!txn || txn.userId !== userId)
      return res.status(400).json({ message: "Invalid transaction" });

    txn.status = "success";
    txn.paymentRef = paymentRef;
    await txn.save();

    // Activate user plan
    const newUserPlan = new UserPlan({
      userId,
      planId: txn.planId,
      user: req.user.name || "User",
      plan: "Active", // or fetch name from HealthPlan
      tier: "basic", // optionally fetch from HealthPlan
      opdUsed: 0,
      opdCap: 3,
      ipdUsed: 0,
      ipdCap: 2,
      labUsed: 0,
      labCap: 2,
      mentalHealthUsed: 0,
      mentalHealthCap: 1,
      addOns: {},
      family: [],
      alerts: [],
    });

    await newUserPlan.save();

    res.json({ message: "Payment confirmed and plan activated" });
  } catch (err) {
    console.error("Confirm payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
