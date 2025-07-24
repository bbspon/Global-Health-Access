const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  doctor: String,
  status: String,
});

const wellnessSchema = new mongoose.Schema({
  userId: String,
  steps: { type: Number, default: 0 },
  mealsLogged: { type: Number, default: 0 },
  appointments: [appointmentSchema],
});

module.exports = mongoose.model("Wellness", wellnessSchema);
