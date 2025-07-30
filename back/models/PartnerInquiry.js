const mongoose = require("mongoose");

const partnerInquirySchema = new mongoose.Schema({
  partnerType: {
    type: String,
    enum: ["Hospital", "Lab", "Franchisee", "Agent"],
    required: true,
  },
  accreditation: String, // For Hospital
  licenseNumber: String, // For Lab
  investmentBudget: String, // For Franchisee
  yearsOfExperience: String, // For Agent
  fullName: String,
  email: String,
  phone: String,
  city: String,
  organization: String,
  message: String,
  fileName: String,
  fileBuffer: Buffer,
  fileMimeType: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PartnerInquiry", partnerInquirySchema);
