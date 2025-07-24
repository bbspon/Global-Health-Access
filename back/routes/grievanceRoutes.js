const express = require("express");
const router = express.Router();
const {
  submitGrievance,
  getAllGrievances,
  updateGrievance,
} = require("../controllers/grievanceController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware"); // for image upload

// User submits grievance
router.post("/submit", authMiddleware, upload.single("image"), submitGrievance);

// Admin views all
router.get("/all", authMiddleware, getAllGrievances);

// Admin updates status
router.put("/update/:id", authMiddleware, updateGrievance);

module.exports = router;
