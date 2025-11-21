const { calculatePremium } = require("./premiumCalculator");
const { planStructure } = require("./planStructure");
const tierMultipliers = require("./tierPricing");
const addonPricing = require("./addonPricing");

const {
  ageRiskTable,
  cityCostIndex,
  diseaseRiskLoads,
} = require("./riskTables");

/**
 * STATIC REFERENCE MATRIX
 * (Used by frontend Pricing Matrix Modal)
 */
function generateReferenceMatrix() {
  return {
    ageRiskTable,
    cityCostIndex,
    tierMultipliers,
    addonPricing,
    planStructure,
    diseaseRiskLoads,
  };
}

/**
 * COMPUTED MATRIX
 * (Optional: Full matrix generator)
 */
function generateComputedMatrix() {
  const matrix = {};
  const cities = Object.keys(cityCostIndex);
  const ages = Object.keys(ageRiskTable);
  const plans = Object.keys(planStructure);
  const tiers = Object.keys(tierMultipliers);

  cities.forEach((city) => {
    matrix[city] = {};
    ages.forEach((age) => {
      matrix[city][age] = {};
      plans.forEach((plan) => {
        matrix[city][age][plan] = {};
        tiers.forEach((tier) => {
          matrix[city][age][plan][tier] = calculatePremium({
            ageBand: age,
            city,
            diseases: [],
            plan,
            addons: [],
            tier,
            billingCycle: "monthly",
          });
        });
      });
    });
  });

  return matrix;
}

module.exports = {
  generateReferenceMatrix,
  generateComputedMatrix,
};
