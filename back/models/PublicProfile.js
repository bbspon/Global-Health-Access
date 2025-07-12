const mongoose = require("mongoose");

const publicProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  showName: { type: Boolean, default: true },
  showAge: { type: Boolean, default: false },
  showConditions: { type: Boolean, default: false },
  showAppointments: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PublicProfile", publicProfileSchema);
