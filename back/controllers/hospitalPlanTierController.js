const HospitalPlanTier = require("../models/HospitalPlanTier");

exports.createPlanTier = async (req, res) => {
    try {
        const { planName, coverageDetails } = req.body;

        if (!planName || !coverageDetails) {
            return res.status(400).json({
                success: false,
                message: "Plan name and coverage details are required",
            });
        }

        const planTier = await HospitalPlanTier.create({
            planName,
            coverageDetails,
            createdBy: req.user?.id || null,
        });

        res.status(201).json({
            success: true,
            message: "Plan tier created successfully",
            data: planTier,
        });
    } catch (error) {
        console.error("Create Plan Tier Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating plan tier",
        });
    }
};
