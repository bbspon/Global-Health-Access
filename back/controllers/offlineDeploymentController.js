const OfflineDeployment = require("../models/OfflineDeployment");

// Create new deployment entry
exports.createDeployment = async (req, res) => {
  try {
    const newEntry = await OfflineDeployment.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Create failed", error: error.message });
  }
};

// Get all deployments (admin)
exports.getAllDeployments = async (req, res) => {
  try {
    const deployments = await OfflineDeployment.find().populate(
      "partnerId",
      "name email"
    );
    res.status(200).json(deployments);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
};

// Update deployment entry
exports.updateDeployment = async (req, res) => {
  try {
    const updated = await OfflineDeployment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Delete deployment entry
exports.deleteDeployment = async (req, res) => {
  try {
    await OfflineDeployment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
