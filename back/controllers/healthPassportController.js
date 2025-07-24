// controllers/healthPassportController.js
const HealthPassport = require("../models/HealthPassport");

exports.getHealthPassportByUserId = async (req, res) => {
  try {
    const passport = await HealthPassport.findOne({
      userId: req.params.userId,
    });
    if (!passport)
      return res.status(404).json({ message: "Passport not found" });
    res.json(passport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional mock exports
exports.exportPDF = (req, res) => {
  res.json({ message: "PDF export initiated (simulated)" });
};

exports.exportFHIR = (req, res) => {
  res.json({ message: "FHIR JSON export initiated (simulated)" });
};

exports.exportZIP = (req, res) => {
  res.json({ message: "ZIP export initiated (simulated)" });
};

exports.generateSecureLink = (req, res) => {
  const link = `https://bbscart.com/secure-link/${Date.now()}`;
  res.json({ link, message: "Secure share link generated (simulated)" });
};
