const PlanRenewal = require("../models/PlanRenewal");

exports.renewPlan = async (req, res) => {
 try {
   const {
     userId,
     selectedPlan,
     selectedAddOns,
     paymentMethod,
     coupon,
     autoRenew,
     totalAmount,
   } = req.body;

   if (!userId) {
     return res.status(400).json({ error: "userId is required" });
   }

   const newRenewal = new PlanRenewal({
     userId,
     selectedPlan,
     selectedAddOns,
     paymentMethod,
     coupon,
     autoRenew,
     totalAmount,
   });

   await newRenewal.save();

   res.status(201).json({ message: "Plan renewed successfully" });
 } catch (err) {
   console.error("Renewal error:", err);
   res.status(500).json({ error: "Server error during plan renewal" });
 }
};
