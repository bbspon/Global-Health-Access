const express = require("express");
const router = express.Router();
const Wellness = require("../models/Wellness");

// GET wellness data
router.get("/", async (req, res) => {
  const data = await Wellness.findOne({ userId: "demo" });
  if (!data) {
    const newData = await Wellness.create({ userId: "demo" });
    return res.json(newData);
  }
  res.json(data);
});

// POST steps
router.post("/steps", async (req, res) => {
  const { steps } = req.body;
  const updated = await Wellness.findOneAndUpdate(
    { userId: "demo" },
    { steps },
    { new: true }
  );
  res.json(updated);
});

// POST meal log
router.post("/meal", async (req, res) => {
  const user = await Wellness.findOne({ userId: "demo" });
  user.mealsLogged += 1;
  await user.save();
  res.json(user);
});

module.exports = router;
