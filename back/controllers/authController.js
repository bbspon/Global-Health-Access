// back/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
