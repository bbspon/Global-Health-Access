// controllers/customerIdentityController.js
const CustomerIdentity = require("../models/CustomerIdentity");

exports.createOrUpdateIdentity = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "User ID missing" });

    const data = {
      fullName: req.body.fullName,
      age: req.body.age,
      bloodGroup: req.body.bloodGroup,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      emergencyContact: req.body.emergencyContact,
      allergies: req.body.allergies,
      medicalHistory: req.body.medicalHistory,
      insuranceProvider: req.body.insuranceProvider,
      insuranceNumber: req.body.insuranceNumber,
      dateOfIssue: req.body.dateOfIssue,
      expiryDate: req.body.expiryDate,
    };

    if (req.files?.photo?.[0]) {
      data.photo = req.files.photo[0].filename;
    }

    if (req.files?.signature?.[0]) {
      data.signature = req.files.signature[0].filename;
    }

    let identity = await CustomerIdentity.findOne({ userId });

    if (identity) {
      identity = await CustomerIdentity.findOneAndUpdate({ userId }, data, {
        new: true,
      });
    } else {
      identity = await CustomerIdentity.create({ userId, ...data });
    }

    res.json({ success: true, identity });
  } catch (err) {
    console.error("Identity Update Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getIdentity = async (req, res) => {
  try {
    const userId = req.params.userId;

    const identity = await CustomerIdentity.findOne({ userId });

    res.json({ success: true, identity });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
