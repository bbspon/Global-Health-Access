/**
 * UTILIZATION MODEL (Block 4)
 * Predicts how often a person may use services in a year.
 * Premium engine uses this to forecast expected payouts.
 */

const utilizationModel = {
  opd: {
    visits_per_year: 3.2,
    probability: 0.62,
  },
  labs: {
    tests_per_year: 2.4,
    probability: 0.48,
  },
  pharmacy: {
    fills_per_year: 6.0,
    probability: 0.7,
  },
  chronic_followup: {
    probability: 0.15,
    visits_per_year: 3,
  },
};

module.exports = { utilizationModel };
