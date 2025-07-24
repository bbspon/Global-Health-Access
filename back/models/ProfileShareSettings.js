const mongoose = require("mongoose");

const profileShareSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  showName: { type: Boolean, default: true },
  showAge: { type: Boolean, default: false },
  showConditions: { type: Boolean, default: false },
  showAppointments: { type: Boolean, default: false },
});

module.exports = mongoose.model(
  "ProfileShareSettings",
  profileShareSettingsSchema
);
