// models/PlanComparison.js

const mongoose = require("mongoose");

const planComparisonSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    plans: [String],
    rows: [
      {
        title: String,
        values: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlanComparison", planComparisonSchema);
