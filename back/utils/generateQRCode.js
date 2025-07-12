const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  try {
    const image = await QRCode.toDataURL(data); // returns base64 image
    return image;
  } catch (err) {
    throw err;
  }
};

module.exports = generateQRCode;
