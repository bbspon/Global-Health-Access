const HealthInsight = require("../models/HealthInsight");

// Auto-generate mock insight (can be replaced with real AI/ML logic)
const generateMockInsights = (userId) => {
  const sample = [
    {
      source: "riskPrediction",
      insightText:
        "Based on your risk profile, regular 30-min walks may reduce your cardiovascular risk by 40%.",
      tags: ["cardio", "lifestyle"],
      riskLevel: "medium",
      userId,
    },
    {
      source: "lab",
      insightText:
        "Recent lab data shows slightly elevated cholesterol levels. Consider dietary changes.",
      tags: ["cholesterol"],
      riskLevel: "high",
      userId,
    },
  ];
  return sample;
};
exports.getMyInsights = async (req, res) => {
  try {
    const insights = await HealthInsight.find({ userId: req.user.userId }).sort(
      { createdAt: -1 }
    );
    if (!insights.length) {
      return res
        .status(404)
        .json({ success: false, message: "No insights available." });
    }
    res.json({ success: true, data: insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


// POST – Generate or insert insights
exports.generateInsights = async (req, res) => {
  try {
    const { userId } = req.user;
    const generated = generateMockInsights(userId);
    const created = await HealthInsight.insertMany(generated);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
