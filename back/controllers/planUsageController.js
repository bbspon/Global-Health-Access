// controllers/planUsageController.js
const PlanUsage = require("../models/PlanUsageModel");

// planUsageController.js
// Updated: controllers/planUsageController.js
exports.getUserPlanUsage = async (req, res) => {
  try {
    const userId = req.user._id;
    const usageData = await PlanUsage.find({ userId });
    console.log("Requested userId:", userId);

    return res.status(200).json(usageData); // ✅ return as array
  } catch (err) {
    console.error("Error fetching plan usage:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetUserUsage = async (req, res) => {
  try {
    await PlanUsage.updateMany(
      { userId: req.user._id },
      {
        opdUsed: 0,
        ipdUsed: 0,
        labUsed: 0,
        mentalHealthUsed: 0,
      }
    );
    res.json({ message: "Usage reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Reset failed" });
  }
};
exports.getAllUserPlanUsages = async (req, res) => {
  try {
    const userId = req.user._id;
    const usages = await PlanUsage.find({ userId });

    if (!usages || usages.length === 0) {
      return res.status(200).json([]); // this is why frontend sees []
    }

    res.status(200).json(usages);
  } catch (err) {
    console.error("Error fetching plan usages:", err);
    res.status(500).json({ error: "Server error" });
  }
};
