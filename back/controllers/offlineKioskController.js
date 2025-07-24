const OfflinePatient = require("../models/OfflinePatient");
const path = require("path");
const fs = require("fs");

exports.getPatientById = async (req, res) => {
  try {
    console.log("REQ PARAMS:", req.params); // ✅ Debug log
    const { id } = req.params;
    const patient = await OfflinePatient.findOne({ patientId: id });
    if (!patient) return res.status(404).json({ error: "Not Found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.uploadDocs = async (req, res) => {
  try {
    const { patientId } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Save files to local queue folder
    const folderPath = path.join(__dirname, `../uploads/kiosk/${patientId}`);
    fs.mkdirSync(folderPath, { recursive: true });

    files.forEach((file) => {
      const dest = path.join(folderPath, file.originalname);
      fs.renameSync(file.path, dest);
    });

    res.json({ message: "Files uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
};
