const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema(
  {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPlan",
      required: true,
    },
    name: String,
    age: Number,
    gender: String,
    relationship: String,
    idProofUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
