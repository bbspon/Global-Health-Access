const mongoose = require("mongoose");

const healthCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: "Health ID",
    },
    description: {
      type: String,
      default: "Generated for health card access",
    },
    qrData: {
      type: String, // base64 string
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthCard", healthCardSchema);
