const express = require("express");
const router = express.Router();
const {
    createPlanTier,
} = require("../controllers/hospitalPlanTierController");
const authMiddleware = require("../middleware/authMiddleware");

// Create custom plan tier
router.post(
    "/hospital/plan-tiers",
    authMiddleware,
    createPlanTier
);

module.exports = router;
