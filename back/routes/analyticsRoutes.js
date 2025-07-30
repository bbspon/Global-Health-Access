const express = require("express");
const router = express.Router();
const { getHospitalAnalytics } = require("../controllers/analyticsController");

router.get("/hospital", getHospitalAnalytics);

module.exports = router;
