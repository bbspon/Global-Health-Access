// utils/eligibilityEngine.js

function checkEligibility({
  age,
  gender,
  city,
  hospitalTier,
  chronicConditions = [],
  preExisting = "",
  isSmoker = "",
  bmi,
  familyMembers,
  addons = [],
}) {
  let reasons = [];
  let warnings = [];

  // AGE RULES
  if (age < 18) {
    reasons.push("Minimum age must be 18.");
  }
  if (age > 70) {
    reasons.push("Maximum age allowed is 70.");
  }

  // BMI RULE
  if (bmi && bmi > 35) {
    warnings.push("High BMI may affect eligibility.");
  }

  // SMOKING RULE
  if (isSmoker === "yes") {
    warnings.push("Smoker — additional risk applied.");
  }

  // CHRONIC CONDITIONS
  if (chronicConditions.includes("heart")) {
    warnings.push("Cardiac condition — OPD restrictions may apply.");
  }

  // PRE-EXISTING DISEASE RULE
  if (preExisting?.length > 0) {
    warnings.push("Pre-existing condition will require review.");
  }

  // FAMILY SIZE RULE
  if (familyMembers > 6) {
    reasons.push("Family members exceeding allowed limit.");
  }

  // BASIC ELIGIBILITY DECISION
  const eligible = reasons.length === 0;

  // RISK SCORE (simple model for now)
  const riskScore =
    age / 2 +
    (bmi ? bmi / 2 : 0) +
    (isSmoker === "yes" ? 10 : 0) +
    chronicConditions.length * 5;

  // RECOMMENDED TIER
  let recommendedTier = "C";
  if (riskScore < 20) recommendedTier = "A";
  else if (riskScore < 35) recommendedTier = "B";

  return {
    eligible,
    reasons,
    warnings,
    riskScore,
    recommendedTier,
  };
}

module.exports = { checkEligibility };
