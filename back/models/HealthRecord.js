const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserPlan",
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Prescription", "Lab Report", "Other"],
      default: "Other",
    },
    date: { type: Date, required: true },
    tags: [{ type: String }],
    fileUrl: { type: String },
    addedBy: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
