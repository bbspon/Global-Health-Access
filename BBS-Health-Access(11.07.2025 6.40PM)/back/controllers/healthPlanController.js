const HealthPlan = require("../models/HealthPlan");

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
