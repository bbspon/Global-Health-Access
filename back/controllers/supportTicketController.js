const SupportTicket = require("../models/SupportTicket");

exports.raiseTicket = async (req, res) => {
  try {
    const { issueCategory, issueDescription } = req.body;

    const ticket = new SupportTicket({
      issueCategory,
      issueDescription,
      submittedBy: req.user ? req.user._id : null, // If auth used
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket submitted successfully", ticket });
  } catch (err) {
    console.error("❌ Error creating support ticket:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ submittedAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
