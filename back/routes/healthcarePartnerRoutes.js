const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadHealthcarePartner");
const auth = require("../middleware/auth");
const {
  registerHealthcarePartner,
  getHealthcarePartners,
  updatePartnerStatus,
  deletePartner,
} = require("../controllers/healthcarePartnerController");

router.post("/", auth, upload, registerHealthcarePartner);
router.get("/", auth, getHealthcarePartners);
router.patch("/:id/status", auth, updatePartnerStatus);
router.delete("/:id", auth, deletePartner);

module.exports = router;
