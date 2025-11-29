// controllers/staffController.js
const Staff = require("../models/Staff");

// GET all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new staff
exports.createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE staff by ID
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate update fields
    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.role) updateData.role = req.body.role;
    if (req.body.status) updateData.status = req.body.status;

    // Update record
    const staff = await Staff.findByIdAndUpdate(id, updateData, { new: true });

    // If not found
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // SUCCESS RESPONSE
    return res.status(200).json({
      message: "Staff updated successfully",
      staff,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      error: "Server error during staff update",
      details: error.message,
    });
  }
};


// DELETE staff by ID
exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
