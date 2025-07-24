const ComplianceStatus = require("../models/ComplianceStatus");

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await ComplianceStatus.find().sort({ lastUpdated: -1 });
    res.json({ success: true, data: statuses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addStatus = async (req, res) => {
  try {
    const { country, status, badge } = req.body;
    const newStatus = new ComplianceStatus({ country, status, badge });
    await newStatus.save();
    res.status(201).json({ success: true, data: newStatus });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
