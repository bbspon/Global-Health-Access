// models/CSR.js
const mongoose = require("mongoose");

const csrSchema = new mongoose.Schema({
  company: String,
  initiative: String,
  impactArea: String,
  budget: Number,
});

module.exports = mongoose.model("CSR", csrSchema);
