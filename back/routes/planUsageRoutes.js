// routes/planUsageRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserPlanUsage,
  resetUserUsage,
  getAllUserPlanUsages,
} = require("../controllers/planUsageController");
const auth = require("../middleware/authMiddleware");

router.get("/user/plan-usage", auth, getUserPlanUsage);
router.post("/user/plan-usage/reset", auth, resetUserUsage);
router.get("/plan-usage/details", auth, getAllUserPlanUsages);

module.exports = router;
