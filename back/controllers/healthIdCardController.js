const UsageLog = require("../models/UsageLog");
const Payout = require("../models/Payout");
const User = require("../models/User");
const QRCode = require("qrcode");

exports.getMyHealthID = async (req, res) => {
  try {
    const userId = req.user.id; // coming from auth middleware

    const user = await User.findById(userId).select("name healthId qrCode");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If QR already exists → return it
    if (user.qrCode) {
      return res.json({
        name: user.name,
        healthId: user.healthId,
        qrCode: user.qrCode,
      });
    }

    // If QR does NOT exist → generate new QR
    const qrPayload = {
      userId: userId,
      healthId: user.healthId,
      name: user.name,
    };

    const qrString = JSON.stringify(qrPayload);
    const qrImage = await QRCode.toDataURL(qrString);

    // Save QR to user document
    user.qrCode = qrImage;
    await user.save();

    res.json({
      name: user.name,
      healthId: user.healthId,
      qrCode: user.qrCode,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error generating QR" });
  }
};
