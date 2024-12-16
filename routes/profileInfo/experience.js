const express = require("express");
const router = express.Router();
const experienceController = require("../../controllers/profileInfo/experience");

// POST: Add experience
router.post("/postexperience", experienceController.addExperience);

// GET: Get experience by userId
router.get("/viewExperience", experienceController.getExperienceByUserId);


module.exports = router;
