/**
 * HOSPITAL CLASSIFIER ENGINE
 * Assigns hospital tier dynamically:
 * A = Premium, multi-speciality, >12 departments, ICU, 24x7
 * B = Mid-size, 6–12 departments, OPD+Labs+Pharmacy
 * C = Small facility, basic OPD, small lab
 */

function classifyHospital(hospital) {
  let score = 0;

  const services = hospital.supportedServices || [];

  // Points based on service breadth
  if (services.includes("Emergency")) score += 20;
  if (services.includes("IPD")) score += 15;
  if (services.includes("ICU")) score += 15;
  if (services.includes("Radiology")) score += 10;
  if (services.includes("Labs")) score += 10;
  if (services.includes("Pharmacy")) score += 8;
  if (services.includes("Teleconsultation")) score += 5;

  const deptCount = hospital.departments?.length || 0;

  // Department-based scoring
  if (deptCount >= 12) score += 20;
  else if (deptCount >= 6) score += 10;

  // Final tier assignment
  let tier = "C";
  if (score >= 65) tier = "A";
  else if (score >= 35) tier = "B";

  return { score, tier };
}

module.exports = { classifyHospital };
    