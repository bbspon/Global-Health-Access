const mongoose = require("mongoose");

const SupportTicketSchema = new mongoose.Schema({
  issueCategory: {
    type: String,
    enum: ["Billing Issue", "Tech Support", "Other"],
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional: Link with user login
  },
});

module.exports = mongoose.model("SupportTicket", SupportTicketSchema);
