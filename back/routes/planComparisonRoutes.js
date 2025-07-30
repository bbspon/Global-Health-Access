// routes/planComparisonRoutes.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/planComparisonController");

router.get("/:hospitalId", controller.getPlanComparison);
router.post("/", controller.savePlanComparison);

module.exports = router;
