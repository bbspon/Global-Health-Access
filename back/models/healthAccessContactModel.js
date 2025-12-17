const mongoose = require("mongoose");

const healthAccessContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  subject: String,
  message: String,

  replyStatus: {
    type: String,
    enum: ["Pending", "Replied"],
    default: "Pending",
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  adminNotes: {
    type: String,
    default: "",
  },
  replyMessage: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "HealthAccessContact",
  healthAccessContactSchema
);
