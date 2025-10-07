const fs = require("fs");
const path = require("path");
const HospitalOnboarding = require("../models/HospitalOnboarding");

exports.createHospitalOnboarding = async (req, res) => {
  try {
    const { hospitalName, registrationNumber } = req.body || {};

    if (!hospitalName || !registrationNumber) {
      return res
        .status(400)
        .json({
          message: "Hospital name and registration number are required",
        });
    }

    let licenseMeta;
    if (req.file) {
      const publicUrl = `/uploads/licenses/${req.file.filename}`;
      licenseMeta = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: publicUrl,
      };
    }

    const record = await HospitalOnboarding.create({
      hospitalName: hospitalName.trim(),
      registrationNumber: registrationNumber.trim(),
      licenseFile: licenseMeta,
      status: "pending",
      createdBy: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Hospital onboarding submitted successfully", record });
  } catch (err) {
    console.error("Hospital onboarding error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.listMyHospitals = async (req, res) => {
  const records = await HospitalOnboarding.find({
    createdBy: req.user._id,
  }).sort({
    createdAt: -1,
  });
  res.json(records);
};

exports.getHospitalById = async (req, res) => {
  const record = await HospitalOnboarding.findById(req.params.id);
  if (!record) return res.status(404).json({ message: "Record not found" });
  res.json(record);
};

exports.updateHospitalStatus = async (req, res) => {
  const { status } = req.body || {};
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const record = await HospitalOnboarding.findByIdAndUpdate(
    req.params.id,
    { $set: { status, approvedBy: req.user._id, approvedAt: new Date() } },
    { new: true }
  );
  if (!record) return res.status(404).json({ message: "Record not found" });
  res.json({ message: "Status updated", record });
};
