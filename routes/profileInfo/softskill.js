const express = require("express");
const router = express.Router();
const { saveSoftSkills, getSoftSkills } = require("../../controllers/profileInfo/softskill");

// POST route to save soft skills
router.post("/submit-soft-skills", saveSoftSkills);

// GET route to retrieve soft skills data by userId
router.get("/get-soft-skills", getSoftSkills);

module.exports = router;
