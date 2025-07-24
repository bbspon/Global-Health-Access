const AIDiseaseRisk = require("../models/AIDiseaseRisk");

// Simple mock AI logic
const predictRisk = (data) => {
  const score =
    data.age / 100 + (data.smoking ? 1 : 0) + (data.alcohol ? 0.5 : 0);

  let level = "low";
  if (score > 2) level = "high";
  else if (score > 1) level = "medium";

  return {
    riskScore: score,
    riskLevel: level,
    predictedDiseases: score > 2 ? ["Heart Disease", "Diabetes"] : ["None"],
  };
};

exports.submitRiskData = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Extracted from auth middleware
    const inputData = req.body;

    const riskResult = predictRisk(inputData);

    const entry = new AIDiseaseRisk({
      ...inputData,
      ...riskResult,
      userId, // ✅ Properly included here
    });

    await entry.save();

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    console.error("submitRiskData error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getMyRiskHistory = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Match with the field in DB
    const risks = await AIDiseaseRisk.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: risks });
  } catch (err) {
    console.error("getMyRiskHistory error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
