// routes/familyDashboardRoutes.js
const express = require("express");
const router = express.Router();
const FamilyDashboard = require("../models/FamilyDashboard");

// GET: fetch all family dashboard data
// GET: fetch family dashboard data for a specific user
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId; // or req.headers['userid'] or from token middleware
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const data = await FamilyDashboard.find({ userId });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Fetch family dashboard error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
