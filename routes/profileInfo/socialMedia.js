const express = require("express");
const router = express.Router();
const socialMediaController = require("../../controllers/profileInfo/socialMedia");

// POST: Save social media links
router.post("/save-links", socialMediaController.saveLinks);

// GET: Get social media links by userId (updated to use request body)
router.get("/get-links", socialMediaController.getLinks);

module.exports = router;
