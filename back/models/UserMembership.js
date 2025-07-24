const mongoose = require("mongoose");

const userMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    planType: {
      type: String,
      enum: ["Basic", "Premium", "Corporate"],
      default: "Basic",
    },
    consultsUsed: {
      type: Number,
      default: 0,
    },
    opdUsed: {
      type: Number,
      default: 0,
    },
    qrCodeId: {
      type: String,
      default: "",
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserMembership", userMembershipSchema);
