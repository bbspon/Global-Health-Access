const mongoose = require("mongoose");

const coverageLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    service: { type: String },
    result: {
      plan: String,
      status: String,
      copay: String,
      visitsUsed: Number,
      visitsAllowed: Number,
      amountLeft: String,
      nextEligibility: String,
    },
    source: { type: String, default: "hospital" }, // OR admin/user
  },
  { timestamps: true }
);

module.exports = mongoose.model("CoverageLog", coverageLogSchema);
