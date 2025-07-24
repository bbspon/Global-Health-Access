const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insuranceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", insuranceController.getAllInsurancePartners);
router.post("/add", insuranceController.addInsurancePartner);
router.get('/plans', insuranceController.getAllPlans);
router.get("/user-policy", authMiddleware, insuranceController.getUserPolicy);
router.put(
  "/user-policy/auto-renew",
  authMiddleware,
  insuranceController.toggleAutoRenew
);
router.post("/purchase", authMiddleware, insuranceController.purchasePolicy); 
module.exports = router;
