const express = require("express");
const {
  getMyProfileSettings,
  updateProfileSettings,
  getPublicProfile,
} = require("../controllers/publicProfileController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/settings", auth, getMyProfileSettings);
router.post("/settings", auth, updateProfileSettings);
router.get("/view/:userId", getPublicProfile);

module.exports = router;
