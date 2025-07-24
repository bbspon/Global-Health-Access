const ProfileShareSettings = require("../models/ProfileShareSettings");

exports.getShareSettings = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT middleware
    const settings = await ProfileShareSettings.findOne({ userId });
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to load settings", error: err });
  }
};

exports.saveShareSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { showName, showAge, showConditions, showAppointments } = req.body;

    const updated = await ProfileShareSettings.findOneAndUpdate(
      { userId },
      { showName, showAge, showConditions, showAppointments },
      { upsert: true, new: true }
    );

    res.json({ message: "Settings saved", settings: updated });
  } catch (err) {
    res.status(500).json({ message: "Save failed", error: err });
  }
};
