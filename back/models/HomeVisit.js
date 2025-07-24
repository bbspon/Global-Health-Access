const mongoose = require("mongoose");

const homeVisitSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional: link to logged-in user
    required: false,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HomeVisit", homeVisitSchema);
