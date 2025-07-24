const mongoose = require("mongoose");

const ConsultationSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientName: String,
  symptoms: String,
  notes: String,
  prescription: String,
  messages: [
    {
      text: String,
      timestamp: { type: Date, default: Date.now },
      sender: String, // 'doctor' or 'patient'
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Consultation", ConsultationSchema);
