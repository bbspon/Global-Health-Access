const express = require("express");
const router = express.Router();
const {
  bookHomeVisit,
  getAllHomeVisits,
} = require("../controllers/homeVisitController");

router.post("/home-visits", bookHomeVisit);
router.get("/home-visits", getAllHomeVisits); // optional: for admin viewing

module.exports = router;
