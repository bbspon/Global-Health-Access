const mongoose = require("mongoose");

const LabSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    tests: { type: [String], default: [] }, // Blood, Scan, Thyroid, etc
    homePickup: { type: Boolean, default: false }, // true / false
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lab", LabSchema);
