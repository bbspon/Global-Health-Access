const PrescriptionLoop = require("../models/prescriptionLoop");

const mongoose = require("mongoose");

exports.getPrescriptionLoop = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId); // ← This is CRITICAL
    const record = await PrescriptionLoop.findOne({ userId });
    res.json(record || {});
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch prescription loop" });
  }
};


exports.createPrescriptionLoop = async (req, res) => {
  try {
    const newData = new PrescriptionLoop(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: "Failed to create." });
  }
};

exports.updatePrescriptionLoop = async (req, res) => {
  try {
    const updated = await PrescriptionLoop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed." });
  }
};

exports.deletePrescriptionLoop = async (req, res) => {
  try {
    await PrescriptionLoop.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed." });
  }
};
