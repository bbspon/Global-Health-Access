const Payout = require("../models/Payout");
const UsageLog = require("../models/UsageLog");
const { calculatePayout } = require("../utils/payoutModel");

/**
 * SETTLEMENT CONTROLLER
 * POST /api/settlements/generate
 * GET  /api/settlements
 */

exports.generateSettlement = async (req, res) => {
  try {
    // FIX: Read from req.body (NOT req.query)
    const { hospitalId, month } = req.body;

    if (!hospitalId || !month) {
      return res.status(400).json({
        success: false,
        message: "hospitalId and month required",
      });
    }

    // Fetch all usage logs for this hospital + month
    const usageLogs = await UsageLog.find({
      hospitalId,
      month,
    });

    let totalPayout = 0;

    usageLogs.forEach((log) => {
      const payout = calculatePayout({
        serviceType: log.serviceType,
        basePrice: log.basePrice,
        discountApplied: log.discountApplied,
        addonPayout: log.addonPayout,
        tier: log.tier,
      });
      totalPayout += payout;
    });

    // Create payout record
    const payoutRecord = await Payout.create({
      hospitalId,
      month,
      totalPayout,
      totalVisits: usageLogs.length,
      status: "pending",
    });

    return res.json({
      success: true,
      payout: payoutRecord,
    });
  } catch (err) {
    console.error("Settlement Error:", err);
    res.status(500).json({
      success: false,
      message: "Settlement generation failed",
    });
  }
};

exports.getSettlements = async (req, res) => {
  try {
    const { hospitalId } = req.query;

    const payouts = await Payout.find({ hospitalId }).sort({ month: -1 });

    res.json({
      success: true,
      payouts,
    });
  } catch (err) {
    console.error("Payout Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch settlement history",
    });
  }
};
