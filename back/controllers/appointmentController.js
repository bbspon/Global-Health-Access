const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  const appointment = await Appointment.create({
    ...req.body,
    userId: req.user._id,
  });
  res.json({ success: true, appointment });
};

exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user._id }).sort({
    appointmentDate: -1,
  });
  res.json(appointments);
};

exports.getAppointmentsByProvider = async (req, res) => {
  const appointments = await Appointment.find({
    providerId: req.params.providerId,
  });
  res.json(appointments);
};
exports.confirmAppointment = async (req, res) => {
  const { appointmentId } = req.body;

  const appointment = await Appointment.findById(appointmentId);
  appointment.status = "confirmed";
  await appointment.save();

  // Optionally notify user or provider
  res.json({ message: "Appointment confirmed", appointment });
};
const deductForAppointment = async (userId, appointmentId, amount) => {
  await axios.post(
    `${process.env.API_URL}/api/wallet/deduct`,
    {
      amount,
      usageType: "appointment",
      referenceId: appointmentId,
      note: "Doctor Appointment Booking",
    },
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
};