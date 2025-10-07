const mongoose = require("mongoose");

const LicenseFileSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String,
  },
  { _id: false }
);

const HospitalOnboardingSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, required: true, trim: true },
    licenseFile: LicenseFileSchema,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
  },
  { timestamps: true }
);

HospitalOnboardingSchema.index({ registrationNumber: 1 });

module.exports = mongoose.model("HospitalOnboarding", HospitalOnboardingSchema);
