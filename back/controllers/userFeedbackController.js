// controllers/userFeedbackController.js
const UserFeedback = require("../models/UserFeedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { emoji, category, comment, rating, anonymous, partnerId } = req.body;

    const newFeedback = new UserFeedback({
      emoji,
      category,
      comment,
      rating,
      anonymous,
      partnerId: partnerId || null,
      image: req.file ? req.file.filename : null,
      userId: req.user._id,
    });

    await newFeedback.save();

    console.log("✅ Feedback saved:", newFeedback);
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("❌ Submit feedback error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await UserFeedback.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    console.error("Get Feedback Error:", error);
    res.status(500).json({ message: "Unable to fetch feedback" });
  }
};
