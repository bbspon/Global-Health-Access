/**
 * RISK TABLES (Block 1)
 * These tables feed into premiumCalculator.js
 * Each table is India-specific and used in pricing + eligibility + forecasting
 */

const ageRiskTable = {
  "18-25": 0.45,
  "26-30": 0.52,
  "31-35": 0.68,
  "36-40": 0.95,
  "41-45": 1.25,
  "46-50": 1.55,
  "51-55": 1.92,
  "56-60": 2.4,
  "61-65": 3.0,
  "66-70": 3.85,
};

const severityCostCurve = {
  low: 0.2, // routine issues
  medium: 0.45, // moderate cases
  high: 0.9, // major illness probability
  critical: 1.4, // ICU, cardiac, neuro, oncology
};

// Normalized city-level cost index (India)
const cityCostIndex = {
  Chennai: 1.0,
  Mumbai: 1.25,
  Delhi: 1.2,
  Bangalore: 1.18,
  Hyderabad: 1.08,
  Pune: 1.1,
  Kolkata: 0.95,
  Tier2: 0.85,
  Tier3: 0.7,
};

// Disease-based risk loads
const diseaseRiskLoads = {
  diabetes: 0.25,
  hypertension: 0.18,
  asthma: 0.1,
  thyroid: 0.08,
  heart_conditions: 0.4,
  kidney_conditions: 0.55,
  liver_conditions: 0.5,
  cancer_history: 0.8,
};

// Export all tables
module.exports = {
  ageRiskTable,
  severityCostCurve,
  cityCostIndex,
  diseaseRiskLoads,
};
