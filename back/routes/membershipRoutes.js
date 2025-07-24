const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");
const auth = require("../middleware/auth");

router.get("/my-membership", auth, membershipController.getMyMembership);
router.put("/update", auth, membershipController.updateMembership);
router.put("/toggle-renew", auth, membershipController.toggleAutoRenew);

module.exports = router;
