const express = require("express");
const router = express.Router();
const { purchasePlan } = require("../controllers/userPlanController");
const auth = require("../middleware/auth"); // must be logged in

router.post("/api/user/plans/purchase", auth, purchasePlan);
router.get("/api/user/my-plan", auth, getMyActivePlan); // 👈 New route

module.exports = router;
