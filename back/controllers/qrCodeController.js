const QRCode = require("../models/QRCode");
const generateQRCode = require("../utils/generateQRCode");

const createOrGetQRCode = async (req, res) => {
  const userId = req.user._id;

  let qr = await QRCode.findOne({ userId });

  if (!qr) {
    const qrString = `https://bbscart.com/health-profile/${userId}`;
    const image = await generateQRCode(qrString);

    qr = await QRCode.create({
      userId,
      qrString,
      imageUrl: image,
    });
  }

  res.json(qr);
};

module.exports = { createOrGetQRCode };
