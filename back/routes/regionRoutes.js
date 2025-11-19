const express = require("express");
const router = express.Router();
const {
  getPlansByRegion,
  getHospitalsByRegion,
  getAllHospitals,
} = require("../controllers/regionPlanController");

router.get("/plans", getPlansByRegion); // GET /api/region/plans
router.get("/hospitals", getHospitalsByRegion); // GET /api/region/hospitals
router.get("/hospitals/all", getAllHospitals); 

module.exports = router;
