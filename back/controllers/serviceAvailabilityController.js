const ServiceAvailability = require("../models/serviceAvailabilityModel");

exports.getAllAvailability = async (req, res) => {
  try {
    const data = await ServiceAvailability.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};

exports.addAvailability = async (req, res) => {
  try {
    const { department, daysAvailable, timeSlot, hospitalId } = req.body;
    const newEntry = new ServiceAvailability({
      department,
      daysAvailable,
      timeSlot,
      hospitalId,
    });
    await newEntry.save();
    res.status(201).json({ message: "Service added", entry: newEntry });
  } catch (err) {
    res.status(500).json({ error: "Creation failed" });
  }
};
