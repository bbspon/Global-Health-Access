/**
 * TIER PRICING (Block 2)
 * Hospitals assigned a tier get premium multipliers
 * Used in premium calculation + payout engine
 */

const tierMultipliers = {
  // Indian market
  A: 1.3,
  B: 1.1,
  C: 0.9,

  // UAE default mapping
  premium: 1.4,
  standard: 1.15,
  basic: 0.85,
};

module.exports = { tierMultipliers };
