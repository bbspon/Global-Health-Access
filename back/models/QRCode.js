const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    qrString: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // could be base64 or S3/cloudinary URL
      required: true,
    },
    planType: {
      type: String,
      enum: ["Basic", "Premium", "Corporate"],
      default: "Basic",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRCode", qrCodeSchema);
