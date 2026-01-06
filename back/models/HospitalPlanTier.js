const mongoose = require("mongoose");

const HospitalPlanTierSchema = new mongoose.Schema(
    {
        planName: {
            type: String,
            required: true,
            trim: true,
        },
        coverageDetails: {
            type: String,
            required: true,
        },

        // future-ready fields
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "HospitalPlanTier",
    HospitalPlanTierSchema
);
