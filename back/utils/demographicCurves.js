/**
 * DEMOGRAPHIC MODELS (Block 5)
 * Helps calculate how age groups adopt plans and their risk bias.
 */

const demographicCurves = {
  adoptionCurve: {
    "18-30": 0.4,
    "31-40": 0.55,
    "41-50": 0.65,
    "51-60": 0.6,
  },
  ageWeighting: {
    "18-30": 0.8,
    "31-40": 1.0,
    "41-50": 1.2,
    "51-60": 1.4,
  },
};

module.exports = { demographicCurves };
