const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadResume,
  submitResume,
  getpdfByuserId,
  viewpdfs

} = require("../../controllers/profileInfo/resume");
const { authenticate } = require("../../middleware/auth");

const router = express.Router();

// Setup multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/upload", authenticate,upload.single("file"), uploadResume); // Endpoint to upload the resume to Google Drive
router.post("/submitResume", authenticate, submitResume); // Endpoint to submit the resume link to the database


router.get("/getpdfs", authenticate, getpdfByuserId);
router.get("/viewpdfs", viewpdfs);

module.exports = router;
