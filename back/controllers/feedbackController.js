// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Attach from token middleware

    const { type, rating, tags, comment, image, submittedAt, referenceId } =
      req.body;

    const feedback = new Feedback({
      userId,
      type,
      rating,
      tags,
      comment,
      image,
      referenceId,
      submittedAt: submittedAt || new Date(),
    });

    await feedback.save();

    res.status(200).json({
      success: true,
      message: "Feedback submitted",
      data: feedback,
    });
  } catch (error) {
    console.error("Submit feedback error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "name email")
      .sort({ submittedAt: -1 });

    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
