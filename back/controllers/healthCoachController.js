// controllers/healthCoachController.js
const HealthCoach = require("../models/HealthCoach");

exports.getCoachDataByUserId = async (req, res) => {
  try {
    const coachData = await HealthCoach.findOne({ userId: req.params.userId });
    if (!coachData) {
      return res.status(404).json({ message: "Coach data not found" });
    }
    res.status(200).json(coachData);
  } catch (error) {
    console.error("Error fetching coach data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addOrUpdateCoachData = async (req, res) => {
  try {
    const { userId, ...payload } = req.body;
    const updated = await HealthCoach.findOneAndUpdate(
      { userId },
      { $set: payload },
      { new: true, upsert: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error saving coach data:", error);
    res.status(500).json({ message: "Failed to save data" });
  }
};
