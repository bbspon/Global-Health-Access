// models/CustomerIdentity.js
const mongoose = require("mongoose");

const CustomerIdentitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: String,
    age: Number,
    bloodGroup: String,
    address: String,
    contactNumber: String,
    emergencyContact: String,
    allergies: String,
    medicalHistory: String,
    insuranceProvider: String,
    insuranceNumber: String,
    dateOfIssue: String,
    expiryDate: String,

    photo: String,
    signature: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerIdentity", CustomerIdentitySchema);
