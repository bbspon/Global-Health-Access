const PlanValueCalculation = require("../models/PlanValueCalculation");
const { validatePlanValueInput } = require("../validation/planValueValidation");

const tierBaseRates = {
  Basic: 1000,
  Prime: 2000,
  Elite: 3000,
};

const moduleMultipliers = {
  opd: 100,
  ipd: 300,
  lab: 150,
  mentalHealth: 250,
};

const addOnRates = {
  maternity: 1000,
  dental: 600,
  wellness: 500,
};

exports.calculatePlanValue = async (req, res) => {
  const { error } = validatePlanValueInput(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { planTier, modules, addOns } = req.body;
    const userId = req.user._id;

    let base = tierBaseRates[planTier] || 0;
    let modulesValue = 0;

    Object.entries(modules).forEach(([key, value]) => {
      modulesValue += (value || 0) * (moduleMultipliers[key] || 0);
    });

    let addOnValue = (addOns || []).reduce((total, key) => {
      return total + (addOnRates[key] || 0);
    }, 0);

    const estimatedValue = base + modulesValue + addOnValue;

    const newCalc = new PlanValueCalculation({
      userId,
      planTier,
      modules,
      addOns,
      estimatedValue,
    });
    console.log("💬 Received payload:", req.body);

    await newCalc.save();

    res.json({ estimatedValue, breakdown: { base, modulesValue, addOnValue } });
  } catch (err) {
    console.error("Value Calc Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getPlanValuePresets = (req, res) => {
  return res.json({ tierBaseRates, moduleMultipliers, addOnRates });
};
