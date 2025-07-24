const MedicalRecord = require("../models/MedicalRecord");
const path = require("path");
const fs = require("fs");

exports.uploadRecord = async (req, res) => {
  try {
    const { name, category, date, tags } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const newRecord = new MedicalRecord({
      userId: req.user.id,
      name,
      category,
      date,
      tags: JSON.parse(tags),
      fileUrl: `/uploads/medical/${file.filename}`,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordsByUser = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
