// models/School.js
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: String,
  state: String,
  board: String,
  studentsCount: Number,
});

module.exports = mongoose.model("School", schoolSchema);
