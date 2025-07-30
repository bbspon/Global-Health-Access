const Analytics = require("../models/Analytics");

exports.getHospitalAnalytics = async (req, res) => {
  try {
    const { hospitalId } = req.query;

    if (!hospitalId) {
      return res.status(400).json({ message: "hospitalId is required" });
    }

    const analytics = await Analytics.findOne({ hospitalId });

    if (!analytics) {
      return res.status(404).json({ message: "No analytics found" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};
