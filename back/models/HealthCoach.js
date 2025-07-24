// models/HealthCoach.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: String,
  message: String,
  level: String,
});

const healthCoachSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: String,
    condition: String,
    plan: String,
    coachStatus: String,
    lastHbA1c: String,
    medsAdherence: Number,
    mood: String,
    alerts: [alertSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthCoach", healthCoachSchema);
