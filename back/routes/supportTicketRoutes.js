const express = require("express");
const router = express.Router();
const {
  raiseTicket,
  getAllTickets,
} = require("../controllers/supportTicketController");

// POST /api/support/raise
router.post("/support/raise", raiseTicket);

// GET /api/support/tickets (for admin use)
router.get("/support/tickets", getAllTickets);

module.exports = router;
