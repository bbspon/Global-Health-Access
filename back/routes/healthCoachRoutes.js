// routes/healthCoachRoutes.js
const express = require("express");
const router = express.Router();
const healthCoachController = require("../controllers/healthCoachController");

// GET data by userId
router.get("/:userId", healthCoachController.getCoachDataByUserId);

// POST or PUT to add/update data
router.post("/", healthCoachController.addOrUpdateCoachData);

module.exports = router;
