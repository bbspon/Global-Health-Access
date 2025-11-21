/**
 * PAYOUT MODEL ENGINE
 * Computes monthly payout for hospital based on:
 * - Service usage (OPD / LAB / PHARMACY)
 * - Add-on usage
 * - Discounts applied
 * - Hospital tier
 * - Global payout ratio
 */

const { tierMultipliers } = require("./tierPricing");

const BASE_PAYOUT_RATIO = 0.35;

function calculatePayout({
  serviceType,
  basePrice,
  discountApplied,
  addonPayout = 0,
  tier,
}) {
  const tierFactor = tierMultipliers[tier] || 1.0;

  // Discount cost that BBS must cover
  const discountCost = basePrice * discountApplied;

  // Total value before tier multiplier
  const subtotal = discountCost + addonPayout;

  // Tier-based enhancement
  const tierAdjusted = subtotal * tierFactor;

  // Final payout
  const payout = tierAdjusted * BASE_PAYOUT_RATIO;

  return Math.round(payout);
}

module.exports = { calculatePayout };
