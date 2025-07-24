const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookingType: { type: String, required: true }, // ✅ FIXED HERE
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  providerName: String,
  bookingType: { type: String, required: true },
  dateTime: { type: Date, required: true },
  patientName: { type: String, required: true },
  sendWhatsapp: { type: Boolean, default: true },
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
