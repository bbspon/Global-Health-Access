const EmergencyLog = require("../models/EmergencyLog");
const Hospital = require("../models/Hospital"); // Assuming you have this model

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const triggerSOS = async (req, res) => {
  const { lat, lng, address } = req.body;
  const userId = req.user._id;

  const hospitals = await Hospital.find(); // All listed partner hospitals

  // Find nearest
  let nearest = null;
  let minDist = Infinity;
  for (let hospital of hospitals) {
    const dist = haversineDistance(
      lat,
      lng,
      hospital.location.lat,
      hospital.location.lng
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = hospital;
    }
  }

  const log = await EmergencyLog.create({
    userId,
    location: { lat, lng, address },
    nearestHospital: nearest
      ? {
          name: nearest.name,
          phone: nearest.phone,
          location: nearest.location,
        }
      : null,
  });

  res.json({ message: "SOS triggered", hospital: nearest });
};

module.exports = { triggerSOS };
