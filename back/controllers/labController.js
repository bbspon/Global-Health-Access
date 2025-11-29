const Lab = require("../models/Lab");

// GET labs
exports.getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json({ success: true, labs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST booking (dummy for now)
exports.bookLab = async (req, res) => {
  try {
    const { labId } = req.body;
    if (!labId) return res.status(400).json({ message: "labId required" });

    res.json({ success: true, message: "Booking completed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
