const UserPlan = require("../models/UserPlan");
const User = require("../models/User");

const getPlansExpiringSoon = async (req, res) => {
  const today = new Date();
  const cutoff = new Date();
  cutoff.setDate(today.getDate() + 7); // next 7 days

  const plans = await UserPlan.find({
    endDate: { $lte: cutoff, $gte: today },
    isRenewed: false,
  }).populate("userId", "name email phone");

  res.json(plans);
};
