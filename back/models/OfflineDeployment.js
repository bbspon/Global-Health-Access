const mongoose = require("mongoose");

const offlineDeploymentSchema = new mongoose.Schema(
  {
    locationName: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },
    deploymentType: {
      type: String,
      enum: ["Kiosk", "Mobile Unit", "Community Center", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
      default: "Active",
    },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uptimeHours: { type: Number, default: 0 },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("OfflineDeployment", offlineDeploymentSchema);
