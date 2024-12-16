const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/profileInfo/contactInfo");

// POST - Create or Update Contact Info
router.post("/postInfo", contactController.createOrUpdateContact);

// GET - Get Contact Info
router.get("/viewcontact", contactController.getContact);

// PUT - Update Contact Info
router.put("/updatecontact", contactController.updateContact);

module.exports = router;
