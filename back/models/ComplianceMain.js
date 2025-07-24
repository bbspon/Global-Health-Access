// models/ComplianceMain.js
const mongoose = require("mongoose");

const complianceMainSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, enum: ["doctor", "video", "lab"], required: true },
    providerName: { type: String, required: true },
    doctorName: { type: String },
    specialization: { type: String },
    appointmentDate: { type: Date, required: true },
    slot: { type: String, required: true },
    notes: { type: String },
    bookedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ComplianceMain", complianceMainSchema);
