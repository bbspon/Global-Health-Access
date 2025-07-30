const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  services: [String], // e.g., ["OPD", "IPD"]
  tier: {
    type: String,
    enum: ["Basic", "Premium", "Elite"],
    default: "Basic",
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
    address: String,
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
  },
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
