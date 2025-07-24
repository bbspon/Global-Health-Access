const mongoose = require("mongoose");

const healthIntelligenceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "hospital", "govt", "user"],
      required: true,
    },
    alertMessages: [String],
    districtIndex: [
      {
        district: String,
        index: Number,
      },
    ],
    nationalTrends: [
      {
        label: String,
        value: Number,
      },
    ],
    sentimentRadar: [Number],
    heatMapZones: [
      {
        lat: Number,
        lng: Number,
        radius: Number,
        color: String,
        label: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthIntelligence", healthIntelligenceSchema);
