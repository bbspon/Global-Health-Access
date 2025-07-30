// models/Staff.js
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Doctor", "Nurse", "Support"],
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }, // optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Staff", staffSchema);
