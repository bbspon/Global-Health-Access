const express = require("express");
const router = express.Router();
const controller = require("../controllers/serviceAvailabilityController");

router.get("/", controller.getAllAvailability);
router.post("/add", controller.addAvailability);

module.exports = router;
