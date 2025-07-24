const express = require("express");
const router = express.Router();
const {
  addHealthRecord,
  getHealthRecordsByPlanId,
} = require("../controllers/healthRecordController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/user-plan/:planId/records", authMiddleware, addHealthRecord);
// Route file
router.get("/user-plan/:id/records", getHealthRecordsByPlanId);

module.exports = router;
