const express = require("express");
const router = express.Router();
const {
  getAllHealthPlans,
  getPlansForComparison,
  getPlanById,
  getPlans,
  enrollPlan,
} = require("../controllers/healthPlanController");

router.get("/api/healthplans", getAllHealthPlans);

router.get("/api/healthplans/compare", getPlansForComparison); // New comparison endpoint

router.get("/:id", getPlanById); // /api/plans/:id
// router.post("/check-eligibility", checkEligibility);
router.get("/api/health-plans/list", getPlans);
router.post("/enroll",enrollPlan);
module.exports = router;
