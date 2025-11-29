const express = require("express");
const router = express.Router();
const { getLabs, bookLab } = require("../controllers/labController");

router.get("/", getLabs); // GET /api/labs
router.post("/book", bookLab); // POST /api/labs/book

module.exports = router;
