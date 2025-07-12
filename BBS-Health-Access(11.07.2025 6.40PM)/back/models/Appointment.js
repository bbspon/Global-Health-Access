const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["doctor", "lab", "video"], required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  providerName: String,
  doctorName: String,
  specialization: String,
  appointmentDate: Date,
  slot: String,
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
