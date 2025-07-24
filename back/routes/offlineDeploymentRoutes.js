const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createDeployment,
  getAllDeployments,
  updateDeployment,
  deleteDeployment,
} = require("../controllers/offlineDeploymentController");

router.post("/create", auth, createDeployment);
router.get("/all", auth, getAllDeployments);
router.put("/update/:id", auth, updateDeployment);
router.delete("/delete/:id", auth, deleteDeployment);

module.exports = router;
