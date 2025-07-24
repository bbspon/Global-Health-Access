const express = require("express");
const router = express.Router();
const { renewPlan } = require("../controllers/planRenewalController");
const authMiddleware = require("../middleware/auth");

router.post("/renew", authMiddleware, renewPlan);

module.exports = router;
