// models/NGO.js
const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
  name: String,
  city: String,
  type: String,
  contact: String,
});

module.exports = mongoose.model("NGO", ngoSchema);
