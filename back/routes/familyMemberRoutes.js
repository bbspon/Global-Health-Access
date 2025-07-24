const express = require("express");
const router = express.Router();
const {
  getFamilyMembers,
  addFamilyMember,
} = require("../controllers/familyMemberController");

router
  .route("/user-plan/:planId/family")
  .get(getFamilyMembers)
  .post(addFamilyMember);

module.exports = router;
