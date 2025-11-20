const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema(
  {
    beneficiaryId: { type: String, required: true, unique: true },

    createdBy: { type: String, required: true },

    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    volunteerdonor: { type: String, required: true },
    profileImg: { type: String, default: "" },

    contactNumber: { type: String, required: true },
    emergencyContact: { type: String, default: "none" },
    allergies: { type: String, default: "none" },
    email: { type: String, required: true },

    companyName: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    languagesSpoken: { type: String, required: true },
    issuingAuthority: { type: String, required: true },

    customerServicePhone: { type: String, required: true },
    customerServiceEmail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", BeneficiarySchema);
