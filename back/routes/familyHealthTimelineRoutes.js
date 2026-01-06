const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTimeline,
  addEvent,
  deleteEvent,
} = require("../controllers/familyHealthTimelineController");

router.get("/:planId", authMiddleware, getTimeline);
router.post("/", authMiddleware, addEvent);
router.delete("/:member/:eventId", authMiddleware, deleteEvent);

module.exports = router;
