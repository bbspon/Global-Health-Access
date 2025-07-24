const express = require("express");
const router = express.Router();
const {
  getAllPlans,
  getUserPlans,
  purchasePlan,
} = require("../controllers/planCardController");
const auth = require("../middleware/authMiddleware");

// Public: Get all plans for display (web)
router.get("/plans", getAllPlans);

// Protected: Get user’s purchased plans (mobile)
router.get("/user/plans", auth, getUserPlans);
router.post('/user/purchase', auth, purchasePlan); // 👈 NEW

module.exports = router;
