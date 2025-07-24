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

exports.bookAppointment = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      type,
      providerName,
      doctorName,
      specialization,
      appointmentDate,
      slot,
      notes,
    } = req.body;

    const appointment = new Appointment({
      userId,
      type,
      providerName,
      doctorName,
      specialization,
      appointmentDate,
      slot,
      notes,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (err) {
    console.error("Appointment booking failed", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createAppointment = async (req, res) => {
  try {
    const { bookingType, providerName, dateTime, patientName, sendWhatsapp } =
      req.body;

    const newAppointment = new Appointment({
      bookingType,
      providerName,
      dateTime,
      patientName,
      sendWhatsapp,
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Failed to book appointment." });
  }
};