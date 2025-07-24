const UserMembership = require("../models/UserMembership");

exports.getMyMembership = async (req, res) => {
  try {
    const membership = await UserMembership.findOne({ userId: req.user.id });
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json(membership);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMembership = async (req, res) => {
  const { planType } = req.body;

  if (!["Basic", "Premium", "Corporate"].includes(planType)) {
    return res.status(400).json({ error: "Invalid plan type" });
  }

  try {
    const updated = await UserMembership.findOneAndUpdate(
      { userId: req.user.id },
      { planType },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.toggleAutoRenew = async (req, res) => {
  try {
    const membership = await UserMembership.findOne({ userId: req.user.id });
    if (!membership)
      return res.status(404).json({ error: "Membership not found" });

    membership.autoRenew = !membership.autoRenew;
    await membership.save();

    res.json({ autoRenew: membership.autoRenew });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
