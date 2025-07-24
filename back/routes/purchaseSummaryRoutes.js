const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/purchaseSummaryController");

router.post("/summary", auth, controller.savePurchaseSummary);
router.get("/summary", auth, controller.getMyPurchaseSummary);
router.get("/by-plan/:planId", auth, controller.getSummariesByPlan);

module.exports = router;
