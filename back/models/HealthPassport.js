// models/HealthPassport.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: String,
  type: String,
  url: String,
});

const healthPassportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    planId: String,
    name: String,
    language: String,
    conditions: [String],
    medications: [String],
    allergies: [String],
    lastVisit: Date,
    qrValue: String,
    exportOptions: {
      availableFormats: [String],
      countryFormats: [String],
      defaultCountry: String,
      defaultHistory: String,
      hideSensitive: Boolean,
    },
    documents: [documentSchema],
    aiUseCases: [
      {
        context: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthPassport", healthPassportSchema);
