// controllers/regionPlanController.js
exports.getRegionWisePlans = (req, res) => {
  const { country, city } = req.query;

  if (!country || !city) {
    return res.status(400).json({ error: "Country and City are required" });
  }

  // Dummy plan data (replace with DB query later)
  const regionData = {
    India: {
      Chennai: {
        plans: [
          {
            name: "Basic",
            price: "₹499",
            features: ["OPD Access", "Lab Discounts"],
          },
          {
            name: "Premium",
            price: "₹1499",
            features: ["IPD", "Dental", "Ayurveda"],
          },
        ],
        hospitals: [
          {
            name: "Sunrise Hospital",
            city: "Chennai",
            tier: "Premium",
            services: ["OPD", "IPD"],
          },
          {
            name: "MediCare",
            city: "Chennai",
            tier: "Basic",
            services: ["OPD", "Labs"],
          },
        ],
      },
    },
    UAE: {
      Dubai: {
        plans: [
          {
            name: "Basic",
            price: "AED 99",
            features: ["OPD Access", "Online Consultation"],
          },
          {
            name: "Elite",
            price: "AED 249",
            features: ["IPD", "Dental", "Vision"],
          },
        ],
        hospitals: [
          {
            name: "Dubai HealthCare City",
            city: "Dubai",
            tier: "Elite",
            services: ["OPD", "IPD", "Dental"],
          },
          {
            name: "Al Noor Hospital",
            city: "Dubai",
            tier: "Basic",
            services: ["OPD"],
          },
        ],
      },
    },
  };

  const result = regionData[country]?.[city];

  if (!result) {
    return res
      .status(404)
      .json({ error: "No plans found for selected country and city" });
  }

  res.json(result);
};
