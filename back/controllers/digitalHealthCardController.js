const DigitalHealthCard = require("../models/DigitalHealthCard");

exports.getMyDigitalCard = async (req, res) => {
  try {
    console.log("REQ.USER >>>", req.user);

    let card = await DigitalHealthCard.findOne({ user: req.user._id });
    if (!card) {
      // create a basic card on demand so the frontend doesn't hit 404
      const qrToken = `${req.user._id}-${Date.now()}`;
      card = await DigitalHealthCard.create({
        user: req.user._id,
        name: req.user.name || "",
        planTier: req.user.planTier || "Basic",
        planExpiry: req.user.planExpiry || "",
        coverage: req.user.coverage || {},
        city: req.user.city || "",
        state: req.user.state || "",
        status: "Active",
        qrToken,
        lastRefreshed: new Date(),
      });
      console.log("Auto-created digital card for user", req.user._id);
    }
    res.json(card);
  } catch (err) {
    console.error("getMyDigitalCard error", err);
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
