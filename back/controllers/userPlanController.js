const UserPlan = require("../models/UserPlan");
const HealthPlan = require("../models/HealthPlan");

exports.purchasePlan = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { planId, paymentMethod, useWallet = false } = req.body;

    // Validate plan exists
    const plan = await HealthPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or inactive plan" });
    }

    // Plan duration logic
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + (plan.validityInDays || 365)); // default 1 year

    // Create user plan with all required fields
    const userPlan = new UserPlan({
      userId,
      planId,
      selectedPlan: plan.name, // ✅ Required field from schema
      paymentMethod,
      startDate,
      endDate,
      usedWalletAmount: useWallet ? 100 : 0,
      transactionId: `TXN-${Date.now()}`,
      status: "active", // ✅ Explicitly set status
    });

    await userPlan.save();

    // Populate plan details before returning
    await userPlan.populate("planId");

    return res.status(201).json({
      success: true,
      message: "Plan purchased successfully",
      userPlan,
    });
  } catch (error) {
    console.error("❌ Purchase Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during plan purchase",
      error: error.message 
    });
  }
};
// Buy Plan Controller
exports.buyPlanController = async (req, res) => {
  try {
    const { planId, selectedAddons = [], paymentMethod, usedWalletAmount = 0, referralCode } = req.body;
    const userId = req.user._id;

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Total price calculation
    const addonTotal = selectedAddons.reduce((acc, addonName) => {
      const addon = plan.addons.find((a) => a.name === addonName);
      return addon ? acc + addon.price : acc;
    }, 0);

    const totalPrice = plan.price + addonTotal;

    // Handle wallet deduction
    if (paymentMethod === "wallet") {
      if (req.user.walletBalance < totalPrice) {
        return res.status(400).json({ message: "Insufficient wallet balance" });
      }

      req.user.walletBalance -= totalPrice;
      await req.user.save();

      await WalletTransaction.create({
        user: userId,
        type: "debit",
        amount: totalPrice,
        purpose: "plan_purchase",
        timestamp: new Date(),
        method: "wallet",
      });
    }

    // Save purchased plan to user
    await UserPlan.create({
      user: userId,
      planId,
      addons: selectedAddons,
      purchaseDate: new Date(),
      status: "active",
      paymentMethod,
      totalPaid: totalPrice,
      referralCodeUsed: referralCode || null,
    });

    return res.status(200).json({ message: "Plan purchased successfully" });
  } catch (error) {
    console.error("Plan purchase failed:", error);
    return res.status(500).json({ message: "Plan purchase failed", error });
  }
};

exports.getMyPlan = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    console.log("📩 getMyPlan called for user:", userId);

    const plan = await UserPlan.findOne({
      $or: [{ userId }, { user: userId }],
      status: "active",
    }).sort({ startDate: -1 });

    if (!plan) {
      return res.status(404).json({ message: "No active plan found." });
    }

    const fullPlan = await HealthPlan.findById(plan.planId);

    return res.status(200).json({
      ...plan.toObject(),
      planId: fullPlan, // ⭐ FRONTEND EXPECTS THIS
    });
  } catch (error) {
    console.error("❌ Error in getMyPlan:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

