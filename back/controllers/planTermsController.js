// controllers/planTermsController.js
const PlanTermsAcceptance = require("../models/PlanTermsAcceptance");

exports.acceptTerms = async (req, res) => {
  try {
    const { planId, signature, version, device } = req.body;
    const user = req.user;

    // console.log("Incoming request:", req.body, user);

    // Defensive validation
    if (!planId || !signature || !version || !device) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to database
    const newAcceptance = new PlanTermsAcceptance({
      user: user._id,
      plan: planId,
      signature,
      version,
      device,
      acceptedAt: new Date(),
    });

    await newAcceptance.save();

    res.status(201).json({ message: "Terms accepted successfully." });
  } catch (error) {
    console.error("❌ Error in acceptTerms:", error); // <-- check terminal for actual error
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserAcceptance = async (req, res) => {
  try {
    const { userId } = req.user;
    const acceptances = await PlanTermsAcceptance.find({ userId }).populate(
      "planId"
    );
    res.status(200).json({ data: acceptances });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch acceptance history", error });
  }
};
exports.getPlanTerms = async (req, res) => {
  try {
    const { planId } = req.params;

    // For now you don't have a Plan model with terms stored.
    // So we return dummy terms until you add DB storage.

    const dummyTerms = `
    These are the Terms & Conditions for plan ID: ${planId}.

    1. This is sample content.
    2. You can replace this with real plan terms later.
    3. Acceptance will be tracked in PlanTermsAcceptance collection.
    `;

    return res.json({
      planId,
      termsText: dummyTerms,
    });
  } catch (error) {
    console.error("Get Plan Terms Error:", error);
    return res.status(500).json({ message: "Unable to load terms" });
  }
};
