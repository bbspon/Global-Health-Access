const HealthPlan = require("../models/HealthPlan");
const UserPlan = require("../models/UserPlan");
const HealthPlanAccess = require("../models/HealthPlanAccess");

exports.getAllHealthPlans = async (req, res) => {
  try {
    const { country } = req.query;

    let plans = await HealthPlan.find({ isActive: true }).sort({ tier: 1 });

    if (country) {
      plans = plans.map((plan) => ({
        ...plan._doc,
        price: plan.price[country.toUpperCase()] || plan.price["INR"] || 0,
      }));
    }

    res.status(200).json({ success: true, plans });
  } catch (err) {
    console.error("Error fetching health plans:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Add this new function
exports.getPlansForComparison = async (req, res) => {
  try {
    const { country } = req.query;
    const plans = await HealthPlan.find({ isActive: true }).sort({ tier: 1 });

    const mappedPlans = plans.map((plan) => {
      const price = country
        ? plan.price[country.toUpperCase()] || plan.price["INR"] || 0
        : plan.price["INR"] || 0;

      return {
        _id: plan._id,
        name: plan.name,
        tier: plan.tier,
        price,
        features: plan.features,
        validityInDays: plan.validityInDays,
        isRecommended: plan.isRecommended || false,
      };
    });

    res.status(200).json({ success: true, plans: mappedPlans });
  } catch (error) {
    console.error("Comparison API Error:", error);
    res.status(500).json({ success: false, message: "Server error while comparing plans" });
  }
};
exports.getPlanById = async (req, res) => {
  try {
    const plan = await HealthPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    console.error("Error getting plan by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getPlans = async (req, res) => {
  try {
    const plans = await HealthPlanAccess.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Failed to load plans" });
  }
};

exports.enrollPlan = async (req, res) => {
  const { userId, selectedPlan } = req.body;
  if (!userId || !selectedPlan) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newEnrollment = new UserPlan({ userId, selectedPlan });
    await newEnrollment.save();
    res.status(200).json({ message: "User enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to enroll in plan" });
  }
};