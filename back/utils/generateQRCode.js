const QRCode = require("qrcode");

exports.generateQRCode = async (data) => {
  try {
    const url = await QRCode.toDataURL(JSON.stringify(data));
    return url;
  } catch (err) {
    throw new Error("QR generation failed");
  }
};
