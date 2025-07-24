// models/PlanUsageModel.js
const mongoose = require("mongoose");

const planUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: { type: String, required: true },
    family: [{ type: String }],
    opdUsed: { type: Number, default: 0 },
    opdCap: { type: Number, default: 0 },
    ipdUsed: { type: Number, default: 0 },
    ipdCap: { type: Number, default: 0 },
    labUsed: { type: Number, default: 0 },
    labCap: { type: Number, default: 0 },
    mentalHealthUsed: { type: Number, default: 0 },
    mentalHealthCap: { type: Number, default: 0 },
    addOns: {
      opd: { type: Number, default: 0 },
      ipd: { type: Number, default: 0 },
      lab: { type: Number, default: 0 },
      mentalHealth: { type: Number, default: 0 },
    },
    alerts: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlanUsage", planUsageSchema);
