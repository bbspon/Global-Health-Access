const mongoose = require("mongoose");

const emergencySOSSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    city: String,
    state: String,
    country: String,
    latitude: Number,
    longitude: Number,
  },
  guardianContact: String,
  triggeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmergencySOS", emergencySOSSchema);
