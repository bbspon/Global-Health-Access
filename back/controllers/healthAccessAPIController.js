

exports.checkEligibility = async (req, res) => {
  try {
    const { userId, hospitalId } = req.body;

    if (!userId || !hospitalId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Dummy response
    return res.status(200).json({
      status: 200,
      message: "Patient is eligible for BBSCART Platinum Plan",
      plan: "Platinum",
      validTill: "2025-12-31",
    });
  } catch (error) {
    console.error("Eligibility Check Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.regenerateApiKey = async (req, res) => {
  try {
    const newKey = "NEW-KEY-" + Math.floor(100000 + Math.random() * 900000);
    return res.status(200).json({ apiKey: newKey });
  } catch (error) {
    console.error("API Key Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.uploadNGOCSV = async (req, res) => {
  try {
    // Dummy upload simulation
    return res.status(200).json({
      message: "✅ Upload successful. 52 beneficiaries issued plans.",
    });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
