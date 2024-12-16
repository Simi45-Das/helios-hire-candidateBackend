const photoService = require("../../services/uploadPoto");
const fs = require("fs");

// Utility function to handle missing userID
const checkUserId = (req, res) => {
  try {
      const { user: { userID } } = req.user; // Extracted from JWT middleware
    if (!userID) {
      res.status(400).json({ message: "User ID not found in token." });
      return null;
    }
    return userID;
  } catch (err) {
    console.error("Error in uploadPhotos:", error.message);
    res.status(500).json({ message: "Error uploading files." });
  }
};

// Upload Photos
const uploadPhotos = async (req, res) => {
  try {
    const userID = checkUserId(req, res);
    if (!userID) return; // Response already sent

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided." });
    }

    const fileUrls = [];

    // Iterate over files and upload them
    for (const file of req.files) {
      const fileUrl = await photoService.uploadToDrive(file); // Use upload logic
      fileUrls.push(fileUrl);
    }

    // Save URLs in MongoDB with userID
    await photoService.savePhotoUrls({ urls: fileUrls, userID });

    // Clean up temp files locally after upload
    await Promise.all(
      req.files.map(async (file) => fs.promises.unlink(file.path))
    );

    res.status(200).json({ message: "Files uploaded successfully", fileUrls });
  } catch (error) {
    console.error("Error in uploadPhotos:", error.message);
    res.status(500).json({ message: "Error uploading files." });
  }
};

// Get Photos by User ID
const getPhotosByUserId = async (req, res) => {
  try {
    const { userID } = req.user; // Extracted from JWT middleware
    if (!userID) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const photos = await photoService.getPhotosByUserId(userID);

    if (!photos || !photos.urls || photos.urls.length === 0) {
      return res
        .status(404)
        .json({ message: "No photos found for this user." });
    }

    res.status(200).json({ urls: photos.urls });
  } catch (error) {
    console.error("Error in getPhotosByUserId:", error.message);
    res.status(500).json({ message: "Error fetching photos." });
  }
};

module.exports = {
  uploadPhotos,
  getPhotosByUserId,
};
