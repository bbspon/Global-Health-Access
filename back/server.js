const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");
const userRoutes = require("./routes/userPlanRoutes");
const healthPlanRoutes = require("./routes/healthPlanRoutes");
const planTermsRoutes = require("./routes/planTermsRoutes"); // ✅ NEW
const walletRoutes = require("./routes/walletRoutes");
const planUsageRoutes = require("./routes/planUsageRoutes");
const planPaymentRoutes = require("./routes/planPaymentRoutes");
const planEligibilityRoutes = require("./routes/planEligibilityRoutes");
const planRenewalRoutes = require("./routes/planRenewalRoutes");
const walletAdminRoutes = require("./routes/walletAdminRoutes");
const razorpayRoutes = require("./routes/razorpayRoutes");
const planValueRoutes = require("./routes/planValueRoutes");
const dynamicPricingRoutes = require("./routes/dynamicPricingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const aiDiseaseRiskRoutes = require("./routes/aiDiseaseRiskRoutes");
const healthInsightRoutes = require("./routes/healthInsightRoutes");
const healthInsightsTrendRoutes = require("./routes/healthInsightsTrendRoutes");
const healthIntelligenceRoutes = require("./routes/healthIntelligenceRoutes");
const performanceRoutes = require("./routes/performanceScoreRoutes");
const complianceRoutes = require("./routes/complianceRoutes");
const complianceMainRoutes = require("./routes/complianceMainRoutes");
const insuranceRoutes = require("./routes/insuranceRoutes"); // ✅ adjust the path if needed
const interopGovRoutes = require("./routes/interopGovRoutes");
const unifiedAPIRoutes = require("./routes/unifiedAPIRoutes");
const familyMemberRoutes = require("./routes/familyMemberRoutes");
const familyHealthTimelineRoutes = require("./routes/familyHealthTimelineRoutes");
const familyDashboardRoutes = require("./routes/familyDashboardRoutes");
const healthRecordRoutes = require("./routes/healthRecordRoutes");
const medicalVaultRoutes = require("./routes/medicalVaultRoutes");
const prescriptionLoopRoutes = require("./routes/prescriptionLoopRoutes");
const healthCoachRoutes = require("./routes/healthCoachRoutes");
const offlineRoutes = require("./routes/offlineKioskRoutes");
const emergencySOSRoutes = require("./routes/emergencySOSRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const userFeedbackRoutes = require("./routes/userFeedbackRoutes");
const offlineDeploymentRoutes = require("./routes/offlineDeploymentRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const homeVisitRoutes = require("./routes/homeVisitRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const wellnessRoutes = require("./routes/wellnessRoutes");
const healthObjectiveRoutes = require("./routes/healthObjectiveRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const healthIdCardRoutes = require("./routes/healthIdCardRoutes");
const digitalCardRoutes = require("./routes/digitalHealthCardRoutes");
const qrHealthpassRoutes = require("./routes/qrHealthPassRoutes");
const profileShareRoutes = require("./routes/profileShareRoutes");
const ecosystemRoutes = require("./routes/ecosystemRoutes");
const healthAccessAPIRoutes = require("./routes/healthAccessAPI");
const serviceAvailabilityRoutes = require("./routes/serviceAvailabilityRoutes");
const supportTicketRoutes = require("./routes/supportTicketRoutes");
const staffRoutes = require("./routes/staffRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const planComparisonRoutes = require("./routes/planComparisonRoutes");
const partnerInquiryRoutes = require("./routes/partnerInquiryRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const coverageRoutes = require("./routes/coverageRoutes");
const carePassRoutes = require("./routes/carePassRoutes");
const regionRoutes = require("./routes/regionRoutes");
const beneficiaryRoutes = require("./routes/beneficiaryRoutes");
const path = require("path");
const pricingRoutes = require("./routes/pricingRoutes");
const eligibilityRoutes = require("./routes/eligibilityRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const settlementRoutes = require("./routes/settlementRoutes");
const customerIdentityRoutes = require("./routes/customerIdentityRoutes");
const healthAccessContactRoutes = require("./routes/healthAccessContactRoutes");
const hospitalPlanTierRoutes = require("./routes/hospitalPlanTierRoutes");

const app = express();
app.use(cors());
app.use(express.json());
console.log("Mongo URI (for debug):", process.env.MONGO_URI);

mongoose
  .connect(process.env.HEALTHCARE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to bbshealthcare (Default DB)");

    // simple seeding for medicines so the pharmacy page isn't empty
    try {
      const Medicine = require("./models/Medicine");
      const count = await Medicine.countDocuments();
      if (count === 0) {
        await Medicine.insertMany([
          { name: "Paracetamol 500mg", price: 20, stock: 100 },
          { name: "Cetirizine 10mg", price: 35, stock: 50 },
          { name: "Amoxicillin 250mg", price: 120, stock: 25 },
        ]);
        console.log("🔁 Seeded default medicines");
      }
    } catch (seedErr) {
      console.error("Error seeding medicines", seedErr);
    }
  })
  .catch((err) => console.error("❌ Main DB error:", err));

// ✅ Export the healthcare DB for use in models
app.use("/api/auth", authRoutes);

app.use(healthPlanRoutes);

app.use("/api", require("./routes/planCardRoutes"));
app.use("/api", qrRoutes); // ✅ mounts /user/qr → /api/user/qr
app.use("/api/user", userRoutes); // /my-plan, /purchase, etc
app.use("/api/plans", healthPlanRoutes); // this MUST be present
app.use("/api/plans/terms", planTermsRoutes);
app.use("/api/user", require("./routes/purchaseSummaryRoutes"));
app.use("/api/user", walletRoutes);
app.use("/api", planUsageRoutes);
app.use("/api/plan", planPaymentRoutes);
app.use("/api/plan", planEligibilityRoutes);
app.use("/api/plan", planRenewalRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/wallet", walletAdminRoutes);
// app.use("/api/razorpay", razorpayRoutes);
app.use("/api/plan-value", planValueRoutes);
app.use("/api/plan-dynamic", dynamicPricingRoutes);
app.use("/api/feedback", feedbackRoutes);

// simple pharmacy / medicines endpoint used by the React frontend
// (returns DB entries or a few hard‑coded items when empty)
app.use("/api/medicines", require("./routes/medicineRoutes"));
app.use("/api/ai-risk", aiDiseaseRiskRoutes);
app.use("/api/health-insights", healthInsightRoutes);
app.use("/api/health-insights-trends", healthInsightsTrendRoutes);
app.use("/api/health", healthIntelligenceRoutes);
app.use("/api/performance-scores", performanceRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/compliance", complianceMainRoutes);
app.use("/api/insurance", insuranceRoutes); // ✅ mounts the router at /api/insurance
app.use("/api/interop-gov", interopGovRoutes);
app.use("/api/unified-api", unifiedAPIRoutes);
app.use("/api", familyMemberRoutes);
app.use("/api/family-health-timeline", familyHealthTimelineRoutes);
app.use("/api/family-dashboard", familyDashboardRoutes);
app.use("/api", healthRecordRoutes);
app.use("/api/medical-vault", medicalVaultRoutes);
app.use("/api/prescription-loop", prescriptionLoopRoutes);
app.use("/api/coach-data", healthCoachRoutes);
app.use("/api/kiosk", offlineRoutes);
app.use("/api/emergency", emergencySOSRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/feedback", userFeedbackRoutes);
app.use("/api/grievance", require("./routes/grievanceRoutes"));
app.use("/api/hospital-bills", require("./routes/hospitalBillRoutes"));

app.use("/api/offline-deployment", offlineDeploymentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api", homeVisitRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/health-objective", healthObjectiveRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/qr", healthIdCardRoutes);
app.use("/api/card", digitalCardRoutes);
app.use("/api/qr", qrHealthpassRoutes);
app.use("/api/health-passport", require("./routes/healthPassportRoutes"));
app.use("/api/public-profile", profileShareRoutes);
app.use("/api/ecosystem", ecosystemRoutes);
app.use("/api/health-plans", healthPlanRoutes);
app.use("/api/health-access", healthAccessAPIRoutes);
app.use("/api/service-availability", serviceAvailabilityRoutes);
app.use("/api", supportTicketRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/plancomparison", planComparisonRoutes);
app.use("/api/partner-inquiry", partnerInquiryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/coverage", coverageRoutes);
app.use("/api/carepass", carePassRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/beneficiary", beneficiaryRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/health-access/contact", healthAccessContactRoutes);
app.use("/api/hospitals", require("./routes/hospitalOnboardingRoutes"));
app.use("/api/labs", require("./routes/labRoutes"));
app.use("/api", hospitalPlanTierRoutes);

app.use("/api/settlements", settlementRoutes);
app.use("/api/customer-identity", customerIdentityRoutes);

app.use("/api/auth-debug", require("./routes/authDebug"));
app.use(
  "/api/healthcare-partners",
  require("./routes/healthcarePartnerRoutes")
);
app.use(
  "/uploads/beneficiaries",
  express.static(path.join(__dirname, "uploads/beneficiaries"))
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/downloads", express.static(path.join(__dirname, "public/downloads")));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
