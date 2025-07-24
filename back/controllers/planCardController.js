const HealthPlan = require("../models/HealthPlan");
const UserPlan = require("../models/UserPlan");
const { calculatePlanCost } = require("../utils/planCalculator");

// GET /api/plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await HealthPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

// GET /api/user/plans
exports.getUserPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    const userPlans = await UserPlan.find({ userId }).populate("planId");
    res.json(userPlans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user plans" });
  }
};

exports.purchasePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      planId,
      selectedAddons = [],
      paymentMethod,
      usedWalletAmount = 0,
    } = req.body;

    const plan = await HealthPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const totalCost = calculatePlanCost(plan, selectedAddons);
    const finalAmount = totalCost - usedWalletAmount;

    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const newPlan = new UserPlan({
      userId,
      planId,
      startDate: today,
      endDate: nextYear,
      status: "active",
      paymentMethod,
      usedWalletAmount,
      transactionId: "TXN" + Date.now(),
    });

    await newPlan.save();

    res
      .status(201)
      .json({ message: "Plan purchased successfully", plan: newPlan });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ error: "Purchase failed" });
  }
};