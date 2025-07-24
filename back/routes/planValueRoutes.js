const express = require("express");
const router = express.Router();
const {
  calculatePlanValue,
  getPlanValuePresets,
} = require("../controllers/planValueController");
const auth = require("../middleware/authMiddleware");

router.post("/calculate", auth, calculatePlanValue);
router.get("/presets", auth, getPlanValuePresets);

module.exports = router;
