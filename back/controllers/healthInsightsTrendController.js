const mongoose = require("mongoose");
const Trend = require("../models/HealthInsightsTrend");

// GET /api/health-insights-trends/me
exports.getUserTrends = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED
    console.log("🔍 Fetching trends for user:", userId);
    const trends = await Trend.find({ userId });
    console.log("📦 Trends fetched:", trends);
    res.json({ success: true, data: trends });
  } catch (err) {
    console.error("❌ Error fetching trends:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /api/health-insights-trends
exports.createTrend = async (req, res) => {
  try {
    console.log("📥 Creating new trend for user:", req.user.id);
    console.log("📝 Request body:", req.body);
    const newTrend = await Trend.create({ ...req.body, userId: req.user.id });
    console.log("✅ Trend created:", newTrend);
    res.status(201).json({ success: true, data: newTrend });
  } catch (err) {
    console.error("❌ Error creating trend:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
