const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const {
  uploadRecord,
  getRecordsByUser,
} = require("../controllers/medicalVaultController");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/medical/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("file"), uploadRecord);
router.get("/", authMiddleware, getRecordsByUser);

module.exports = router;
