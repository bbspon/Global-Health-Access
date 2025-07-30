const mongoose = require("mongoose");

const serviceAvailabilitySchema = new mongoose.Schema(
  {
    department: { type: String, required: true },
    daysAvailable: { type: String, required: true }, // e.g., "Mon–Fri"
    timeSlot: { type: String, required: true }, // e.g., "9AM–5PM"
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceAvailability",
  serviceAvailabilitySchema
);
