const PartnerInquiry = require("../models/PartnerInquiry");

exports.submitInquiry = async (req, res) => {
  try {
    const {
      partnerType,
      accreditation,
      licenseNumber,
      investmentBudget,
      yearsOfExperience,
      fullName,
      email,
      phone,
      city,
      organization,
      message,
    } = req.body;

    const file = req.file;

    const inquiry = new PartnerInquiry({
      partnerType,
      accreditation,
      licenseNumber,
      investmentBudget,
      yearsOfExperience,
      fullName,
      email,
      phone,
      city,
      organization,
      message,
      fileName: file?.originalname || null,
      fileBuffer: file?.buffer || null,
      fileMimeType: file?.mimetype || null,
    });

    await inquiry.save();

    res
      .status(200)
      .json({ success: true, message: "Inquiry submitted successfully!" });
  } catch (err) {
    console.error("❌ Partner Inquiry Submission Failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
