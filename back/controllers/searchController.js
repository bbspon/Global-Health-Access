const Hospital = require("../models/HospitalOnboarding");
const Doctor = require("../models/Staff");
const Lab = require("../models/Lab");

exports.searchAll = async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase();

    const doctors = await Doctor.find({
      name: { $regex: q, $options: "i" },
    });

    const hospitals = await Hospital.find({
      clinicName: { $regex: q, $options: "i" },
    });

    const labs = await Lab.find({
      labName: { $regex: q, $options: "i" },
    });

    res.json({
      doctors,
      hospitals,
      labs,
    });
  } catch (err) {
    console.log("Search API Error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};
