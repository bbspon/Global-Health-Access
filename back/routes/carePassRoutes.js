const express = require("express");
const router = express.Router();
const { simulateScan } = require("../controllers/carePassController");

router.post("/simulate", simulateScan); // /api/carepass/simulate

module.exports = router;
