// back/models/HospitalBill.js
const mongoose = require("mongoose");

// Uses your default (healthcare) connection
const HospitalBillSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, trim: true },
    serviceProvided: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },

    // Who raised the bill (hospital staff account)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional linkage if you track hospitals separately
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },

    // Simple lifecycle
    status: {
      type: String,
      enum: ["submitted", "approved", "rejected", "settled"],
      default: "submitted",
    },

    // Optional notes or attachments later
    notes: { type: String },
  },
  { timestamps: true }
);

// Helpful indexes
HospitalBillSchema.index({ patientId: 1, createdAt: -1 });
HospitalBillSchema.index({ hospitalId: 1, createdAt: -1 });

module.exports = mongoose.model("HospitalBill", HospitalBillSchema);
