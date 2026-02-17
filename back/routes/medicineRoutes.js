const express = require("express");
const router = express.Router();
const { getMedicines } = require("../controllers/medicineController");

// GET /api/medicines - list all medicines
router.get("/", getMedicines);

module.exports = router;
