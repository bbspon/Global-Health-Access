const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userDB = require("../config/userDB"); // ✅ This connection goes to BBSCartLocal1

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String], // e.g., ["user", "healthcare"]
      default: ["user"],
    },
    createdFrom: {
      type: String,
      default: "healthcare",
    },
    referralCode: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    country: { type: String, default: null },
    city: { type: String, default: null },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthcarePartner",
      default: null,
    },
    // one-time password for login/verification
    otp: {
      code: { type: String },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

// ✅ Auto-hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Method to compare entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = userDB.model("User", UserSchema);
