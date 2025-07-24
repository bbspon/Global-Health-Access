const NGO = require("../models/NGO");
const School = require("../models/School");
const CSR = require("../models/CSR");
const Rural = require("../models/Rural");
const Leaderboard = require("../models/Leaderboard");

exports.getNGOs = async (req, res) => {
  const ngos = await NGO.find();
  res.json(ngos);
};

exports.getSchools = async (req, res) => {
  const schools = await School.find();
  res.json(schools);
};

exports.getCSRs = async (req, res) => {
  const csrs = await CSR.find();
  res.json(csrs);
};

exports.getRurals = async (req, res) => {
  const rurals = await Rural.find();
  res.json(rurals);
};

exports.getLeaderboard = async (req, res) => {
  const board = await Leaderboard.find().sort({ score: -1 });
  res.json(board);
};
exports.getUserPlan = async (req, res) => {
  const { userId } = req.params;

  // Dummy data — replace with real DB query later
  const planData = {
    userId,
    planName: "Basic Care Plan",
    walletBalance: 1250,
    cashbackEarned: 150,
  };

  return res.json(planData);
};

exports.bookAppointment = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  // Dummy logic — replace with DB create logic
  return res.json({
    status: "success",
    message: "Appointment booked successfully",
  });
};

exports.aiHealthCoach = async (req, res) => {
  const { question } = req.body;

  // Dummy AI Response
  const answer = `Based on your query: "${question}", here’s a helpful tip: Eat more greens, hydrate, and consult your doctor.`;

  return res.json({ answer });
};
