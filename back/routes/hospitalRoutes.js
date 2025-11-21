const express = require("express");
const router = express.Router();

const {
  registerHospital,
  listHospitals,
  classifyHospitalController, 
} = require("../controllers/hospitalController");

// POST → Register hospital partner
router.post("/register", registerHospital);

// GET → List all hospitals
router.get("/list", listHospitals);
router.post("/classify", classifyHospitalController);

module.exports = router;
