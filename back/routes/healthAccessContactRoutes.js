const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  updateContactStatus,
} = require("../controllers/healthAccessContactController");

// Public
router.post("/", createContact);

// Admin
router.get("/", getAllContacts);
router.put("/:id", updateContactStatus);

module.exports = router;
