const { calculatePremium } = require("../utils/premiumCalculator");
const {
  generateReferenceMatrix,
  generateComputedMatrix,
} = require("../utils/priceMatrix");

/**
 * POST /api/pricing/calculate
 */
exports.calculatePrice = async (req, res) => {
  try {
    const premium = calculatePremium(req.body);

    return res.status(200).json({
      success: true,
      premiumBreakdown: premium,
    });
  } catch (error) {
    console.error("Pricing Error:", error);
    return res.status(400).json({
      success: false,
      message: "Error calculating premium",
    });
  }
};

/**
 * GET /api/pricing/matrix
 * Returns static pricing tables for UI reference
 */
exports.getPriceMatrix = async (req, res) => {
  try {
    const matrix = generateReferenceMatrix();

    return res.status(200).json({
      success: true,
      matrix,
    });
  } catch (error) {
    console.error("Matrix Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load pricing matrix",
    });
  }
};

/**
 * GET /api/pricing/computed
 * Full computed pricing grid (optional)
 */
exports.getComputedMatrix = async (req, res) => {
  try {
    const matrix = generateComputedMatrix();

    return res.status(200).json({
      success: true,
      matrix,
    });
  } catch (error) {
    console.error("Computed Matrix Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load computed matrix",
    });
  }
};
