const QRCode = require("qrcode");
const HealthCard = require("../models/HealthCard");

exports.getMyHealthId = async (req, res) => {
    const userId = req.user._id;

  try {
    let qrData = await HealthCard.findOne({ userId: userId });
    if (!qrData)
      return res.status(404).json({ message: "QR not generated yet" });
    res.json(qrData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.generateHealthId = async (req, res) => {
  try {
    const qrString = `https://bbscart.com/health/user/${req.user.id}`;
    const imageUrl = await QRCode.toDataURL(qrString);

    const updated = await QRModel.findOneAndUpdate(
      { userId: req.user.id },
      { qrString, imageUrl, planType: req.body.planType || "Basic" },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR" });
  }
};
