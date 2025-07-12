const UserPlan = require("../models/UserPlan");
const HealthPlan = require("../models/HealthPlan");

exports.purchasePlan = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { planId, paymentMethod, useWallet = false } = req.body;

    const plan = await HealthPlan.findById(planId);
    if (!plan || !plan.isActive) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or inactive plan" });
    }

    // Plan duration logic
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.validityInDays);

    const userPlan = new UserPlan({
      userId,
      planId,
      paymentMethod,
      startDate,
      endDate,
      usedWalletAmount: useWallet ? 100 : 0, // future wallet logic
      transactionId: `TXN-${Date.now()}`,
    });

    await userPlan.save();

    return res.status(201).json({
      success: true,
      message: "Plan purchased successfully",
      userPlan,
    });
  } catch (error) {
    console.error("Purchase Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during plan purchase" });
  }
};
exports.getMyActivePlan = async (req, res) => {
  try {
    const userId = req.user._id;

    const userPlan = await UserPlan.findOne({
      userId,
      status: "active",
    }).populate("planId");

    if (!userPlan) {
      return res.status(200).json({ success: true, plan: null });
    }

    const {
      planId: plan,
      startDate,
      endDate,
      paymentMethod,
      usedWalletAmount,
      transactionId,
    } = userPlan;

    const response = {
      name: plan.name,
      tier: plan.tier,
      features: plan.features,
      description: plan.description,
      price: plan.price,
      validityInDays: plan.validityInDays,
      startDate,
      endDate,
      status: userPlan.status,
      paymentMethod,
      usedWalletAmount,
      transactionId,
    };

    return res.status(200).json({ success: true, plan: response });
  } catch (error) {
    console.error("Fetch My Plan Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching plan" });
  }
};