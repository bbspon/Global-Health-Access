// routes/planTermsRoutes.js
const express = require("express");
const router = express.Router();
const {
  acceptTerms,
  getUserAcceptance,
  getPlanTerms,
} = require("../controllers/planTermsController");
const auth = require("../middleware/authMiddleware");
router.get("/:planId", getPlanTerms);

router.post("/accept", auth, acceptTerms);
router.get("/my-terms", auth, getUserAcceptance);

module.exports = router;
