// controllers/unifiedAPIController.js
const UnifiedAPI = require("../models/UnifiedAPI");

// GET all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await UnifiedAPI.find();
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
};

// POST create partner
exports.createPartner = async (req, res) => {
  try {
    const partner = new UnifiedAPI(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT activate partner
exports.activatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await UnifiedAPI.findByIdAndUpdate(
      id,
      { status: "Live", lastCall: "Just now" },
      { new: true }
    );
    res.json(partner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
