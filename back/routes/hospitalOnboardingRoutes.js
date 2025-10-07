const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/authMiddleware");
const {
  createHospitalOnboarding,
  listMyHospitals,
  getHospitalById,
  updateHospitalStatus,
} = require("../controllers/hospitalOnboardingController");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "..", "uploads", "licenses");
fs.mkdirSync(uploadDir, { recursive: true });

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g, "_");
    cb(null, `${ts}_${safe}`);
  },
});

const upload = multer({ storage });

// Routes
router.post(
  "/onboarding",
  auth,
  upload.single("license"),
  createHospitalOnboarding
);
router.get("/mine", auth, listMyHospitals);
router.get("/:id", auth, getHospitalById);
router.patch("/:id/status", auth, updateHospitalStatus);

module.exports = router;
