const CoverageLog = require("../models/CoverageLog");

// ✅ Simulated real-time check (to be replaced with real DB data logic later)
exports.checkCoverage = async (req, res) => {
  try {
    const { userId } = req.query;

    // In future: Fetch user’s plan from DB and run logic
    const result = {
      user: "Fatima Sheikh",
      plan: "Super Premium",
      service: "OPD Consultation",
      status: "Partially Covered",
      copay: "₹300",
      visitsUsed: 5,
      visitsAllowed: 6,
      amountLeft: "₹500",
      nextEligibility: "12 Aug 2025",
    };

    // Save log
    await CoverageLog.create({
      userId,
      service: result.service,
      result,
    });

    res.json(result);
  } catch (error) {
    console.error("Check Coverage Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Admin Simulation Endpoint
exports.simulateCoverage = async (req, res) => {
  try {
    const { plan, service } = req.body;

    let result = {
      status: "Not Covered",
      copay: "₹0",
      visitsAllowed: 0,
      visitsUsed: 0,
      amountLeft: "₹0",
    };

    if (plan === "Super Premium") {
      result = {
        status: "✅ Fully Covered",
        copay: "₹0",
        visitsAllowed: 6,
        visitsUsed: 2,
        amountLeft: "₹4200",
      };
    } else if (plan === "Premium") {
      result = {
        status: "⚠️ Partially Covered",
        copay: "₹250",
        visitsAllowed: 4,
        visitsUsed: 3,
        amountLeft: "₹1200",
      };
    } else if (plan === "Basic") {
      result = {
        status: "❌ Not Covered",
        copay: "₹500",
        visitsAllowed: 2,
        visitsUsed: 2,
        amountLeft: "₹0",
      };
    }

    // Save log
    await CoverageLog.create({
      userId: "ADMIN_SIM",
      service,
      result: { plan, service, ...result },
      source: "admin",
    });

    res.json({ plan, service, ...result });
  } catch (error) {
    console.error("Simulate Coverage Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
