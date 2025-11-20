const Beneficiary = require("../models/Beneficiary");

// POST - Create
exports.createBeneficiary = async (req, res) => {
  try {
    const file = req.file ? req.file.filename : "";

    const data = req.body;

    const newBen = await Beneficiary.create({
      beneficiaryId: "BBS-BNF-" + Date.now(),
      createdBy: data.createdBy || "admin",

      name: data.name,
      age: data.age,
      address: data.address,
      bloodGroup: data.bloodGroup,
      volunteerdonor: data.volunteerdonor,
      profileImg: file,

      contactNumber: data.contactNumber,
      emergencyContact: data.emergencyContact,
      allergies: data.allergies,
      email: data.email,

      companyName: data.companyName,
      licenseNumber: data.licenseNumber,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      languagesSpoken: data.languagesSpoken,
      issuingAuthority: data.issuingAuthority,
      customerServicePhone: data.customerServicePhone,
      customerServiceEmail: data.customerServiceEmail,
    });

    res.status(201).json({ success: true, data: newBen });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL
exports.getAllBeneficiaries = async (req, res) => {
  try {
    const list = await Beneficiary.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET by ID
exports.getBeneficiary = async (req, res) => {
  try {
    const item = await Beneficiary.findById(req.params.id);
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.updateBeneficiary = async (req, res) => {
  try {
    const update = req.body;

    if (req.file) {
      update.profileImg = req.file.filename;
    }

    const updated = await Beneficiary.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE
exports.deleteBeneficiary = async (req, res) => {
  try {
    await Beneficiary.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
// GET 1 (By ID)
exports.getBeneficiaryById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Beneficiary.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Beneficiary not found",
      });
    }

    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
