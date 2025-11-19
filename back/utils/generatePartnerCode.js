const moment = require("moment");
const HealthcarePartner = require("../models/HealthcarePartner");

async function generatePartnerCode(state, district) {
  const date = moment().format("YYYYMMDD");

  // Count partners for today
  const count = await HealthcarePartner.countDocuments({
    partnerCode: { $regex: date },
  });

  const serial = (count + 1).toString().padStart(5, "0");

  return `HP-${state}-${district}-${date}-${serial}`;
}

module.exports = generatePartnerCode;
