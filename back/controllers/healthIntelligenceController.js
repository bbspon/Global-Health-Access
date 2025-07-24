const HealthIntelligence = require("../models/HealthIntelligence");

exports.getIntelligenceData = async (req, res) => {
  try {
    const role = req.params.role || "admin";
    const data = await HealthIntelligence.findOne({ role });
    if (!data)
      return res.status(404).json({ message: "No data found for this role" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
