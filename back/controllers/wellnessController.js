const WellnessLog = require("../models/WellnessLog");

const logWellness = async (req, res) => {
  const userId = req.user._id;
  const { date, steps, sleepHours, waterLitres } = req.body;

  let log = await WellnessLog.findOne({ userId, date });

  if (log) {
    log.steps = steps;
    log.sleepHours = sleepHours;
    log.waterLitres = waterLitres;
  } else {
    log = new WellnessLog({ userId, date, steps, sleepHours, waterLitres });
  }

  await log.save();
  res.json({ message: "Wellness data saved", log });
};

const getWellnessLogs = async (req, res) => {
  const userId = req.user._id;
  const logs = await WellnessLog.find({ userId }).sort({ date: -1 }).limit(7);
  res.json(logs);
};
const getRecentLogs = async (req, res) => {
  try {
    const recentLogs = await WellnessLog.find().sort({ date: -1 }).limit(7);
    res.json(recentLogs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
module.exports = { logWellness, getWellnessLogs, getRecentLogs };
