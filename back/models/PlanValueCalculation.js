const mongoose = require("mongoose");

const PlanValueCalculationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planTier: { type: String, required: true }, // e.g., Basic, Prime, Elite
    modules: {
      // Add-on usage
      opd: { type: Number, default: 0 },
      ipd: { type: Number, default: 0 },
      lab: { type: Number, default: 0 },
      mentalHealth: { type: Number, default: 0 },
    },
    addOns: [String], // e.g., ['maternity', 'dental']
    estimatedValue: { type: Number, required: true }, // Final value output
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PlanValueCalculation",
  PlanValueCalculationSchema
);
