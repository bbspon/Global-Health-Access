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
const insuranceRoutes = require('./routes/insuranceRoutes'); // ✅ adjust the path if needed
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
const app = express();
app.use(cors());
app.use(express.json());
const regionPlanRoutes = require("./routes/regionPlanRoutes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.use("/api/auth", authRoutes);

app.use(healthPlanRoutes);

app.use("/api", require("./routes/planCardRoutes"));
app.use("/api", qrRoutes); // ✅ mounts /user/qr → /api/user/qr
app.use("/api", userRoutes); // /my-plan, /purchase, etc
app.use("/api/plans", healthPlanRoutes); // this MUST be present
app.use("/api/terms", planTermsRoutes); // ✅ NEW - Plan Terms
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
app.use("/api/ai-risk", aiDiseaseRiskRoutes);
app.use("/api/health-insights", healthInsightRoutes);
app.use("/api/health-insights-trends", healthInsightsTrendRoutes);
app.use("/api/health", healthIntelligenceRoutes);
app.use("/api/performance-scores", performanceRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/compliance", complianceMainRoutes);
app.use('/api/insurance', insuranceRoutes);            // ✅ mounts the router at /api/insurance
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
app.use("/api/plans", regionPlanRoutes);

app.listen(process.env.PORT || 5000, () =>  
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
