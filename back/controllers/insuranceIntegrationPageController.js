const InsuranceIntegrationEntry = require("../models/InsuranceIntegrationEntry");

// GET all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await InsuranceIntegrationEntry.find();
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST new entry
exports.createEntry = async (req, res) => {
  try {
    const newEntry = new InsuranceIntegrationEntry(req.body);
    await newEntry.save();
    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
