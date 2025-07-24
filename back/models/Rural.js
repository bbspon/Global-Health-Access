// models/Rural.js
const mongoose = require("mongoose");

const ruralSchema = new mongoose.Schema({
  villageName: String,
  region: String,
  accessLevel: String,
  population: Number,
});

module.exports = mongoose.model("Rural", ruralSchema);
