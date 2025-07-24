const express = require("express");
const router = express.Router();
const controller = require("../controllers/insuranceIntegrationPageController");

// GET all
router.get("/", controller.getEntries);

// POST new
router.post("/", controller.createEntry);

module.exports = router;
