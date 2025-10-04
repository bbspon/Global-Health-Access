// routes/authDebug.js
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
router.get("/me", auth, (req, res) =>
  res.json({ id: req.user._id, email: req.user.email })
);
module.exports = router;
