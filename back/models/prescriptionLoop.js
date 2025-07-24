const mongoose = require("mongoose");

const prescriptionLoopSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prescriptions: [
    {
      medicine: String,
      dosage: String,
      frequency: String,
    },
  ],
  recommendedTests: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PrescriptionLoop", prescriptionLoopSchema);
