// back/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendOTPSMS } = require("../utils/bsnlSms");

// small helper to create 6‑digit code
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


// Always sign with { id } so authMiddleware can read decoded.id
const signAccessToken = (user, expiresIn = "1d") =>
  jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      roleTags: user.roleTags || [],
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );

// -------------------- REGISTER --------------------
exports.register = async (req, res) => {
  try {
const {
  name,
  email,
  phone,
  password,
  referralCode,
  createdFrom,
  country,
  city,
  hospitalId,
} = req.body;

    // Validate required fields explicitly to avoid generic 500s
    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        message:
          "Missing fields. Please provide name, phone, email, and password.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      password, // keep your existing hashing/validation if applied elsewhere
      referralCode,
      country,
      city,
      hospitalId,

      createdFrom: createdFrom || "healthcare",
    });

    return res.status(201).json({
      message: "User created",
      token: signAccessToken(newUser, "7d"),
      user: {
        _id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        roleTags: newUser.roleTags || [],
        referralCode: referralCode || null,
        createdFrom: newUser.createdFrom,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    // Surface validation problems clearly
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

// -------------------- LOGIN --------------------
exports.login = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body || {};

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Lookup in BBSlive (models/User is bound to userDB)
    let user = await User.findOne({ email });

    // If user doesn't exist, CREATE it — but respect required fields
    if (!user) {
      if (!name || !phone) {
        return res.status(400).json({
          message:
            "First-time login detected. Please provide both name and phone to create your account.",
        });
      }

      user = await User.create({
        name,
        phone,
        email,
        password: password || "placeholder", // keep/replace with your hashing logic as needed
        createdFrom: "healthcare",
      });
    }

    // (Optional) If you enforce password, add verification here.

    const token = signAccessToken(user, "1d");

    return res.json({
      message: "Login success",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roleTags: user.roleTags || [],
        createdFrom: user.createdFrom,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Login failed" });
  }
};

// ----- OTP LOGIN HELPERS -----

// request an OTP sent to the given phone number (must already exist)
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body || {};
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "No user found with that phone number" });
    }

    const code = generateOtp();
    user.otp = { code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }; // 5 min
    await user.save();

    // fire off SMS, but don't block the request if SMS fails
    try {
      await sendOTPSMS(phone, code);
    } catch (smsErr) {
      console.error("Failed to send OTP sms", smsErr);
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("sendOtp error", err);
    res.status(500).json({ message: "Unable to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body || {};
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP required" });

    const user = await User.findOne({ phone });
    if (!user || !user.otp) {
      return res.status(400).json({ message: "Invalid OTP or phone" });
    }

    if (user.otp.code !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    if (user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // clear OTP before issuing token
    user.otp = undefined;
    await user.save();

    const token = signAccessToken(user, "1d");
    return res.json({ message: "Login success", token, user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roleTags: user.roleTags || [],
        createdFrom: user.createdFrom,
      } });
  } catch (err) {
    console.error("verifyOtp error", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ===========================
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // <-- FIXED
      { name, email, phone },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};
