const express = require("express");
const { generateInvoice } = require("../controllers/invoiceController");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/invoice/:planId", auth, generateInvoice);

module.exports = router;
