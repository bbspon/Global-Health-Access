const InsuranceIntegration = require("../models/InsuranceIntegration");
const InsurancePlan = require("../models/InsurancePlan");
const InsurancePolicy = require("../models/InsurancePolicy");
exports.getAllInsurancePartners = async (req, res) => {
  try {
    const data = await InsuranceIntegration.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addInsurancePartner = async (req, res) => {
  try {
    const newData = new InsuranceIntegration(req.body);
    await newData.save();
    res
      .status(201)
      .json({ success: true, message: "Partner Added", data: newData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await InsurancePlan.find();
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch plans" });
  }
};

// Get user's current policy
exports.getUserPolicy = async (req, res) => {
  try {
    const policy = await InsurancePolicy.findOne({ userId: req.user._id });
    res.json({ success: true, policy });
  } catch (err) {
    res.status(500).json({ success: false, error: "Could not fetch policy" });
  }
};

// Toggle auto-renew
exports.toggleAutoRenew = async (req, res) => {
  try {
    const policy = await InsurancePolicy.findOne({ userId: req.user._id });
    if (!policy)
      return res
        .status(404)
        .json({ success: false, error: "Policy not found" });

    policy.isAutoRenewal = !policy.isAutoRenewal;
    await policy.save();

    res.json({ success: true, message: "Auto-renew status updated", policy });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

// Optional: Purchase a new policy
exports.purchasePolicy = async (req, res) => {
  try {
    const { provider, planName, premium, coverageAmount } = req.body;

    const policy = new InsurancePolicy({
      userId: req.user._id,
      provider,
      planName,
      premium,
      coverageAmount,
      isAutoRenewal: false,
    });

    await policy.save();
    res.json({ success: true, message: "Policy purchased", policy });
  } catch (err) {
    res.status(500).json({ success: false, error: "Purchase failed" });
  }
};
