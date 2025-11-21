const { checkEligibility } = require("../utils/eligibilityEngine");

/**
 * ELIGIBILITY CONTROLLER
 * Endpoint:
 * POST /api/eligibility/check
 */


exports.checkEligibilityController = async (req, res) => {
  try {
    const {
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
    } = req.body;

    // BASIC VALIDATION
    if (!age || !gender || !city || !hospitalTier) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const result = checkEligibility({
      age,
      gender,
      city,
      hospitalTier,
      chronicConditions,
      preExisting,
      isSmoker,
      bmi,
      familyMembers,
      addons,
    });

    return res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Eligibility Error:", err);
    res.status(500).json({
      success: false,
      message: "Eligibility check failed",
    });
  }
};
