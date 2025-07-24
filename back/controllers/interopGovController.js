const InteropGovEntry = require("../models/interopGovModel");

// Get all entries
exports.getAllInteropGov = async (req, res) => {
  try {
    const entries = await InteropGovEntry.find().sort({ lastUpdated: -1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Add new entry
// Add new entry
exports.createInteropGov = async (req, res) => {
  try {
    const { actionType, message } = req.body;

    // Validate input
    if (!actionType || !message) {
      return res.status(400).json({ success: false, message: "actionType and message are required" });
    }

    const newEntry = new InteropGovEntry({
      actionType,
      message,
      timestamp: new Date(),
      lastUpdated: new Date(),
    });

    await newEntry.save();

    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    console.error("❌ Error saving interop gov entry:", err);
    res.status(400).json({ success: false, message: "Invalid Data" });
  }
};

