const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp_uploads/" });

const {
  getPatientById,
  uploadDocs,
} = require("../controllers/offlineKioskController");

router.get("/patient/:id", getPatientById);
router.post("/upload", upload.array("files"), uploadDocs);

module.exports = router;
