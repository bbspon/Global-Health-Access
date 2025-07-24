// controllers/qrHealthPassController.js
const QrHealthPass = require("../models/QrHealthPass");

exports.generateQrToken = async (req, res) => {
  const { userId, planId } = req.body;
  try {
    const payload = {
      userId,
      planId,
      timestamp: Date.now(),
    };
    const token = Buffer.from(JSON.stringify(payload)).toString("base64");
    return res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Token generation failed" });
  }
};

exports.recordScan = async (req, res) => {
  const { token, location } = req.body;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    const newScan = await QrHealthPass.create({
      userId: decoded.userId,
      planId: decoded.planId,
      token,
      location,
    });
    res.status(201).json({ message: "Scan recorded", data: newScan });
  } catch (err) {
    res.status(400).json({ error: "Invalid token or scan failed" });
  }
};

exports.getScanHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const scans = await QrHealthPass.find({ userId })
      .sort({ scannedAt: -1 })
      .limit(10);
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
};
