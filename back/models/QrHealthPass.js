// models/QrHealthPass.js
const mongoose = require("mongoose");

const qrHealthPassSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthPlan",
    required: true,
  },
  token: { type: String, required: true },
  location: { type: String },
  scannedAt: { type: Date, default: Date.now },
  result: {
    type: String,
    enum: ["Access Granted", "Access Denied"],
    default: "Access Granted",
  },
});

module.exports = mongoose.model("QrHealthPass", qrHealthPassSchema);
