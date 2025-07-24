const express = require("express");
const router = express.Router();
const {
  getAllStatuses,
  addStatus,
} = require("../controllers/complianceController");
const authMiddleware = require("../middleware/authMiddleware"); // optional

router.get("/", authMiddleware,getAllStatuses);
router.post("/", authMiddleware,addStatus);

module.exports = router;
