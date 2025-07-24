const mongoose = require("mongoose");

const healthObjectiveSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  ctaText: String,
  citizenBenefits: [String],
  hospitalBenefits: [String],
  coverage: [String],
  exclusions: [String],
  testimonials: [String],
  faq: [
    {
      question: String,
      answer: String,
    },
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "HealthObjectiveContent",
  healthObjectiveSchema
);
