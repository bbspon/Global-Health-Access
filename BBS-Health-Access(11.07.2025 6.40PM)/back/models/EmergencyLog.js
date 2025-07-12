const mongoose = require("mongoose");

const emergencyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    lat: Number,
    lng: Number,
    address: String,
  },
  nearestHospital: {
    name: String,
    phone: String,
    location: { lat: Number, lng: Number },
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmergencyLog", emergencyLogSchema);
