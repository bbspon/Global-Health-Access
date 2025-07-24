const FamilyMember = require("../models/FamilyMember");

exports.getFamilyMembers = async (req, res) => {
  try {
    const { planId } = req.params;
    const members = await FamilyMember.find({ planId });
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addFamilyMember = async (req, res) => {
  try {
    const { planId } = req.params;
    const member = await FamilyMember.create({ ...req.body, planId });
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
