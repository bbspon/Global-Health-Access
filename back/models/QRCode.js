const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  qrString: { type: String, required: true }, // could be the user’s public profile URL
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QRCode", qrCodeSchema);
