const express = require("express");
const router = express.Router();
const {
  getAllHealthPlans,
  getPlansForComparison,
  getPlanById,
  checkEligibility,
} = require("../controllers/healthPlanController");

router.get("/api/healthplans", getAllHealthPlans);

router.get("/api/healthplans/compare", getPlansForComparison); // New comparison endpoint

// router.get("/:id", getPlanById);
// router.post("/check-eligibility", checkEligibility);

module.exports = router;
