/**
 * PREMIUM CALCULATOR ENGINE (Block 7)
 * Returns full premium breakdown:
 * - basePremium
 * - riskAdjustment
 * - addonCost
 * - diseaseLoad
 * - totalPremium
 */

const {
  ageRiskTable,
  cityCostIndex,
  diseaseRiskLoads,
} = require("./riskTables");

const { addonPricing } = require("./addonPricing");
const { tierMultipliers } = require("./tierPricing");
const { planStructure } = require("./planStructure");

function calculatePremium({
  ageBand,
  city,
  diseases = [],
  plan,
  addons = [],
  tier,
  billingCycle, // monthly | yearly
}) {
  /** STEP 1: Age Risk */
  const ageRisk = ageRiskTable[ageBand] || 1.0; // base multiplier
  const riskAdjustment = Number(((ageRisk - 1) * 100).toFixed(2));

  /** STEP 2: Disease Load (multiplicative risk) */
  let diseaseLoad = 0;
  diseases.forEach((d) => {
    if (diseaseRiskLoads[d]) diseaseLoad += diseaseRiskLoads[d];
  });

  /** STEP 3: City Index */
  const cityFactor = cityCostIndex[city] || 1.0;

  /** STEP 4: Tier Multiplier */
  const tierFactor = tierMultipliers[tier] || 1.0;

  /** STEP 5: Add-on pricing (risk + flat models) */
  let addonCost = 0;
  addons.forEach((a) => {
    const add = addonPricing[a];
    if (!add) return;

    if (add.type === "flat") {
      addonCost += add.price;
    } else if (add.type === "risk") {
      addonCost += ageRisk * add.load * 100; // risk-based addon cost
    }
  });

  /** STEP 6: Base premium formula */
  const basePremium = ageRisk * cityFactor * tierFactor * 100;

  /** STEP 7: Disease-loaded premium */
  const diseasePremium = basePremium * diseaseLoad;

  /** STEP 8: Final premium before discounts */
  let totalPremium = basePremium + diseasePremium + addonCost;

  /** STEP 9: Yearly billing discount (12%) */
  if (billingCycle === "yearly") {
    totalPremium = totalPremium * 0.88;
  }

  /** FINAL STRUCTURED RETURN */
  return {
    basePremium: Math.round(basePremium),
    riskAdjustment: Math.round(riskAdjustment),
    addonCost: Math.round(addonCost),
    diseaseLoad: Math.round(diseasePremium),
    totalPremium: Math.round(totalPremium),
  };
}

module.exports = { calculatePremium };
