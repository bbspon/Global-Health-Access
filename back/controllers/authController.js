const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// 🔐 Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };
  
exports.registerUser = async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;

      // 1. Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      // 2. Create new user instance
      const user = new User({ name, email, phone, password, role });
      await user.save(); // ⛏️ Ensures .pre('save') runs and password gets hashed

      // 3. Generate token
      const token = generateToken(user._id);

      // 4. Respond with user data (excluding password)
      res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Signup failed",
          error: error.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // 2. Compare password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // 3. Generate token
      const token = generateToken(user._id);

      // 4. Respond with user info
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
      // ✅ 1. Save token & role
      // localStorage.setItem("accessToken", data.token);
      // localStorage.setItem("userRole", data.user.role);
    } catch (error) {
      console.error("Login Error:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Login failed",
          error: error.message,
        });
    }
};
