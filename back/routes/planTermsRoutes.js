// routes/planTermsRoutes.js
const express = require("express");
const router = express.Router();
const {
  acceptTerms,
  getUserAcceptance,
} = require("../controllers/planTermsController");
const auth = require("../middleware/authMiddleware");

router.post("/accept", auth, acceptTerms);
router.get("/my-terms", auth, getUserAcceptance);

module.exports = router;
