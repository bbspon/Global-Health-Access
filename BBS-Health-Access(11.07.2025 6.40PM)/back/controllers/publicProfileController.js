const PublicProfile = require("../models/PublicProfile");
const User = require("../models/User");

const getMyProfileSettings = async (req, res) => {
  const profile = await PublicProfile.findOne({ userId: req.user._id });
  res.json(profile);
};

const updateProfileSettings = async (req, res) => {
  const { showName, showAge, showConditions, showAppointments } = req.body;

  let profile = await PublicProfile.findOne({ userId: req.user._id });
  if (!profile) {
    profile = new PublicProfile({ userId: req.user._id });
  }

  profile.showName = showName;
  profile.showAge = showAge;
  profile.showConditions = showConditions;
  profile.showAppointments = showAppointments;

  await profile.save();
  res.json({ message: "Settings updated", profile });
};

const getPublicProfile = async (req, res) => {
  const userId = req.params.userId;
  const profile = await PublicProfile.findOne({ userId }).lean();
  const user = await User.findById(userId).lean();

  if (!profile || !user)
    return res.status(404).json({ error: "Profile not found" });

  res.json({
    name: profile.showName ? user.name : "Hidden",
    age: profile.showAge ? user.age : "Hidden",
    conditions: profile.showConditions ? user.conditions || [] : [],
    appointments: profile.showAppointments ? user.appointments || [] : [],
  });
};

module.exports = {
  getMyProfileSettings,
  updateProfileSettings,
  getPublicProfile,
};
