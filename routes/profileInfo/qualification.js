const express = require("express");
const router = express.Router();
const {
  addQualification,
  getQualifications,
} = require("../../controllers/profileInfo/qualification");

// Route to add or update qualifications
router.post("/postqualifications", addQualification);

// Route to get qualifications by userId
router.get("/viewqualifications", getQualifications);


module.exports = router;
