const express = require("express");
const router = express.Router();
const {
  purchasePlan,
  getMyPlan,
  buyPlanController,
} = require("../controllers/userPlanController");
const auth = require("../middleware/authMiddleware"); // must be logged in
console.log("✅ Loaded userRoutes with /user/my-plan");

router.post("/api/user/plans/purchase", auth, purchasePlan);
router.get("/user/my-plan", auth, getMyPlan); // ✅ valid
router.post("/purchase", auth, buyPlanController);

module.exports = router;
