const HealthRecord = require("../models/HealthRecord");

exports.addHealthRecord = async (req, res) => {
  try {
    const newRecord = new HealthRecord({
      ...req.body,
      userId: req.user._id,
      planId: req.params.planId,
    });
    const saved = await newRecord.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Example Controller
// Corrected Controller
exports.getHealthRecordsByPlanId = async (req, res) => {
  const planId = req.params.id;

  try {
    const records = await HealthRecord.find({ planId: planId });
    return res.json({ success: true, data: records });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


