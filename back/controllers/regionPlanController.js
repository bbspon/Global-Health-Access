const HealthPlan = require("../models/HealthPlan");
const Hospital = require("../models/Hospital");

exports.getPlansByRegion = async (req, res) => {
  console.log("✅ getPlansByRegion API hit");

  try {
    const { country, city } = req.query;
    const plans = await HealthPlan.find({ country, city });
    res.status(200).json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching plans" });
  }
};


exports.getHospitalsByRegion = async (req, res) => {
  try {
    const { country, city } = req.query;
    const hospitals = await Hospital.find({ country, city });
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching hospitals" });
  }
};
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find(
      {},
      "name country city tier supports"
    );

    res.status(200).json({
      success: true,
      hospitals,
    });
  } catch (err) {
    console.error("Error fetching all hospitals:", err);
    res.status(500).json({ error: "Server error fetching hospitals" });
  }
};
