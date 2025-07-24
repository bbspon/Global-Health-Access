// models/UserFeedback.js
const mongoose = require("mongoose");

const userFeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3], // 1=😊, 2=😐, 3=😞
    required: true,
  },
  category: {
    type: String,
    enum: ["Hospital", "Doctor", "Service", "Lab", "Others"],
    required: true,
  },
  comment: {
    type: String,
  },
  image: {
    type: String, // File path or URL if image is uploaded
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserFeedback", userFeedbackSchema);
