const HealthObjectiveContent = require("../models/healthObjectiveContent");

exports.getHealthObjectiveContent = async (req, res) => {
  try {
    const content = await HealthObjectiveContent.findOne().sort({
      lastUpdated: -1,
    });
    if (!content) return res.status(404).json({ error: "No content found" });
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createOrUpdateHealthObjective = async (req, res) => {
  try {
    const existing = await HealthObjectiveContent.findOne();
    if (existing) {
      const updated = await HealthObjectiveContent.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.status(200).json(updated);
    } else {
      const newContent = new HealthObjectiveContent(req.body);
      await newContent.save();
      res.status(201).json(newContent);
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
