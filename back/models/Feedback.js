// models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["plan", "hospital", "doctor", "app", "opd", "pharmacy"],
    required: true,
  },
  referenceId: { type: String }, // e.g., planId, hospitalId, etc.
  tags: [{ type: String }], // ✅ Add this line
  image: { type: String }, // ✅ Add this line to store base64 or image URL
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
