// models/Leaderboard.js
const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: String,
  role: String,
  score: Number,
  region: String,
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
