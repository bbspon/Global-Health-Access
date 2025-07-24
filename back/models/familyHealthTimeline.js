const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String },
  attachmentUrl: { type: String }, // Cloud storage path (if used)
});

const familyHealthTimelineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    memberName: { type: String, required: true }, // "Rajesh (Self)", "Kavya"
    events: [eventSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FamilyHealthTimeline",
  familyHealthTimelineSchema
);
