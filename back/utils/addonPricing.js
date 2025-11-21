/**
 * ADD-ON PRICING (Block 3)
 * High-risk add-ons → risk-based
 * Low-risk add-ons → flat pricing
 */

const addonPricing = {
  // Risk-Based Add-ons
  maternity: {
    type: "risk",
    load: 0.45, // 45% of base risk
  },
  opd_upgrade: {
    type: "risk",
    load: 0.3,
  },
  lab_upgrade: {
    type: "risk",
    load: 0.35,
  },
  pharmacy_savings: {
    type: "risk",
    load: 0.28,
  },
  chronic_care: {
    type: "risk",
    load: 0.4,
  },

  // Flat-Priced Add-ons
  dental: {
    type: "flat",
    price: 149,
  },
  vision: {
    type: "flat",
    price: 129,
  },
  wellness: {
    type: "flat",
    price: 99,
  },
  teleconsultation_upgrade: {
    type: "flat",
    price: 89,
  },
};

module.exports = { addonPricing };
