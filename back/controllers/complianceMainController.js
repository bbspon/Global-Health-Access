// controllers/complianceMainController.js
const ComplianceMain = require("../models/ComplianceMain");

exports.getComplianceMain = async (req, res) => {
  try {
    const data = await ComplianceMain.find().sort({ lastUpdated: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
