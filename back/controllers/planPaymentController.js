// controllers/planPaymentController.js
const PaymentTransaction = require("../models/PaymentTransaction");
const UserPlan = require("../models/UserPlan");
const HealthPlan = require("../models/HealthPlan");

const Razorpay = require("razorpay");

exports.initiatePayment = async (req, res) => {
  try {
    const { planId, amount } = req.body;
    const userId = req.user.id;

    // Validate plan ID
    const plan = await HealthPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `RCPT_${Date.now()}`,
    });

    // Save TXN
    const txn = new PaymentTransaction({
      userId,
      planId,
      amount,
      method: "razorpay",
      status: "created",
      razorpayOrderId: order.id,
    });

    await txn.save();

    res.json({
      message: "Razorpay order created",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      txnId: txn._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Initiate payment error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
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
