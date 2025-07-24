const express = require("express");
const {
  bookAppointment,
  getUserAppointments,
  getAppointmentsByProvider,
  confirmAppointment,
  createAppointment,
} = require("../controllers/appointmentController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/book", auth, bookAppointment);
router.get("/my", auth, getUserAppointments);
router.get("/provider/:providerId", getAppointmentsByProvider);
router.post("/confirm", auth, confirmAppointment);
router.post("/appointments", createAppointment);

module.exports = router;
