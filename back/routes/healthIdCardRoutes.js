const express = require("express");
const router = express.Router();
const { getMyHealthID } = require("../controllers/healthIdCardController");
const auth = require("../middleware/authMiddleware");

router.get("/my-health-id", auth, getMyHealthID);

module.exports = router;
