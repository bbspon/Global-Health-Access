const HealthCarePartner = require("../models/HealthcarePartner");
const { classifyHospital } = require("../utils/classifyHospital");

/**
 * HOSPITAL CONTROLLER
 * Endpoints:
 * POST /api/hospitals/register
 * GET  /api/hospitals/list
 */

exports.registerHospital = async (req, res) => {
  try {
    const data = req.body;

    // Auto-calculate hospital tier
    const { score, tier } = classifyHospital(data);
    data.tier = tier;
    data.classificationScore = score;

    const hospital = new HealthCarePartner(data);
    await hospital.save();

    res.json({
      success: true,
      message: "Hospital partner registered",
      hospital,
    });
  } catch (err) {
    console.error("Hospital Registration Error:", err);
    res.status(500).json({
      success: false,
      message: "Hospital registration failed",
    });
  }
};

exports.listHospitals = async (req, res) => {
  try {
    const hospitals = await HealthCarePartner.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      hospitals,
    });
  } catch (err) {
    console.error("Hospital List Error:", err);
    res.status(500).json({
      success: false,
      message: "Unable to fetch hospital list",
    });
  }
};
exports.classifyHospitalController = async (req, res) => {
  try {
    const hospitalData = req.body;

    // Call classification engine
    const result = classifyHospital(hospitalData);

    return res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Hospital Classification Error:", err);
    return res.status(500).json({
      success: false,
      message: "Hospital classification failed",
    });
  }
};
