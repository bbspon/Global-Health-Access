const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/healthcarepartners"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload.fields([
  { name: "registrationDoc", maxCount: 1 }, // FIXED
  { name: "clinicLicense", maxCount: 1 },
  { name: "gstCertificate", maxCount: 1 },
  { name: "aadhaarDocument", maxCount: 1 },
  { name: "photos", maxCount: 10 },
  { name: "clinicPhotos", maxCount: 10 }, // multiple images
]);
