const express = require("express");
const multer = require("multer");
const router = express.Router();
const partnerInquiryController = require("../controllers/partnerInquiryController");

const upload = multer(); // Memory storage for fileBuffer

router.post(
  "/submit",
  upload.single("file"),
  partnerInquiryController.submitInquiry
);

module.exports = router;
