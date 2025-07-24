// routes/regionPlanRoutes.js
const express = require("express");
const router = express.Router();
const { getRegionWisePlans } = require("../controllers/regionPlanController");

router.get("/region-wise", getRegionWisePlans);

module.exports = router;
