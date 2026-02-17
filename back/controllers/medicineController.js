const Medicine = require("../models/Medicine");

// Return list of available medicines. If the collection is empty we
// also return a few hard‑coded examples so the frontend doesn't break
// during early development.
exports.getMedicines = async (req, res) => {
  try {
    let meds = await Medicine.find();
    if (!meds || meds.length === 0) {
      // fallback sample data
      meds = [
        { name: "Paracetamol 500mg", price: 20, stock: 100 },
        { name: "Cetirizine 10mg", price: 35, stock: 50 },
        { name: "Amoxicillin 250mg", price: 120, stock: 25 },
      ];
    }
    res.json({ success: true, medicines: meds });
  } catch (err) {
    console.error("medicineController.getMedicines error", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
