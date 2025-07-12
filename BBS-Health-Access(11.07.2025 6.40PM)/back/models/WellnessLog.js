const mongoose = require("mongoose");

const wellnessLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: String }, // e.g. "2025-07-05"
  steps: Number,
  sleepHours: Number,
  waterLitres: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WellnessLog", wellnessLogSchema);
