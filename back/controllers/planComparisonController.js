// controllers/planComparisonController.js

const PlanComparison = require("../models/PlanComparison");

// GET by Hospital
exports.getPlanComparison = async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const data = await PlanComparison.findOne({ hospitalId });
    if (!data) return res.status(404).json({ message: "No comparison found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// POST or UPDATE
exports.savePlanComparison = async (req, res) => {
  const { hospitalId, plans, rows } = req.body;
  if (!hospitalId || !plans || !rows)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const existing = await PlanComparison.findOne({ hospitalId });

    if (existing) {
      existing.plans = plans;
      existing.rows = rows;
      await existing.save();
      res.json({ message: "Updated successfully" });
    } else {
      await PlanComparison.create({ hospitalId, plans, rows });
      res.status(201).json({ message: "Saved successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
