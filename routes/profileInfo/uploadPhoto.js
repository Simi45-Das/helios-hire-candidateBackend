const express = require("express");
const multer = require("multer");
const photoController = require("../../controllers/profileInfo/uploadPhoto");
const { authenticate } = require("../../middleware/auth");

const router = express.Router();
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Ensure only image files are accepted
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type, only JPEG, PNG, and GIF are allowed"),
        false
      );
    }
  },
});

// Upload photos
router.post(
  "/uploadImages",
  authenticate, // Ensure the user is authenticated
  upload.array("photos", 10),
  photoController.uploadPhotos
);

// Get photos for a specific user
router.get("/getphotos", authenticate, photoController.getPhotosByUserId);

module.exports = router;
