const express = require("express");
const router = express.Router();
const ecosystemController = require("../controllers/ecosystemController");

router.get("/ngos", ecosystemController.getNGOs);
router.get("/schools", ecosystemController.getSchools);
router.get("/csr", ecosystemController.getCSRs);
router.get("/rurals", ecosystemController.getRurals);
router.get("/leaderboard", ecosystemController.getLeaderboard);
router.get("/user-plan/:userId", ecosystemController.getUserPlan);
router.post("/book-appointment", ecosystemController.bookAppointment);
router.post("/ai-health-coach", ecosystemController.aiHealthCoach);
module.exports = router;
