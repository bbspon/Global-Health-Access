const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ["Info", "Finance", "System", "Health", "Alert"],
      default: "Info",
    },
    visibleTo: {
      type: [String], // e.g., ["admin", "hospital", "user"]
      default: ["user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
