const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
    address: String,
    city: String,
    state: String,
    country: String,
  },
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", hospitalSchema);
