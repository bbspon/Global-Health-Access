// routes/customerIdentityRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/identityUpload");
const {
  createOrUpdateIdentity,
  getIdentity,
} = require("../controllers/customerIdentityController");

router.post(
  "/save",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  createOrUpdateIdentity
);

router.get("/:userId", getIdentity);

module.exports = router;
