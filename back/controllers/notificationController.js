const Notification = require("../models/Notification");

// ✅ Get all notifications (filtered by role if passed)
exports.getNotifications = async (req, res) => {
  try {
    const role = req.query.role || "user";
    const notifications = await Notification.find({
      visibleTo: { $in: [role] },
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while fetching notifications" });
  }
};

// ✅ Create a new notification (Admin use only)
exports.createNotification = async (req, res) => {
  try {
    const { message, category, visibleTo } = req.body;

    const newNotification = new Notification({
      message,
      category,
      visibleTo,
    });

    await newNotification.save();
    res.status(201).json({ success: true, data: newNotification });
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};
