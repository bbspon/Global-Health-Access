const HealthAccessContact = require("../models/healthAccessContactModel");
const { sendAdminContactMail } = require("../utils/mailer");

// CREATE
exports.createContact = async (req, res) => {
  try {
    const contact = new HealthAccessContact(req.body);
    await contact.save();

    // Send admin email (non-blocking)
    sendAdminContactMail(contact).catch((err) => {
      console.error("Admin email failed:", err.message);
    });

    res.status(201).json({
      message: "Contact submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit contact",
      error: error.message,
    });
  }
};

// READ (Admin use)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await HealthAccessContact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};

// UPDATE (Admin reply / status)
exports.updateContactStatus = async (req, res) => {
  try {
    const updated = await HealthAccessContact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update contact",
      error: error.message,
    });
  }
};
