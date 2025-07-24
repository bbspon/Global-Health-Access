const EmergencySOS = require("../models/EmergencySOS.js"); // Assuming you have this model

const triggerSOS = async (req, res) => {
  try {
    const { userId, location, guardianContact } = req.body;

    const newSOS = new EmergencySOS({ userId, location, guardianContact });
    await newSOS.save();

    // Future: Integrate SMS/Email alert here

    res.status(200).json({ message: "SOS triggered and logged successfully" });
  } catch (err) {
    console.error("Error triggering SOS:", err);
    res.status(500).json({ error: "Server error while triggering SOS" });
  }
};
module.exports = { triggerSOS };
