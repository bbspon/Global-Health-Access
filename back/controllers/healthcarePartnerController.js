const HealthcarePartner = require("../models/HealthcarePartner");
const generatePartnerCode = require("../utils/generatePartnerCode");

exports.registerHealthcarePartner = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      aadhaar,
      pan,
      gender,
      dateOfBirth,
      clinicName,
      clinicType,
      platform,
      registrationNumber,
      gstin,
      clinicAddress,
      country,
      state,
      district,
      city,
      pincode,
      supportedServices,
      supportedPlanTiers,
      commissionRates,
      referralCodeForHospital,
      assignedFranchiseId,
      assignedAgentId,
      geoLocation,
    } = req.body;

    const partnerCode = await generatePartnerCode(state, district);

    const registrationDocumentUrl =
      req.files["registrationDocument"]?.[0]?.filename || "";
    const clinicLicenseUrl = req.files["clinicLicense"]?.[0]?.filename || "";
    const gstCertificateUrl = req.files["gstCertificate"]?.[0]?.filename || "";
    const aadhaarDocumentUrl =
      req.files["aadhaarDocument"]?.[0]?.filename || "";

    const photos = (req.files["photos"] || []).map((f) => f.filename);

    const partner = await HealthcarePartner.create({
      fullName,
      email,
      phone,
      aadhaar,
      pan,
      gender,
      dateOfBirth,
      clinicName,
      clinicType,
      platform,
      registrationNumber,
      gstin,
      clinicAddress,
      country,
      state,
      district,
      city,
      pincode,
      supportedServices,
      supportedPlanTiers,
      commissionRates,
      referralCodeForHospital,
      assignedFranchiseId,
      assignedAgentId,
      geoLocation,
      registrationDocumentUrl,
      clinicLicenseUrl,
      gstCertificateUrl,
      aadhaarDocumentUrl,
      photos,
      partnerCode,
      createdBy: req.user?.id,
    });

    res.status(201).json({ success: true, partner });
  } catch (err) {
    console.error("Register Partner Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getHealthcarePartners = async (req, res) => {
  try {
    const {
      search,
      state,
      district,
      city,
      clinicType,
      partnerType,
      hospitalTier,
    } = req.query;

    let filter = {};

    if (search) {
      filter.clinicName = { $regex: search, $options: "i" };
    }

    if (state) filter.state = state;
    if (district) filter.district = district;
    if (city) filter.city = city;
    if (clinicType) filter.clinicType = clinicType;
    if (partnerType) filter.partnerType = partnerType;

    // Your model uses "tier", not "hospitalTier"
    if (hospitalTier) filter.tier = hospitalTier;

    const partners = await HealthcarePartner.find(filter).sort({
      createdAt: -1,
    });

    res.json({ success: true, partners });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updatePartnerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const partner = await HealthcarePartner.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, partner });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    await HealthcarePartner.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
