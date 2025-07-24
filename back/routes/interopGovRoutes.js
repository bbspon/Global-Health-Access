const express = require("express");
const router = express.Router();
const {
  getAllInteropGov,
  createInteropGov,
} = require("../controllers/interopGovController");

// Routes
router.get("/", getAllInteropGov);
router.post("/", createInteropGov);

module.exports = router;
