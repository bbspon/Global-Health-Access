const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultationController");

// POST /api/consultation/save
router.post("/save", consultationController.saveConsultation);

module.exports = router;
