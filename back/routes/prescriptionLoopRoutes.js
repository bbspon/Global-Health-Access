const express = require("express");
const router = express.Router();
const controller = require("../controllers/prescriptionLoopController");

// Routes
router.get("/:userId", controller.getPrescriptionLoop);
router.post("/", controller.createPrescriptionLoop);
router.put("/:id", controller.updatePrescriptionLoop);
router.delete("/:id", controller.deletePrescriptionLoop);

module.exports = router;
