const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["Hospital", "Lab", "Plan", "App", "Others","Doctor"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  partnerId: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In Review", "Resolved"],
    default: "Pending",
  },
  adminReply: {
    type: String,
    default: "",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Grievance", grievanceSchema);
