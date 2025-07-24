const PurchaseSummary = require("../models/PurchaseSummary");

exports.savePurchaseSummary = async (req, res) => {
  try {
    const data = req.body;
    const newSummary = new PurchaseSummary(data);
    await newSummary.save();
    res
      .status(201)
      .json({ success: true, message: "Summary saved", data: newSummary });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to save summary" });
  }
};

exports.getMyPurchaseSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const summary = await PurchaseSummary.find({ userId })
      .sort({ purchasedAt: -1 })
      .limit(1);
    res.json(summary[0]);
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch summary" });
  }
};
exports.getSummariesByPlan = async (req, res) => {
  try {
    const { planId } = req.params;

    if (!planId) {
      return res.status(400).json({ message: "planId is required" });
    }

    const summaries = await PurchaseSummary.find({ planId })
      .populate("user", "name email") // if you want to show user info
      .populate("planId", "name price");

    res.status(200).json({ data: summaries });
  } catch (error) {
    console.error("Error fetching summaries by plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
