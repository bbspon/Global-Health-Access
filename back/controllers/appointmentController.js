const Appointment = require("../models/Appointment");

// helper: build a Date from "YYYY-MM-DD" + a flexible time string
function buildDateTime(dateStr, slotStr) {
  if (!dateStr) return null;
  const datePart = dateStr.split("T")[0]; // ensure "YYYY-MM-DD"

  const s = (slotStr || "").trim();
  let h = 9, m = 0; // default if needed

  // 1) "10:30 AM" / "10:30 pm"
  let m1 = s.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  // 2) "10 AM" / "7 pm"
  let m2 = s.match(/^(\d{1,2})\s*(am|pm)$/i);
  // 3) "10:30" 24h
  let m3 = s.match(/^(\d{1,2}):(\d{2})$/);
  // 4) just "10" 24h
  let m4 = s.match(/^(\d{1,2})$/);
  // 5) inside text, "10.30" or "10:30" anywhere
  let m5 = s.match(/(\d{1,2})[.:](\d{2})/);

  if (m1) {
    h = +m1[1]; m = +m1[2];
    const ap = m1[3].toLowerCase();
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
  } else if (m2) {
    h = +m2[1];
    const ap = m2[2].toLowerCase();
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
  } else if (m3) {
    h = +m3[1]; m = +m3[2];
  } else if (m4) {
    h = +m4[1];
  } else if (m5) {
    h = +m5[1]; m = +m5[2];
  } else {
    return null; // unsupported format
  }

  const iso = `${datePart}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;
  const dt = new Date(iso); // local time; OK for Mongo
  if (isNaN(dt.valueOf())) return null;
  return dt;
}

exports.getUserAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user._id }).sort({
    dateTime: -1,
  });
  res.json(appointments);
};


exports.getAppointmentsByProvider = async (req, res) => {
  const appointments = await Appointment.find({
    providerId: req.params.providerId,
  }).sort({ dateTime: -1 });
  res.json(appointments);
};
exports.confirmAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) return res.status(404).json({ error: "Not found" });
  appointment.status = "confirmed";
  await appointment.save();
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
      appointmentDate, // "YYYY-MM-DD"
      slot, // free text: "10:30", "10:30 AM", "10.30", etc.
      notes,
      patientName,
    } = req.body || {};

    if (!type || !appointmentDate || !slot) {
      return res
        .status(400)
        .json({ error: "type, appointmentDate and slot are required" });
    }

    const dateTime = buildDateTime(appointmentDate, slot);
    if (!dateTime) {
      return res.status(400).json({
        error:
          "Invalid time format. Use 'HH:mm' or 'h:mm AM/PM' (e.g., 10:30 or 10:30 AM).",
      });
    }

    const appointment = await Appointment.create({
      userId,
      bookingType: type, // map UI 'type' -> schema 'bookingType'
      dateTime, // parsed Date
      patientName: patientName || req.user?.name || "Member",
      providerName,
      doctorName,
      specialization,
      appointmentDate: new Date(appointmentDate), // optional copy
      slot,
      notes,
    });

    return res.status(201).json({
      message: "Appointment booked successfully.",
      appointment,
    });
  } catch (err) {
    console.error("Appointment booking failed", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { bookingType, providerName, dateTime, patientName, sendWhatsapp } =
      req.body;
    const newAppointment = await Appointment.create({
      bookingType,
      providerName,
      dateTime,
      patientName,
      sendWhatsapp,
      userId: req.user?._id,
    });
    res
      .status(201)
      .json({ message: "Appointment booked successfully.", newAppointment });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: "Failed to book appointment." });
  }
};