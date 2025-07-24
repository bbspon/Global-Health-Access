const Grievance = require("../models/grievanceModel");

// Submit grievance
exports.submitGrievance = async (req, res) => {
  try {
    const { type, title, description, partnerId } = req.body;

    const newGrievance = new Grievance({
      userId: req.user._id,
      type,
      title,
      description,
      partnerId: partnerId || null,
      image: req.file ? req.file.filename : null,
    });

    await newGrievance.save();
    res.status(201).json({ message: "Grievance submitted successfully" });
  } catch (error) {
    console.error("Grievance submit error:", error);
    res.status(500).json({ message: "Failed to submit grievance" });
  }
};

// Get all grievances for admin
exports.getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().populate("userId", "name email");
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grievances" });
  }
};

// Update grievance status + admin reply
exports.updateGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    const grievance = await Grievance.findByIdAndUpdate(
      id,
      { status, adminReply },
      { new: true }
    );

    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: "Error updating grievance" });
  }
};
