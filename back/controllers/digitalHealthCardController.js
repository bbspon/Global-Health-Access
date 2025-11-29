const DigitalHealthCard = require("../models/DigitalHealthCard");

exports.getMyDigitalCard = async (req, res) => {
  try {
    console.log("REQ.USER >>>", req.user); // 👈 ADD THIS

    const card = await DigitalHealthCard.findOne({ user: req.user._id });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.refreshQrToken = async (req, res) => {
  try {
    const qrToken = `${req.user._id}-${Date.now()}`;
    const updated = await DigitalHealthCard.findOneAndUpdate(
      { user: req.user._id },
      { qrToken, lastRefreshed: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "No card to update" });
    res.json({ qrToken });
  } catch (err) {
    res.status(500).json({ error: "Failed to refresh QR" });
  }
};
