const Consultation = require("../models/Consultation");

// Save consultation data
exports.saveConsultation = async (req, res) => {
  try {
    const {
      doctorId,
      patientId,
      patientName,
      symptoms,
      notes,
      prescription,
      messages,
    } = req.body;

    const newConsult = new Consultation({
      doctorId,
      patientId,
      patientName,
      symptoms,
      notes,
      prescription,
      messages,
    });

    const saved = await newConsult.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
