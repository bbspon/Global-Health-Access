const CarePassScanLog = require("../models/CarePassScanLog");

// 🔍 Simulate QR scan (or later replace with real QR data fetch)
exports.simulateScan = async (req, res) => {
  try {
    const { userId = "USER987654", scannedBy = "DemoHospital" } = req.body;

    const result = {
      plan: "Elite Health Access",
      tier: "Super Premium",
      status: "✅ Valid",
      expiry: "31 Dec 2025",
    };

    // Log it
    await CarePassScanLog.create({
      userId,
      scannedBy,
      location: "Chennai HQ", // You can auto-detect in real version
      result,
    });

    res.json({ userId, ...result });
  } catch (err) {
    console.error("Care Pass Scan Error:", err);
    res.status(500).json({ error: "Scan failed. Try again." });
  }
};
