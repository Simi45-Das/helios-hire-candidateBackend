const multer = require("multer");
const path = require("path");
const { Readable } = require("stream");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");

// Multer setup for file storage (Disk storage for general uploads, memory for recruiter video)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage });
const recruiterUpload = multer({ storage: memoryStorage });

// Save profile details (including recruiter message)
const saveUserProfile = async (req, res) => {
  try {
    const userData = {
      name: req.body["first-name"],
      lastName: req.body["last-name"],
      dob: req.body["dob"],
      gender: req.body["gender"],
      email: req.body["email"],
      phone: req.body["phone"],
      whatsapp: req.body["whatsapp"],
      address: req.body["address"],
      tagline: req.body["tagline"],
      positions: req.body["positions"],
      projects: req.body["project"],
      qualifications: req.body["graduation"],
      postQualifications: req.body["postGraduation"],
      resumeUrl: req.body.resumeUrl, // Assume these are being sent
      introVideoUrl: req.body.introVideoUrl,
      certificates: req.body.certificates, // Assume these are sent in the form
      socialLinks: {
        linkedIn: req.body.linkedIn_link,
        github: req.body.github_link,
        youtube: req.body.youtube_link,
        instagram: req.body.instagram_link,
        facebook: req.body.facebook_link,
        otherPlatform: req.body.otherPlatform_link,
      },
      achievements: req.body.achievements,
      experience: req.body.experience,
      softSkills: {
        communication: req.body.communication,
        leadership: req.body.leadership,
        teamwork: req.body.teamwork,
      },
      recruiterMessage: req.body.recruiterMessage, // Include recruiter message here
    };

    const user = await userService.saveUserProfile(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to save user data" });
  }
};

// Upload recruiter video without recruiterService
const uploadRecruiterVideo = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    // Process the file (e.g., save it locally or upload to a cloud service)
    const videoPath = `uploads/${Date.now()}_${file.originalname}`;
    // Simulate video saving logic, e.g., saving to disk or Google Drive

    res.status(200).json({ userId, videoPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload resume
const uploadResume = (req, res) => {
  const resumePath = req.file.path;
  res.json({ resumeUrl: resumePath });
};

// Upload certificates
const uploadCertificates = (req, res) => {
  const certificatePaths = req.files.map((file) => file.path);
  res.json({ certificateUrls: certificatePaths });
};

// Upload intro video
const uploadIntroVideo = (req, res) => {
  const videoPath = req.file.path;
  res.json({ videoUrl: videoPath });
};

module.exports = {
  upload,
  recruiterUpload,
  saveUserProfile,
  uploadResume,
  uploadCertificates,
  uploadIntroVideo,
  uploadRecruiterVideo,
};
