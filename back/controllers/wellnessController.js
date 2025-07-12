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

module.exports = { logWellness, getWellnessLogs };
