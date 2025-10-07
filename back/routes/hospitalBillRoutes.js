// back/routes/hospitalBillRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBill,
  listMyBills,
  listByPatient,
  updateStatus,
} = require("../controllers/hospitalBillController");

// Hospital staff submits a bill
router.post("/", auth, createBill);

// Staff can see their own submissions
router.get("/mine", auth, listMyBills);

// Search bills by patient id (protect as needed)
router.get("/by-patient/:patientId", auth, listByPatient);

// Update status (protect with role if you have it)
router.patch("/:id/status", auth, updateStatus);

module.exports = router;
