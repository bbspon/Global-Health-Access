const express = require("express");
const router = express.Router();
const {
  getHealthObjectiveContent,
  createOrUpdateHealthObjective,
} = require("../controllers/healthObjectiveController");
const auth = require("../middleware/auth"); // Optional: restrict update to admin

router.get("/", getHealthObjectiveContent);
router.post("/update", auth, createOrUpdateHealthObjective); // Admin route

module.exports = router;
