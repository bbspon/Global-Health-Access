const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: String,
    planTier: {
      type: String,
      enum: ["Basic", "Premium", "Corporate"],
      default: "Basic",
    },
    planExpiry: String,
    coverage: {
      opd: Number,
      ipd: Number,
      labs: Number,
    },
    city: String,
    state: String,
    status: { type: String, enum: ["Active", "Expired"], default: "Active" },
    qrToken: String,
    lastRefreshed: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DigitalHealthCard", schema);
