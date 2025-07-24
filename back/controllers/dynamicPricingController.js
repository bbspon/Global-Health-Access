// controllers/dynamicPricingController.js
const DynamicPriceRequest = require("../models/DynamicPriceRequest");

exports.calculatePrice = async (req, res) => {
  try {
    const {
      city,
      hospitalTier,
      selectedModules,
      durationMonths,
      referralCode,
      userId,
    } = req.body;

    // Dummy pricing logic (replace with actual later)
    let basePrice = 1000;
    if (hospitalTier === "Tier 1") basePrice += 500;
    if (hospitalTier === "Tier 2") basePrice += 300;
    if (hospitalTier === "Tier 3") basePrice += 100;

    basePrice += selectedModules.length * 200;
    basePrice *= durationMonths / 12;

    if (referralCode) basePrice *= 0.95; // 5% discount

    const newRecord = new DynamicPriceRequest({
      city,
      hospitalTier,
      selectedModules,
      durationMonths,
      referralCode,
      userId,
      calculatedPrice: basePrice,
    });

    await newRecord.save();
    res.status(200).json({ success: true, price: basePrice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
