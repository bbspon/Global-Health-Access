const mongoose = require("mongoose");

const offlinePatientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: String,
  plan: String,
  history: [String],
});

module.exports = mongoose.model("OfflinePatient", offlinePatientSchema);
