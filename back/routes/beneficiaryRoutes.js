const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createBeneficiary,
  getAllBeneficiaries,
  getBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
} = require("../controllers/beneficiaryController");

// Upload directory
const uploadDir = path.join(__dirname, "../uploads/beneficiaries");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES
router.post("/", upload.single("profileImg"), createBeneficiary);
router.get("/", getAllBeneficiaries);
router.get("/:id", getBeneficiary);

router.put("/:id", upload.single("profileImg"), updateBeneficiary);
router.delete("/:id", deleteBeneficiary);

module.exports = router;
