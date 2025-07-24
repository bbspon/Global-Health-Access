const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/aiDiseaseRiskController");

router.post("/predict", auth, controller.submitRiskData);
router.get("/history", auth, controller.getMyRiskHistory);

module.exports = router;
