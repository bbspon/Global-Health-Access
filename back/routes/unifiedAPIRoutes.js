// routes/unifiedAPIRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllPartners,
  createPartner,
  activatePartner,
} = require("../controllers/unifiedAPIController");

router.get("/", getAllPartners);
router.post("/", createPartner);
router.put("/activate/:id", activatePartner);

module.exports = router;
