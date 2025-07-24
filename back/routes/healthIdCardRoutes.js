const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const healthIdCardController = require("../controllers/healthIdCardController");

router.get(
  "/my-health-id",
  authMiddleware,
  healthIdCardController.getMyHealthId
);
router.post(
  "/generate",
  authMiddleware,
  healthIdCardController.generateHealthId
);

module.exports = router;
