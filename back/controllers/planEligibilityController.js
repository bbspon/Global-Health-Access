// controllers/planEligibilityController.js
exports.checkEligibility = async (req, res) => {
  try {
    const { age, city, planType } = req.body;

    if (!age || !city || !planType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedAge = parseInt(age);
    const cityLower = city.toLowerCase();

    // Mock logic — adjust for your real eligibility rules
    let eligible = true;
    let reason = "";

    if (parsedAge < 18) {
      eligible = false;
      reason = "Minimum age is 18.";
    }

    const bannedCities = ["nowhere", "banexample"];
    if (bannedCities.includes(cityLower)) {
      eligible = false;
      reason = "Service not available in this location.";
    }

    if (eligible) {
      return res.status(200).json({
        eligible: true,
        message: `You are eligible for the ${planType.toUpperCase()} plan.`,
      });
    } else {
      return res.status(200).json({
        eligible: false,
        message: `Not eligible: ${reason}`,
      });
    }
  } catch (err) {
    console.error("Eligibility check failed:", err);
    res.status(500).json({ message: "Server error during eligibility check." });
  }
};
