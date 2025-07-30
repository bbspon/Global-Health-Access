const mongoose = require("mongoose");

const carePassScanLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    scannedBy: { type: String }, // hospital ID or admin email (optional)
    location: { type: String },
    result: {
      plan: String,
      tier: String,
      status: String,
      expiry: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarePassScanLog", carePassScanLogSchema);
