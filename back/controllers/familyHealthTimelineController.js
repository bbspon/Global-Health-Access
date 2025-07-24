const Timeline = require("../models/familyHealthTimeline");

// GET /api/family-health-timeline
exports.getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find({ userId: req.user._id });
    res.json({ success: true, data: timeline });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to load timeline",
        error: err.message,
      });
  }
};

// POST /api/family-health-timeline
exports.addEvent = async (req, res) => {
  const { memberName, newEvent } = req.body;
  try {
    let timeline = await Timeline.findOne({ userId: req.user._id, memberName });

    if (!timeline) {
      timeline = new Timeline({
        userId: req.user._id,
        memberName,
        events: [newEvent],
      });
    } else {
      timeline.events.push(newEvent);
    }

    await timeline.save();
    res.json({ success: true, message: "Event added", data: timeline });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add event",
        error: err.message,
      });
  }
};

// DELETE /api/family-health-timeline/:member/:eventId
exports.deleteEvent = async (req, res) => {
  const { member, eventId } = req.params;
  try {
    const updated = await Timeline.findOneAndUpdate(
      { userId: req.user._id, memberName: member },
      { $pull: { events: { _id: eventId } } },
      { new: true }
    );
    res.json({ success: true, message: "Event removed", data: updated });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete event",
        error: err.message,
      });
  }
};
