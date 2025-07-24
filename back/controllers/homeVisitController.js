const HomeVisit = require("../models/HomeVisit");

exports.bookHomeVisit = async (req, res) => {
  try {
    const { serviceType, slot, address, userId, paymentStatus } = req.body;

    if (!serviceType || !slot || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new HomeVisit({
      serviceType,
      slot,
      address,
      userId: userId || null,
      paymentStatus: paymentStatus || "Pending",
    });

    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllHomeVisits = async (req, res) => {
  try {
    const bookings = await HomeVisit.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};
    