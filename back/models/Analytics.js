const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Or "Hospital" if separate
    required: true,
  },
  totalConsultations: { type: Number, default: 0 },
  totalReimbursements: { type: Number, default: 0 },
  feedbackScore: { type: Number, default: 0 },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
