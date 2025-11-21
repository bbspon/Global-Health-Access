/**
 * PLAN STRUCTURE (Block 6)
 * Defines what each plan includes, benefits, and add-on permissions.
 */

const planStructure = {
  lite: {
    opd_discount: 0.1,
    lab_discount: 0.12,
    pharmacy_discount: 0.08,
    allowed_addons: [
      "dental",
      "vision",
      "wellness",
      "teleconsultation_upgrade",
    ],
  },

  prime: {
    opd_discount: 0.2,
    lab_discount: 0.25,
    pharmacy_discount: 0.15,
    allowed_addons: [
      "dental",
      "vision",
      "wellness",
      "teleconsultation_upgrade",
      "opd_upgrade",
      "lab_upgrade",
    ],
  },

  elite: {
    opd_discount: 0.3,
    lab_discount: 0.35,
    pharmacy_discount: 0.2,
    allowed_addons: [
      "dental",
      "vision",
      "wellness",
      "teleconsultation_upgrade",
      "opd_upgrade",
      "lab_upgrade",
      "pharmacy_savings",
      "chronic_care",
      "maternity",
    ],
  },
};

module.exports = { planStructure };
