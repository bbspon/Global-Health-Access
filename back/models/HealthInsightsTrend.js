const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trendType: String, // e.g., "cardiovascular", "diabetes"
    month: String, // e.g., "2025-07"
    value: Number,
    tags: [String],
    comments: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthInsightsTrend", trendSchema);
