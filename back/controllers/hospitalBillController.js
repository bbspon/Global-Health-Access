// back/controllers/hospitalBillController.js
const HospitalBill = require("../models/HospitalBill");

// POST /api/hospital-bills
exports.createBill = async (req, res) => {
  try {
    const { patientId, serviceProvided, amount, notes } = req.body || {};

    if (!patientId || !serviceProvided || amount === undefined) {
      return res
        .status(400)
        .json({
          message: "patientId, serviceProvided, and amount are required",
        });
    }

    const payload = {
      patientId: String(patientId).trim(),
      serviceProvided: String(serviceProvided).trim(),
      amount: Number(amount),
      createdBy: req.user._id, // from auth middleware
      hospitalId: req.user.hospitalId || undefined, // if your hospital admins carry this field
      notes: notes || undefined,
    };

    const bill = await HospitalBill.create(payload);
    return res.status(201).json({ message: "Bill submitted", bill });
  } catch (err) {
    console.error("Create bill error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET /api/hospital-bills/mine  (bills created by the logged-in user)
exports.listMyBills = async (req, res) => {
  const bills = await HospitalBill.find({ createdBy: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(bills);
};

// GET /api/hospital-bills/by-patient/:patientId
exports.listByPatient = async (req, res) => {
  const bills = await HospitalBill.find({
    patientId: req.params.patientId,
  }).sort({ createdAt: -1 });
  res.json(bills);
};

// PATCH /api/hospital-bills/:id/status  (approve/reject/settle)
exports.updateStatus = async (req, res) => {
  const { status } = req.body || {};
  if (!["approved", "rejected", "settled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const bill = await HospitalBill.findByIdAndUpdate(
    req.params.id,
    { $set: { status } },
    { new: true }
  );
  if (!bill) return res.status(404).json({ message: "Bill not found" });
  res.json({ message: "Status updated", bill });
};
