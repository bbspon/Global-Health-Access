const UserPlan = require("../models/UserPlan");
const { generateQRCode } = require("../utils/generateQRCode");

exports.getUserQRCode = async (req, res) => {
  try {
    const userId = req.user.id;

    const userPlan = await UserPlan.findOne({
      userId,
      status: "active",
    }).populate("planId");
    if (!userPlan)
      return res.status(404).json({ message: "No active plan found" });

    const qrData = {
      userId,
      planId: userPlan.planId._id,
      planName: userPlan.planId.name,
      startDate: userPlan.startDate,
      endDate: userPlan.endDate,
      transactionId: userPlan.transactionId,
    };

    const qrImage = await generateQRCode(qrData);
    res.status(200).json({ qr: qrImage, info: qrData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate QR" });
  }
};
