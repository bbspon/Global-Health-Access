const PerformanceScore = require("../models/performanceScoreModel");

// GET all performance scores
exports.getAllScores = async (req, res) => {
  try {
    const scores = await PerformanceScore.find().sort({ createdAt: -1 });
    res.json({ success: true, data: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST a new score (optional for admin)
exports.createScore = async (req, res) => {
  try {
    const newScore = new PerformanceScore(req.body);
    await newScore.save();
    res.status(201).json({ success: true, data: newScore });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
